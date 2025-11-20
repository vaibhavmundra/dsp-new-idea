"use client";
import { useEffect, useState, useRef } from "react";
import {
  createMessage,
  getMessages,
  runAssistant,
  runCheck,
  createThread,
} from "@/app/actions/openai";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import RecordingAnimation from "../animations/recording";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

export default function BuildBrain({ user }) {
  const assistantId = "asst_bTPywn7Cyq3Bge1aVnIOG8Kf";
  // const threadId = "thread_7BV8904nH9MHDaU8KBOKZzub";
  const [messages, setMessages] = useState(null);
  const [text, setText] = useState("");
  const threadId = useRef("");
  const [loading, setLoading] = useState(false);
  const [greeting, setGreeting] = useState(true);

  const handleChange = (e) => {
    setText(e.target.value);
    e.target.style.height = "inherit";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  async function newMessage(thread, text) {
    const data = await createMessage(thread, text);
    // const all_messages = await getMessages(thread);
    // setMessages(all_messages);
    // setLoading(true);
    // setText("");
    handleRun();
  }

  async function handleCreateNewMessage(e) {
    e.preventDefault();
    if (text && threadId.current) {
      newMessage(threadId.current, text);
    } else if (!threadId.current) {
      const thread = await createThread();
      threadId.current = thread.id;
      newMessage(threadId.current, text);
    }
  }

  async function runPoll(id) {
    const run = await runCheck(threadId.current, id);
    if (run.status === "queued" || run.status === "in_progress") {
      setTimeout(() => runPoll(id), 500);
    } else if (run.status === "completed") {
      const all_messages = await getMessages(threadId.current);
      setMessages(all_messages);
      setLoading(false);
      setText("");
    }
  }

  async function handleRun() {
    const run = await runAssistant(
      assistantId,
      threadId.current,
      "Please give a detailed answer for this by referring to the National Building Code of India"
    );
    runPoll(run.id);
  }

  async function getThread() {
    const prev_messages = await getMessages(threadId.current);
    setMessages(prev_messages);
  }

  function removeCitations(text) {
    let cleanedText = text.replace(/【.*?】/g, "");
    return cleanedText;
  }

  //Since we're creating new thread for every refresh, we'll not load previous threads at all
  // useEffect(() => {
  //   getThread();
  // }, []);

  return (
    <>
      <section className="">
        <div className="fixed">
          <img
            src="/courses/lighting_hero.svg"
            alt="lighting course hero image"
            className="h-screen md:h-auto md:w-full object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto p-5 relative z-10">
          <div className="">
            <div
              className={`${
                greeting ? "flex" : "hidden"
              } flex-col h-[50vh] items-center justify-center text-center  `}
            >
              <h1 className="text-5xl mb-8">
                I&apos;m Hugo, how can I help you today?
              </h1>
              <div className="">
                <p className="opacity-70">
                  Ask Hugo any queries you have from the{" "}
                  <span className="underline">
                    National Building Code of India
                  </span>
                  .<br></br> Please note that this is still in beta and the
                  answers are for informational purposes only.
                </p>
              </div>
            </div>
          </div>
          <div className="pt-10 pb-20">
            <div className="chat">
              {messages &&
                messages.data.length > 0 &&
                messages.data.map((el, i) => {
                  return (
                    <>
                      <div key={el.id} className="chat-role mb-8">
                        {el.role === "user" ? (
                          <div className="avatar font-medium mb-1">You</div>
                        ) : (
                          <div className="avatar font-medium mb-1">Hugo</div>
                        )}

                        <div className="text-content opacity-70">
                          <ReactMarkdown>
                            {removeCitations(el.content[0].text.value)}
                          </ReactMarkdown>
                          {/* {el.content[0].text.value} */}
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
            <div className={`${loading ? "block" : "hidden"}`}>
              <div className="mb-8">
                <div className="avatar font-medium mb-1">You</div>
                <div className="text-content opacity-70">{text}</div>
              </div>
              <div className={`avatar font-medium mb-1`}>Hugo</div>
              <div>
                <RecordingAnimation />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-5 fixed bottom-0 inset-x-0 z-20 mb-5">
            <div
              className={`message-prompt  overflow-hidden flex justify-between px-5 items-center  bg-black/70 backdrop-blur-md ${
                user ? "rounded-3xl" : "rounded-full"
              }`}
            >
              <textarea
                name="text-area"
                onChange={handleChange}
                value={text}
                className="text-prompt flex-grow bg-black/0 pt-5 resize-none"
                placeholder={
                  user ? "Message Hugo..." : "Please login to continue..."
                }
                disabled={user ? false : true}
              ></textarea>
              {user ? (
                <button
                  className="send-btn ml-8 absolute bottom-3 right-8 bg-primary hover:bg-primary/70 rounded-full p-2 z-40"
                  onClick={(e) => {
                    if (user) {
                      setLoading(true);
                      handleCreateNewMessage(e);
                      setGreeting(false);
                    }
                  }}
                >
                  <ArrowUpIcon className="w-6 h-6" />
                </button>
              ) : (
                <Link
                  className="absolute right-0 bottom-1/2 translate-y-1/2 z-40 flex items-center justify-center px-6 md:px-8 h-12 mr-8 bg-primary rounded-full text-white hover:bg-primary/70"
                  href="/login"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
