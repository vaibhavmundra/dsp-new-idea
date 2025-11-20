"use client";
import { useRef, useLayoutEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Session from "./session";
import Certificate from "./certificate";
import {
  ArrowLongLeftIcon,
  CalendarDaysIcon,
  SignalIcon,
} from "@heroicons/react/24/outline";

export default function CoursePortalBackup({ course, user }) {
  const course_ref = useRef();
  const [tab, setTab] = useState(1);
  console.log(course);

  const f = new Intl.DateTimeFormat("en-in", {
    year: "2-digit",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <div className="bg-fullBlack grid grid-cols-4 h-screen overflow-hidden text-white">
        <div className="col-span-1 border-r  border-borderGrey flex flex-col justify-between overflow-y-scroll">
          <div>
            <div>
              <div className="p-5 flex flex-col justify-center border-b border-borderGrey">
                <Link href="/dashboard">
                  <button className="flex items-center mb-4 opacity-70 transition duration-300 hover:opacity-100">
                    <span>
                      <ArrowLongLeftIcon className="w-6 h-6" />
                    </span>
                    <p className="ml-2 text-sm">Dashboard</p>
                  </button>
                </Link>
                <div
                  className={`${
                    course.type === "Workshop" ? "bg-orange" : "bg-primary"
                  } px-2 rounded-full text-xs uppercase w-fit mb-2 flex items-center justify-center`}
                >
                  {course.type}
                </div>
                <h1 className="text-xl">{course.name}</h1>
              </div>
              <div className="border-b border-borderGrey">
                <div className=" p-5">
                  <h2 className="text-lg">Sessions</h2>
                </div>
                <div>
                  {course.sessions.map((day, index) => {
                    return (
                      <div key={day.date} className="">
                        <div className="p-5 flex items-center opacity-70">
                          <CalendarDaysIcon className="w-6 h-6 text-white/70 group-hover:text-orange/70" />
                          <p className="ml-2" suppressHydrationWarning>
                            Day {index + 1}: {f.format(new Date(day.date))}
                          </p>
                        </div>
                        <div>
                          {day.sessions.map((session, i) => {
                            return (
                              <div
                                className="py-5 pl-8 pr-5 flex items-center group cursor-pointer hover:bg-white hover:text-black"
                                key={i}
                                onClick={() => setTab(index + 1)}
                              >
                                <SignalIcon className="w-6 h-6  text-white group-hover:text-orange" />
                                <p className="ml-2">Session {i + 1}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div
                className="text-lg  p-5 border-b border-borderGrey cursor-pointer hover:bg-white hover:text-black"
                onClick={() => setTab("downloads")}
              >
                <h2>Downloads</h2>
              </div>
              <div
                className="text-lg  p-5 border-b border-borderGrey cursor-pointer  hover:bg-white hover:text-black"
                onClick={() => setTab("certificate")}
              >
                <h2>Certificates</h2>
              </div>
            </div>
          </div>
          <div className="flex justify-center p-5 mt-32">
            <Image
              src="/designopolis-logo-lg.png"
              width={200}
              height={200}
              alt="designopolis logo"
            />
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex justify-center items-center">
            {tab === "downloads" ? (
              <div>
                {course.downloads.map((item) => {
                  return (
                    <a
                      href={item.download_link}
                      key={item.download_link}
                      download
                    >
                      {item.title}
                    </a>
                  );
                })}
              </div>
            ) : typeof tab === "number" ? (
              <Session number={tab} session={course.sessions[tab - 1]} /> //Had to spread the object otherwise react was throwing errors will accessing nested properties
            ) : (
              <Certificate course={course.name} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
