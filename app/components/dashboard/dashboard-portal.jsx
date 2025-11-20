"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import DashboardCourses from "./courses";
import DashboardAccount from "./account";
import NavMenu from "../navbar-menu";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { logout } from "@/app/actions/auth";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function DashboardPortal({ user, courses, purchases }) {
  const [tab, setTab] = useState("courses");
  const supabase = createClientComponentClient();
  let right_panel_content;

  if (tab === "courses") {
    right_panel_content = <DashboardCourses user={user} courses={courses} />;
  } else if (tab === "account") {
    right_panel_content = (
      <DashboardAccount user={user} courses={courses} purchases={purchases} />
    );
  }

  return (
    <>
      <div className="md:h-screen md:grid md:grid-cols-4 overflow-hidden text-white block">
        <div className="fixed bottom-0 z-10 inset-x-0 border-t md:static md:col-span-1 md:border-r border-borderGrey bg-fullBlack">
          <div className="md:flex md:flex-col md:justify-between md:h-full">
            <div className="grid grid-cols-2 md:flex md:flex-col">
              <div className="p-5 hidden md:flex md:items-center md:justify-between opacity-70">
                <div>
                  <div className="uppercase text-xs">
                    {user.role === 1 ? "Admin" : "Learner"}
                  </div>
                  <div>{user.name}</div>
                </div>
                <Link href="/" className="flex items-center">
                  <ArrowLongLeftIcon className="w-6 h-6" />
                  <span className="ml-1 text-sm">Home</span>
                </Link>
              </div>
              <button
                className={`py-2 border-b border-borderGrey hover:bg-white hover:text-black ${
                  tab === "courses" && "bg-white text-black"
                }`}
                onClick={() => setTab("courses")}
              >
                Courses
              </button>
              <button
                className={`py-2 border-b border-borderGrey bg-fullBlack hover:bg-white hover:text-black ${
                  tab === "account" && "bg-white text-black"
                }`}
                onClick={() => setTab("account")}
              >
                Account
              </button>
            </div>
            <div className="p-5 hidden md:flex md:justify-center">
              <Link href="/">
                <Image
                  src="/designopolis-logo-lg.png"
                  width={180}
                  height={180}
                  alt="designopolis logo"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="block md:col-span-3  bg-fullBlack overflow-y-scroll ">
          {right_panel_content}
        </div>
      </div>
    </>
  );
}
