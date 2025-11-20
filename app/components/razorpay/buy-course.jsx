"use client";

import makePayment, { enroll, verifyPayment } from "@/app/actions/payment";
import * as fbq from "../pixel";
import { useState } from "react";
import Status from "../landing-page/status";
import { useRouter } from "next/navigation";

export default function Buy({
  name,
  amount,
  course_id,
  status,
  className,
  children,
  showStatus,
  selling,
  disabled,
  email,
  phone,
  gst,
  existing_session,
  source,
  setPaid,
  start_date
}) {
  const [success, setSuccess] = useState(false);
  const [order, setOrder] = useState(null);
  const router = useRouter();
  const purchase_source = source||"no source defined";

  const init_options = {
    amount: amount + 0.18 * amount,
    currency: "INR",
  };

  async function handleClick() {
    if (!selling) {
      return;
    }
    console.log("Payment starrrrrted>>>>>");
    const data = await makePayment(init_options);
    console.log(data);
    const options = {
      key: process.env.NEXT_PUBLIC_RZP_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      prefill: {
        email: email,
        contact: phone,
      },
      notes:{
        gst:gst||"",
        start_date,
        name,
        course_id,
        purchase_source
      },
      name: "Designopolis",
      description: `courseId_${course_id}_courseName_${name}`,
      order_id: data.id,
      handler: async function (response) {
        console.log("Rn verifying the payment");
        const verification = await verifyPayment(
          response.razorpay_order_id,
          response.razorpay_payment_id,
          response.razorpay_signature
        );

        if (verification) {
          setPaid(true);
          const order_id = response.razorpay_order_id;
          const payment_id = response.razorpay_payment_id;
          const amt_with_gst = (amount + 0.18 * amount) / 100;
          //Activating fb pixel event
          if (source !== "dsp_organic") {
            fbq.event("Purchase", { currency: "INR", value: amt_with_gst });
          }
          // await enroll(
          //   email,
          //   amt_with_gst,
          //   name,
          //   gst,
          //   order_id,
          //   payment_id,
          //   phone,
          //   course_id,
          //   start_date
          // );

          setSuccess(true);
          setOrder(data.id);
          if (!existing_session) {
            router.push(
              `/login?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}`
            );
          } else {
            router.push("/dashboard");
          }
        }
        else{
          console.log("Payment was not made!!!");
        }
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      // alert(response.error.code);
      alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  }
  return (
    <>
      {showStatus && (
        <Status
          success={success}
          order={order}
          status={status}
          className={className}
        />
      )}
      <button
        className={className}
        disabled={disabled}
        id="rzp-button1"
        onClick={() => {
          handleClick();
        }}
      >
        {selling ? children : "Closed"}
      </button>
    </>
  );
}
