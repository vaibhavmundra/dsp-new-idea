"use client";

import { useEffect, useState } from "react";
import Buy from "../razorpay/buy-course";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSearchParams } from "next/navigation";
import Image from 'next/image'
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function Breakup({ amount, course_id, name, selling, start_date }) {
  const supabase = createClientComponentClient();
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gst, setGst] = useState("");
  const [session, setSession] = useState(false);
  const [paid, setPaid] = useState(false);
  const searchParams = useSearchParams();
  const source = searchParams.get("dsp");

  useEffect(() => {
    async function currentSession() {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        console.log(data.session);
        console.log(data.session.user.user_metadata.email);
        setEmail(data.session.user.user_metadata.email);
        setNumber(data.session.user.user_metadata.phone);
        setSession(true);
      }
    }
    currentSession();
  }, []);

  if(!paid){
    return (
      <div
        className="fixed inset-x-0 bottom-0 grid md:grid-cols-2 gap-8 transition-all transform translate-y-full duration-500 px-5 py-10 bg-fullBlack z-50"
        id="modal-child"
      >
        <div className=" text-black">
          <div className="mb-4">
            <input
              className="w-full h-10 rounded-full px-4"
              type="text"
              name="email"
              placeholder="Email id*"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full h-10 rounded-full px-4 "
              type="text"
              name="phone"
              placeholder="Phone number*"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="">
            <input
              className="w-full h-10 rounded-full px-4 "
              type="text"
              name="GST"
              placeholder="GST Number (optional)"
              onChange={(e) => setGst(e.target.value)}
            />
          </div>
        </div>
  
        <div className="flex flex-col justify-between">
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <p>Subtotal</p>
              <p>INR {amount / 100}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>GST @ 18%</p>
              <p>INR {(amount * 0.18) / 100}</p>
            </div>
            <div className=" bg-borderGrey h-[1px] mb-2"></div>
            <div className="flex justify-between font-medium">
              <p>Total</p>
              <p>INR {(amount + 0.18 * amount) / 100}</p>
            </div>
          </div>
          <div className="flex justify-end items-center mt-auto">
            <button
              className="mr-4 text-errorRed"
              onClick={() => {
                document.getElementById("modal").style.display = "none";
                document.getElementById("modal-child").style.transform =
                  "translateY(100%)";
                console.log(email);
                setEmail("");
                setNumber("");
                setGst("");
              }}
            >
              Cancel
            </button>
            <Buy
              amount={amount}
              name={name}
              course_id={course_id}
              className={
                "px-6 md:px-8 h-12 bg-primary rounded-full text-sm text-white hover:bg-primary/70 relative z-10 disabled:bg-lightGrey"
              }
              showStatus={false}
              selling={selling}
              disabled={number && email ? false : true}
              email={email.trim()}
              phone={number}
              gst={gst}
              existing_session={session}
              source={source}
              setPaid={setPaid}
              start_date = {start_date}
            >
              Complete purchase
            </Buy>
          </div>
        </div>
      </div>
    );
  }
  if(paid){
    return(
      <div
        className="fixed inset-x-0 bottom-0 flex justify-center transition-all transform translate-y-full duration-500 p-5 bg-fullBlack z-50"
        id="modal-child"
      >
        <div className=" flex flex-col flex-grow p-10 items-center bg-black/50 border border-borderGrey/70 rounded-lg">
          {/* <Image
            src="/checked.png"
            width={64}
            height={64}
            alt="Designopolis checked"
          /> */}
          <ExclamationCircleIcon className="w-16 h-16"/>
          <p className=" text-3xl font-medium mt-6 mb-1">Please wait . . .</p>
          <p className="opacity-75">We have received your payment! Enrolling you to the course now . . .</p>
        </div>
      </div>
    )

  }
}

export function Enroll({ selling }) {
  return (
    <button
      className="px-6 md:px-8 h-12 bg-primary rounded-full text-sm text-white hover:bg-primary/70 relative z-10"
      onClick={() => {
        if (selling) {
          document.getElementById("modal").style.display = "block";
          document.getElementById("modal-child").style.transform =
            "translateY(0px)";
          console.log(document.getElementById("modal-child"));
        }
      }}
    >
      {selling ? "Enroll" : "Closed"}
    </button>
  );
}
