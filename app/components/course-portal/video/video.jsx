"use client";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useContext } from "react";
import { CourseContext } from "../course-portal";
import Meeting from "./live-session";
import { createRoom, getRoomCode } from "@/app/actions/hms-actions";

export default function Video() {
  const context = useContext(CourseContext);
  const [roomCode, setRoomCode] = useState();
  const [hit, setHit] = useState(false);
  const [state, setState] = useState(context.section.status);
  console.log(context);
  const screen = context.screen;
  const setScreen = context.setScreen;
  const user = context.user;
  const instructor = context.instructor_access;
  const setterArray = context.setterArray;

  let content, center_content;

  useEffect(() => {
    setterArray.current.tabs_content = {
      setterFunction: setState,
      item_id: parseInt(context.section.id),
    };
    //This function is sending all the state setters to parent
    const corresponding_tab = setterArray.current.tabs.find(
      (item) => item.item_id === context.section.id
    );
    if (corresponding_tab && corresponding_tab.stateNow) {
      setState(corresponding_tab.stateNow);
    }
  }, [context.section]);

  if (context.section.type === "Video" || state === "Archived") {
    content = (
      <div className="w-auto h-auto border border-borderGrey rounded-lg">
        <ReactPlayer
          className="react-player"
          style={{
            paddingTop: "56.25%",
            position: "relative",
          }}
          width="100%"
          height="100%"
          url={context.section.url || context.section.recording_url}
          controls
        />
      </div>
    );
    if (
      state === "Archived" &&
      new Date() - new Date(context.section.date_held) < 1000 * 60 * 60
    ) {
      console.log("Entered this!");
      content = null;
      center_content = (
        <div className="flex flex-col items-center p-5 text-center">
          <p>We are still processing the recordings. Try again in an hour.</p>
        </div>
      );
    }
  } else if (context.section.type === "Live" && state !== "Archived") {
    if (state === "Upcoming") {
      center_content = (
        <div className="flex flex-col items-center p-5 text-center">
          <p>This Session has not started.</p>
          {instructor && (
            <button
              className="px-8 h-12 bg-primary rounded-full mt-2"
              onClick={async () => {
                setHit(true);
                const name = `Live_Session_${context.section.date}-${
                  context.course.id
                }-${context.section.id}-${Date.now()}`;

                const code = await createRoom(
                  name,
                  context.course.id,
                  context.section.id
                );
                setRoomCode(code);
                setScreen("Meeting");
                console.log("Yolo");
                setHit(false);
              }}
              disabled={hit ? true : false}
            >
              {hit ? "Loading..." : "Begin session"}
            </button>
          )}
          <Alert />
        </div>
      );
    }
    if (state === "Ongoing") {
      center_content = (
        <div className="flex flex-col items-center p-5 text-center">
          <p>The session is ongoing.</p>
          <button
            className="px-8 h-12 bg-primary rounded-full mt-2"
            onClick={async () => {
              setHit(true);
              const code = await getRoomCode(
                context.section.room_id,
                context.course.id
              );
              console.log(code);
              setRoomCode(code);
              setScreen("Meeting");
              setHit(false);
            }}
            disabled={hit ? true : false}
          >
            {hit ? "Loading..." : "Join session"}
          </button>
          <Alert />
        </div>
      );
    }
  }
  if (!content) {
    console.log("This the data", context.section.date_held, state);

    content = (
      <div
        className="h-auto w-full flex items-center justify-center bg-black relative rounded-2xl border border-borderGrey"
        style={{ paddingTop: "56.25%" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div>{center_content || "This meeting has ended."}</div>
        </div>
      </div>
    );
  }
  if (screen === "Meeting") {
    content = <Meeting code={roomCode} name={user.name} id={user.id} />;
  }

  return <div className="p-5">{content ? content : <div></div>}</div>;
}

export function Alert() {
  return (
    <div className="mt-8">
      <div className=" md:text-sm text-xs">
        <p className="text-errorRed mb-2">IMPORTANT: </p>
        <div className=" text-lightGrey text-left">
          <p>1. Recommend joining with a PC/Laptop using Chrome.</p>
          <p>2. Refresh the page if unable to join.</p>
        </div>
      </div>
    </div>
  );
}
