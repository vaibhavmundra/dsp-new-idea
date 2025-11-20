"use server";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { confirmationMessage } from "./brevo-actions";

const instance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RZP_KEY_ID,
  key_secret: process.env.RZP_KEY_SECRET,
});

export default async function makePayment(options) {
  options.receipt = shortid.generate();
  options.payment_capture = 1;
  console.log(options);
  console.log("payment initialised!");
  const order = await instance.orders.create(options);
  console.log(order);
  return order;
}

export async function verifyPayment(order_id, payment_id, rzp_signature) {
  const signature_body = order_id + "|" + payment_id;
  const crypto = require("crypto");
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RZP_KEY_SECRET)
    .update(signature_body.toString())
    .digest("hex");

  if (expectedSignature === rzp_signature) {
    return true;
  } else {
    return false;
  }
}

export async function enroll(
  email,
  amount,
  name,
  gst,
  purchase_source,
  order_id,
  payment_id,
  user_phone,
  course_id,
  start_date
) {

  await storePayment(
    order_id,
    payment_id,
    email,
    user_phone,
    course_id,
    gst,
    purchase_source,
    amount,
    name
  );

  const resp = await fetch("https://learn.designopolis.co.in/api/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      course: name,
    }),
  });

  const result = await resp.json();
  console.log("Mail sent!");
  console.log(result);

  await confirmationMessage(name,start_date,user_phone,email)

  
}

export async function storePayment(
  order_id,
  payment_id,
  user_email,
  user_phone,
  course_id,
  gst,
  purchase_source,
  amount,
  course_name
) {
  console.log("Starting to store the payment");
  console.log("This is the data being fed>>>", order_id,
      payment_id,
      user_email,
      user_phone,
      course_id,
      gst,
      purchase_source,
      amount,
      course_name);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
  const { data, error } = await supabase
    .from("purchases")
    .insert({
      order_id,
      payment_id,
      user_email,
      user_phone,
      course_id,
      gst,
      purchase_source,
      amount,
      course_name,
    })
    .select();
  if (data) {
    console.log("Successfully stored");
    return data;
  } else {
    console.log("Failed to store payment");
    return error;
  }
}

export async function getUserPurchases(email) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
    { auth: { persistSession: false } }
  );
  const { data, error } = await supabase
    .from("purchases")
    .select("*")
    .eq("user_email", email); //Referenced with user id's and not emails so that even logged out users can buy
  if (data) {
    return data;
  } else {
    return error;
  }
}

export async function handleRzp(req_data){
  console.log(new Date());
      console.log(req_data.payload, req_data.payload.payment.entity);
      const rzp_data = req_data.payload.payment.entity;
      const course_id = parseInt(rzp_data.description.split("_")[1]);
      const name = rzp_data.description.split("_")[3];
      console.log(course_id);
      const supa_data = await enroll(
        rzp_data.email,
        rzp_data.amount/100,
        name,
        rzp_data.notes.gst,
        rzp_data.notes.purchase_source,
        rzp_data.order_id,
        rzp_data.id,
        rzp_data.contact,
        course_id,
        rzp_data.notes.start_date
      )
      console.log("Enrollment complete");

}
