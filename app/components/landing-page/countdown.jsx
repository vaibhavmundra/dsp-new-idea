"use client";
import Buy from "../razorpay/buy-course";
import { useState, useEffect, useCallback } from "react";

export default function Countdown() {
  const [time, setTime] = useState("");

  function checkDigits(input) {
    if (input < 10) {
      const output = "0" + input;
      return output;
    } else {
      return input;
    }
  }

  const calculateTimeLeft = useCallback(() => {
    const midnight = new Date().setHours(24, 0, 0, 0);
    const now = new Date();
    let diff = Math.floor((midnight - now) / 1000);

    if (diff < 0) {
      diff += 24 * 60 * 60; // Add a day's seconds if it's past midnight
    }

    const hrs = Math.floor(diff / 3600);
    const mins = Math.floor((diff % 3600) / 60);
    const secs = diff % 60;

    return `${checkDigits(hrs)}:${checkDigits(mins)}:${checkDigits(secs)}`;
  }, []);

  useEffect(() => {
    const updateTimer = () => {
      const newTime = calculateTimeLeft();
      setTime(newTime);
    };

    updateTimer(); // Initialize immediately
    const countdown = setInterval(updateTimer, 1000);

    return () => clearInterval(countdown);
  }, [calculateTimeLeft]);

  return (
    <p className="inline-block bg-orange px-2 rounded-md" id="countdown">
      {time}
    </p>
  );
}
