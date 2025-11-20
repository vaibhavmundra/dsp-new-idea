//The implementation has been hacked together from https://michaelangelo.io/blog/server-sent-events

import { uploadRecordings } from "@/app/actions/course-data";
import { disableRoom } from "@/app/actions/hms-actions";
import { enroll, handleRzp, storePayment } from "@/app/actions/payment";
import { NextResponse } from "next/server";
import { waitUntil } from '@vercel/functions';

let proxy_writer;
function writeMessage(writer, encoder, message) {
  if (message.comment) {
    void writer.write(encoder.encode(`: ${message.comment}\n`));
  }
  if (message.event) {
    void writer.write(encoder.encode(`event: ${message.event}\n`));
  }
  if (message.id) {
    void writer.write(encoder.encode(`id: ${message.id}\n`));
  }
  if (message.retry) {
    void writer.write(encoder.encode(`retry: ${message.retry}\n`));
  }
  if (message.data) {
    void writer.write(encoder.encode(toDataString(message.data)));
  }
}

export function toDataString(data) {
  return data
    .split(/\r\n|\r|\n/)
    .map((line) => `data: ${line}\n\n`)
    .join("");
}

function jessup() {
  writeMessage(proxy_writer, new TextEncoder(), {
    data: '{"message":"Jessup"}',
  });
}

async function callGoogleAppsScript() {
  try {
    const payload = {
      // Example data - adjust based on what your Google Apps Script expects
      key: "value",
    };

    const response = await fetch(
      "https://script.google.com/a/macros/designopolis.co.in/s/AKfycbziedA7oUBR3B_kVtzC5IKiwMwFGsq6IxBfsAa12O2VzC8hvROfoIeLn7SBgeEaBF5J/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Include the payload in the request body
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonResponse = await response.json();
    console.log(jsonResponse);
  } catch (error) {
    console.error("Error calling Google Apps Script Web App:", error);
  }
}

export async function POST(req) {
  try {
    const req_data = await req.json();
    console.log(req_data);
    console.log("This is coming next>>");
    if (req_data.event === "payment.captured") {
      // console.log(new Date());
      // console.log(req_data.payload, req_data.payload.payment.entity);
      // const rzp_data = req_data.payload.payment.entity;
      // const course_id = parseInt(rzp_data.description.split("_")[1]);
      // const name = rzp_data.description.split("_")[3];
      // console.log(course_id);
      // const supa_data = await enroll(
      //   rzp_data.email,
      //   rzp_data.amount/100,
      //   name,
      //   rzp_data.notes.gst,
      //   rzp_data.order_id,
      //   rzp_data.id,
      //   rzp_data.contact,
      //   course_id,
      //   rzp_data.notes.start_date
      // )
      // console.log("Enrollment complete");
      waitUntil(handleRzp(req_data));
     
    }
    if (req_data.type === "beam.recording.success") {
      const data = {
        name: req_data.data.room_name,
        size: req_data.data.size,
        url: req_data.data.recording_presigned_url,
      };
      const vimeo_response = await uploadRecordings(data);
      console.log("Response from Vimeo and Directus>>>", vimeo_response);
      const disable_room = await disableRoom(req_data.data.room_id);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        ok: false,
      },
      { status: 500 }
    );
  }
}