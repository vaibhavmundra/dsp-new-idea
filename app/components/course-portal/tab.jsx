"use client";
import {
  ArrowDownTrayIcon,
  ArrowLongLeftIcon,
  ArrowUpRightIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  MicrophoneIcon,
  PlayCircleIcon,
  SignalIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import RecordingAnimation from "../animations/recording";
import { useContext, useEffect, useState } from "react";
import { CourseContext } from "./course-portal";

export default function Tab({ item, setTab, currTab, setMobMenu }) {
  const [state, setState] = useState(item.status);
  const context = useContext(CourseContext);
  const setterArray = context.setterArray;
  let active;
  if (currTab.id === item.id) {
    active = true;
  }

  useEffect(() => {
    setterArray.current.tabs.push({
      stateNow: item.status, //This value will be updated by course portal so that it can easily be referenced by the video.jsx component and show the right content
      setterFunction: setState,
      item_id: parseInt(item.id),
    }); //This function is sending all the state setters to parent
  });

  function getIcon(type) {
    if (type === "Live") {
      return <SignalIcon className="w-6 h-6" />;
    } else if (type === "Video") {
      return <PlayCircleIcon className="w-6 h-6" />;
    } else if (type === "Quiz") {
      return <TrophyIcon className="w-6 h-6" />;
    } else if (type === "Article") {
      return <BookOpenIcon className="w-6 h-6" />;
    } else if (type === "Link") {
      return <ArrowUpRightIcon className="w-6 h-6" />;
    } else if (type === "Download") {
      return <ArrowDownTrayIcon className="w-6 h-6" />;
    } else {
      return <CheckCircleIcon className="w-6 h-6" />;
    }
  }
  const icon = getIcon(item.type);

  return (
    <a href={item.type === "Link" ? item.url : null} target="_blank">
      <div
        className={`py-3 md:py-5 pl-8 pr-5 flex items-center justify-between group cursor-pointer hover:bg-white hover:text-black ${
          active && "bg-white text-black"
        }`}
        key={item.id}
        onClick={() => {
          setTab(item);
          setMobMenu(false);
          console.log("baga");
        }}
      >
        <div className="flex items-center">
          <div
            className={` group-hover:text-orange ${
              active ? "text-orange" : "text-white"
            }`}
          >
            {icon}
          </div>
          <p className="ml-2">
            {item.title ||
              (item.type === "Quiz" && "Quiz") ||
              (item.type === "Link" && "External link") ||
              (item.type === "Live" && "Live Session")}
          </p>
        </div>
        {state === "Ongoing" && (
          <div className="flex items-center justify-center text-orange text-xs uppercase px-2 py-1 rounded-full ">
            <div className="relative z-10">
              <RecordingAnimation />
            </div>
            <span className="ml-2">Live</span>
          </div>
        )}
        {state === "Archived" && (
          <div className="flex items-center justify-center text-borderGrey text-xs uppercase px-2 py-1 rounded-full border border-borderGrey">
            Video
          </div>
        )}
      </div>
    </a>
  );
}
