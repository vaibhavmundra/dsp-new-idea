"use client";

import { useContext } from "react";
import { CourseContext } from "../course-portal";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  ComputerDesktopIcon,
  SpeakerWaveIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function PlayerFooter() {
  const context = useContext(CourseContext);
  const links = context.section.resource_links;
  const type = context.section.type;
  const f = new Intl.DateTimeFormat("en-in", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const instructor = context.instructor_access;
  const screen = context.screen;

  let status, date, left_content;

  if (type === "Live") {
    status = context.section.status;
    date = f.format(
      new Date(
        context.section.date_held
          ? context.section.date_held
          : context.section.date
      )
    );
  }
  if (status === "Archived" || status === "Upcoming") {
    left_content = (
      <div className="">
        <p
          className={`inline-block px-2 py-1 rounded-full uppercase text-sm mb-2 ${
            status === "Archived" ? "bg-black" : "bg-orange"
          }`}
        >
          {status}
        </p>
        <p>{`${status === "Archived" ? "Held on" : ""} ${date}`}</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 p-5  ">
      <div className="">
        <div className="">{left_content} </div>
      </div>
      <div className="flex justify-end">
        {links && (
          <div className="opacity-70 text-right">
            <p className="font-medium mb-2">Resources for this section:</p>
            <div className="flex flex-col items-end md:flex-row md:items-center gap-2">
              {links.map((link, index) => {
                return (
                  <a
                    className="flex items-center px-4 py-1 rounded-full bg-black text-xs md:text-base"
                    href={link.url}
                    key={index}
                  >
                    <span>{link.title}</span>
                    <span>
                      <ArrowUpRightIcon className="w-4 h-4 ml-1" />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
