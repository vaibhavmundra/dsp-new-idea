"use client";
import { useContext } from "react";
import { CourseContext } from "./course-portal";
import Link from "next/link";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export default function Downloads() {
  const context = useContext(CourseContext);

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 p-5 gap-4">
      {context.course.downloads.map((item, i) => {
        return (
          <Link href={item.url} target="_blank" key={i}>
            <div className="bg-black border border-borderGrey p-5 rounded-xl flex items-center justify-between">
              <p>{item.title}</p>
              <span>
                <ArrowDownTrayIcon className="w-4 h-4/" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
