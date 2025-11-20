"use client";
import Buy from "../razorpay/buy-course";
import { useState, useEffect, useRef } from "react";
import Countdown from "./countdown";
import { Enroll } from "./breakup";

export default function Urgency({
  amount,
  course_id,
  status,
  num,
  selling,
  showUrgency,
  sessions
}) {
  const [show, setShow] = useState(false);
  let urgency_status;
  const urgency = [
    "Filling fast.",
    "Last 8 seats left.",
    "Last 4 seats left.",
    "Last 2 seats left.",
    "Last seat left.",
    "Workshop ongoing.",
    "Workshop concluded.",
  ];
  function urgencyStatus(start_date, start_time, end_date) {
    const now = new Date();

    // Combine start_date and start_time to form the full session start DateTime.
    const sessionStart = new Date(`${start_date}T${start_time}:00`);
    
    // Create date-only objects for start and end dates (midnight).
    const sessionStartDate = new Date(start_date);
    const sessionEndDate = new Date(end_date);
    
    // Create a date-only object for the current date.
    const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // If current time is before the session start:
    console.log(now, sessionStart);
    if (now < sessionStart) {
      const diffHours = (sessionStart - now) / (1000 * 60 * 60);
      
      if (diffHours <= 36) {
        return 3;
      } else if (diffHours <= 60) {
        return 2;
      } else {
        return 0;
      }
    } else {
      // Once the session has started (or passed), check the current calendar date.
      // Return 5 if current date is on or before the session end date,
      // and return 6 if current date is later than the session end date.
      if (nowDate <= sessionEndDate) {
        return 5;
      } else {
        return 6;
      }
    }
  }


  const start_date = sessions[0].date;
  const start_time = sessions[0].sessions[0].start;
  const end_date = sessions[sessions.length-1].date;
  console.log(start_date,start_time,end_date);
  urgency_status = urgencyStatus(start_date,start_time,end_date);
  console.log("This is the urgency ",urgency_status);
  
  useEffect(() => {
    window.onscroll = function () {
      if (showUrgency) {
        if (window.scrollY > 270) {
          setShow(true);
        } else {
          setShow(false);
        }
      }
    };
  });

  return (
    <div
      className={`w-full inset-x-0 fixed transition-all duration-300  bg-black/70 backdrop-blur-sm border-solid border-white border-2 rounded-t-3xl p-5 z-30 ${
        show ? "bottom-0" : "-bottom-full"
      }`}
    >
      <div className="flex justify-between items-center w-full">
        <div>
          <p>{urgency[urgency_status]}</p>

          {urgency_status > 4 ?<div className=" opacity-70">Lifetime access to recordings</div>:<div className="flex items-center">
            <p className="opacity-70 mb-1 text-xs mr-2">
              {urgency_status > 0 ? "Enrollments close in" : "Early bird offer ends in:"}
            </p>
            <Countdown />
          </div>}
        </div>
        <div className="flex flex-col items-end">
          <p className="mb-1 text-sm">
            INR {amount / 100} <span className="text-[0.5rem]">+ GST</span>
          </p>
          <Enroll selling={selling} />
        </div>
      </div>
    </div>
  );
}
