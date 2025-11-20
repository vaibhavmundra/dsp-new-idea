"use client";

import { useContext } from "react";
import { CourseContext } from "../course-portal";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

export default function PlayerHeader() {
  const context = useContext(CourseContext);
  const screen = context.screen;
  const setScreen = context.setScreen;
  console.log("This is the data", context.section);

  return (
    <div className="p-5">
      <div className=" flex items-center justify-between">
        <div className="text-3xl md:text-5xl">
          {context.section.title ||
            (context.section.type === "Live" ? "Live Session" : "Video Lesson")}
        </div>
      </div>
    </div>
  );
}
