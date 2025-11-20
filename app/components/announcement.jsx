"use client";
import {
  CloudArrowDownIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Announcement() {
  const [show, setShow] = useState(true);
  return (
    <section>
      <div
        className={`w-full p-5 bg-white text-black justify-between ${
          show ? "flex" : "hidden"
        }`}
      >
        <a
          href="https://ttmyvezienkeutupovxz.supabase.co/storage/v1/object/public/dsp-public//Site%20Report.pdf"
          className=" font-semibold flex"
          target="_blank"
        >
          <p>Download Daily Site Report template</p>
          <span className="ml-2">
            <CloudArrowDownIcon className="w-6 h-6" />
          </span>
        </a>
        <button onClick={() => setShow(false)}>
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
