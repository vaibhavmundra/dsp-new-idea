"use client";
import { useRef, useEffect, useState, createContext } from "react";
import Link from "next/link";
import Image from "next/image";
import Certificate from "./certificate";
import { ArrowLongLeftIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Downloads from "./donwloads";
import Player from "./video/player";
import Tab from "./tab";
import NavMenu from "../navbar-menu";
import Questions from "./questions";

///////////////////////////////////////////////
export const CourseContext = createContext();
///////////////////////////////////////////////

export default function CoursePortal({ course, user, instructor_access }) {
  const [screen, setScreen] = useState("Nothing");
  // const [tab, setTab] = useState(course.chapters[0].sections[0]);
  const [tab, setTab] = useState("Welcome");
  const [mobMenu, setMobMenu] = useState(false);
  //The setter array is passed on to each tab component and collects the setLive state setter function of that tab so that we can modify the 'live' state from the parent
  const setterArray = useRef({ tabs: [], tabs_content: null });

  useEffect(() => {
    //This function goesthrough all the setter functions delivered from the tab.jsx and video.jsx components and finds the one whose Live state needs to be updated and updates it.
    function changeTabLiveState(id, status) {
      const setterObj = setterArray.current.tabs.find(
        (item) => item.item_id === id
      );
      const setterFunc = setterObj.setterFunction;
      setterFunc(status);
      setterObj.stateNow = status;

      //Will only change state if the current user is not already in a meeting/video. This prevents a re-render when the educator inits session.
      if (
        id === setterArray.current.tabs_content.item_id &&
        screen !== "Meeting"
      ) {
        const content_setterFunc =
          setterArray.current.tabs_content.setterFunction;
        content_setterFunc(status);
      }
    }

    //Setting up websockets
    const url = process.env.NEXT_PUBLIC_DIRECTUS_SOCKET_URL;
    const token = process.env.NEXT_PUBLIC_DIRECTUS_SOCKET_TOKEN;
    const collection = "section";
    console.log(url, token, collection);

    const connection = new WebSocket(url);

    function subscribe() {
      connection.send(
        JSON.stringify({
          type: "subscribe",
          collection: collection,
          query: { fields: ["id", "status", "name"] },
        })
      );
    }

    connection.addEventListener("open", function () {
      console.log({ event: "onopen" });
      connection.send(
        JSON.stringify({
          type: "auth",
          access_token: token,
        })
      );
    });

    connection.addEventListener("message", function (message) {
      const data = JSON.parse(message.data);
      if (data.type === "auth" && data.status === "ok") {
        subscribe();
      }
      if (data.type === "ping") {
        connection.send(JSON.stringify({ type: "pong" }));
        console.log("Playing ping pong");
      }
      if (data.event === "update") {
        const name = data.data[0].name;
        const status = data.data[0].status;
        const arr = name.split("-");
        const c_id = parseInt(arr[arr.length - 3]); //Changes in how the course is named in video.jsx will affect this
        const s_id = parseInt(arr[arr.length - 2]);

        if (
          c_id === course.id &&
          (status === "Ongoing" || status === "Archived")
        ) {
          console.log(`A session was just ${status}`);
          changeTabLiveState(s_id, status);
        }
      }
    });

    connection.addEventListener("close", function () {
      console.log({ event: "onclose" });
    });

    connection.addEventListener("error", function (error) {
      console.log({ event: "onerror", error });
    });

    return () => {
      connection.close();
    };
  }, []);

  return (
    <CourseContext.Provider
      value={{
        course: course,
        user: user,
        section: tab,
        setSection: setTab,
        instructor_access: instructor_access,
        screen: screen,
        setScreen: setScreen,
        setterArray: setterArray,
      }}
    >
      <div className="bg-fullBlack h-screen md:grid md:grid-cols-4 overflow-hidden text-white relative">
        <div
          className={`fixed w-full h-full bg-fullBlack/70 backdrop-blur-lg z-10 justify-between md:relative md:col-span-1 md:border-r  md:border-borderGrey ${
            mobMenu ? "flex flex-col" : "hidden md:flex md:flex-col"
          }`}
        >
          <div className="flex flex-col">
            <div className="px-5 py-3 md:p-5 flex flex-col justify-center border-b border-borderGrey">
              <div className="flex justify-between mb-6">
                <Link href="/dashboard">
                  <button className="flex items-center opacity-70 transition duration-300 hover:opacity-100">
                    <span>
                      <ArrowLongLeftIcon className="w-6 h-6" />
                    </span>
                    <p className="ml-2 text-sm">Dashboard</p>
                  </button>
                </Link>
                {instructor_access && (
                  <div className="py-1 px-2 border border-borderGrey rounded-full flex-shrink hidden md:block">
                    <p className="text-xs uppercase opacity-70">admin view</p>
                  </div>
                )}
                <button
                  className={`md:hidden`}
                  onClick={() => setMobMenu(false)}
                >
                  <XCircleIcon className="w-8 h-8 stroke-1" />
                </button>
              </div>
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
              <div className="px-5 py-3 border-b border-borderGrey shadow-2xl">
                <h2 className="text-lg">Sections</h2>
              </div>
              <div className=" h-[40vh] overflow-y-scroll course-sections">
                {course.chapters.map((chapter, index) => {
                  return (
                    <div key={index} className="">
                      <div className="px-5 py-3 flex items-center opacity-70 border-t border-borderGrey font-medium">
                        <p className="w-6 h-6 text-white/70">{index + 1}:</p>
                        <p className="ml-2">{chapter.name}</p>
                      </div>
                      <div>
                        {chapter.sections.map((item, i) => {
                          return (
                            <Tab
                              item={item}
                              key={i}
                              setTab={setTab}
                              currTab={tab}
                              setterArray={setterArray}
                              setMobMenu={setMobMenu}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              {course.downloads && (
                <div
                  className={`text-lg  px-5 py-3 border-b border-borderGrey cursor-pointer  hover:bg-white hover:text-black ${
                    tab === "downloads" && "bg-white text-black"
                  }`}
                  onClick={() => {
                    setTab("downloads");
                    setMobMenu(false);
                  }}
                >
                  <h2>Downloads</h2>
                </div>
              )}
              <div
                className={`text-lg  px-5 py-3 border-b border-borderGrey cursor-pointer  hover:bg-white hover:text-black ${
                  tab === "certificate" && "bg-white text-black"
                }`}
                onClick={() => {
                  setTab("certificate");
                  setMobMenu(false);
                }}
              >
                <h2>Certificate</h2>
              </div>
              {course.questions_tag && (
                <div
                  className={`text-lg  px-5 py-3 border-b border-borderGrey cursor-pointer  hover:bg-white hover:text-black ${
                    tab === "questions" && "bg-white text-black"
                  }`}
                  onClick={() => {
                    setTab("questions");
                    setMobMenu(false);
                  }}
                >
                  <h2>Forum</h2>
                </div>
              )}
            </div>
          </div>

          <div className="hidden md:flex justify-center p-5">
            <Image
              src="/designopolis-logo-lg.png"
              width={200}
              height={200}
              alt="designopolis logo"
            />
          </div>
        </div>
        <main
          className={`fixed w-full overflow-hidden flex flex-col md:static md:h-full md:col-span-3`}
          style={{
            height:
              window.innerWidth < 768 && screen !== "Meeting"
                ? window.innerHeight - 48 + "px"
                : "100%",
          }}
        >
          {tab === "downloads" && <Downloads />}
          {(tab.type === "Video" || tab.type === "Live") && <Player />}
          {tab === "certificate" && <Certificate course={course} />}
          {tab === "questions" && (
            <div className="relative w-full h-full">
              <Questions course={course} user={user} />
            </div>
          )}
          {tab === "Welcome" && (
            <div className="w-full h-full p-5 flex items-center justify-center text-center">
              <p className="text-3xl">
                Welcome to the {course.name}{" "}
                {course.type === "Hybrid" ? "Course" : course.type}!
              </p>
              <p></p>
            </div>
          )}
        </main>
        <button
          className={`h-12 fixed z-20 bottom-0 inset-x-0 bg-white text-black items-center justify-center border-t border-borderGrey md:hidden ${
            mobMenu || screen === "Meeting" ? "hidden" : "flex"
          }`}
          onClick={() => {
            setMobMenu(true);
          }}
        >
          Menu
        </button>
      </div>
    </CourseContext.Provider>
  );
}
