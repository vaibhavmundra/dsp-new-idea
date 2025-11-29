"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { currSession } from "../actions/auth";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import GoogleAuth from "../components/auth/google";

export default function Login() {
  const [method, setMethod] = useState("login");
  const [showOTP, setShowOTP] = useState(false);
  const supabase = createClientComponentClient();
  const saved_data = useRef([]);
  const counter_ref = useRef();
  const [session, setSession] = useState(null);
  const [counter, setCounter] = useState(60);
  const [loading, setLoading] = useState(false);
  const [resend, setResend] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  let heading, secondary_text, p_id, o_id;

  const coming_from = searchParams.get("from");
  if (coming_from === "dashboard") {
    heading = "Please login to continue...";
  }

  const payment = searchParams.get("payment_id");
  const order = searchParams.get("order_id");
  if (payment) {
    heading = "Payment received";
    secondary_text = "Please create an account to access your course";
    p_id = payment;
    o_id = order;
  }

  //Setting up the countdown timer for OTP
  function count() {
    setCounter(60);
    counter_ref.current = 60; //Again had to use ref with state to make a functional counter!
    const x = setInterval(() => {
      setCounter((c) => c - 1);
      counter_ref.current--;
      if (counter_ref.current < 1) {
        clearInterval(x);
      }
    }, 1000);
  }

  async function googleSignUp() {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback?dsp_state=furn_ad_signup`, //Redirects to this callback URL as mentioned in Supabase docs
      },
    });
  }

  async function logOut() {
    const { error } = await supabase.auth.signOut();
    location.reload();
  }

  async function logIn(user_data) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: user_data[0],
      options: {
        shouldCreateUser: false,
      },
    });
    if (error) {
      console.log(error, typeof error);
      setIncorrect(true);
      setLoading(false);
      return;
    }
    setIncorrect(false); //Just a general cleanup of states to prevent any messy business
    setLoading(false);
    setShowOTP(true);
    count(); // Starting countdown timer
    setResend(false); //If OTP was previously resent
  }

  async function signUp(user_data) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: user_data[0],
      options: {
        data: {
          name: user_data[1],
          profession: "Ad_signup",
          employment_status: "Ad_signup",
        },
      },
    });
    if (error) {
      console.log(error);
      return;
    }
    setIncorrect(false);
    setLoading(false);
    setShowOTP(true);
    count();
    setResend(false);
  }

  async function verifyOtp(form_data) {
    console.log(saved_data.current, form_data);
    const { data, error } = await supabase.auth.verifyOtp({
      email: saved_data.current[0],
      token: form_data,
      type: "email",
    });
    console.log(data, error);
    if (error) {
      setIncorrect(true); //Showing wrong OTP entered
      setLoading(false); //Stop showing that you're sending the OTP
    }
    router.push("/furn-ad?dsp_state=furn_ad_signup");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!showOTP) {
      //General handler function to handle the 3 forms submitted
      saved_data.current = [];
      for (let [key, value] of formData.entries()) {
        saved_data.current.push(value);
      }
    }
    if (method === "login" && !showOTP) {
      logIn(saved_data.current);
    } else if (method === "signup" && !showOTP) {
      signUp(saved_data.current);
    } else if (showOTP) {
      verifyOtp(document.getElementById("otp").value);
      setIncorrect(false);
    }
  }

  useLayoutEffect(() => {
    async function currentSession() {
      const { data, error } = await supabase.auth.getSession();
      console.log(data, error);
      if (data.session) {
        setSession(data.session);
        console.log(session);
        if (p_id) {
          router.push("/dashboard");
        }
      }
    }
    currentSession();
  }, [method]);

  return (
    <>
      <div className=" grid md:grid-cols-3 h-screen w-full fixed overflow-hidden ">
        <div className="hidden md:block md:col-span-2">
          <div className="p-5 flex flex-col flex-grow w-full h-full justify-end">
            <p className=" text-6xl font-normal text-black">Login to continue</p>
          </div>
        </div>
        <div className="col-span-1 border-l  border-borderGrey flex items-center px-5 w-full h-full">
          {session ? ( //If session exists don't do anything
            <div className="flex flex-col max-w-sm grow mx-auto min-w-fit items-center py-16 px-5">
              <p className="text-4xl text-center font-normal mb-8">
                You are already signed in {session.user.user_metadata.name}
              </p>
              <button
                className="bg-primary rounded-full px-4 h-12 text-white"
                onClick={() => logOut()}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col max-w-sm grow mx-auto min-w-fit">
              <div className="mb-4">
                <h1 className="text-3xl font-normal text-center mb-2">
                  {heading}
                </h1>
                <p className=" text-medium mb-2 text-center">
                  {secondary_text}
                </p>
                {p_id && (
                  <div className=" text-center text-sm text-greyText font-medium">
                    <p>Payment id: {p_id}</p>
                    <p>Order id: {o_id}</p>
                  </div>
                )}
              </div>
              <div className="mb-8 md:mb-16">
                <GoogleAuth />
                {/* <button
                  className="w-full bg-googleColor h-12 rounded-full px-4 flex items-center justify-center hover:opacity-90"
                  onClick={() => googleSignUp()}
                >
                  <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                    <Image width={24} height={24} src="/google.png" alt="" />
                  </span>
                  Continue with Google
                </button> */}
              </div>
              <div>
                <div className="mb-6 grid grid-cols-2 border border-borderGrey rounded-full relative">
                  {/* Select if you wanna login or signup */}
                  <div
                    className={`method-pill absolute w-1/2 h-full bg-primary rounded-full ${
                      method === "signup" && "right-0"
                    }`}
                  ></div>
                  <button
                    className={`h-8 md:h-12 z-10 ${method==="login"&&"text-white"}`}
                    onClick={() => {
                      setMethod("login");
                      setShowOTP(false);
                      saved_data.current = [];
                    }}
                  >
                    Login
                  </button>
                  <button
                    className={`h-8 md:h-12 z-10 ${method==="signup"&&"text-white"}`}
                    onClick={() => {
                      setMethod("signup");
                      setShowOTP(false);
                      saved_data.current = [];
                    }}
                  >
                    Signup
                  </button>
                </div>
                {/* If login is selected and send OTP has not been clicked */}
                {method === "login" && showOTP === false && (
                  <div>
                    <form
                      onSubmit={(e) => {
                        handleSubmit(e);
                        setLoading(true);
                      }}
                      className="text-black mb-8"
                    >
                      <div className="mb-4">
                        <label
                          className="block w-full uppercase text-xs mb-1 text-lightGrey"
                          htmlFor="email"
                        >
                          Enter registered email
                        </label>
                        <input
                          className="block w-full h-12 px-4 rounded-full mb-4 caret-black bg-lightGrey/10"
                          type="email"
                          placeholder="name@example.com"
                          name="email"
                          required
                        ></input>
                      </div>
                      <button
                        className={`w-full h-12 bg-primary rounded-full text-white disabled:bg-lightGrey hover:opacity-90`}
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Sending OTP..." : "Get OTP"}
                      </button>
                    </form>
                    <p
                      className={`uppercase text-xs mb-1 text-errorRed ${
                        incorrect ? "block" : "hidden"
                      }`}
                    >
                      Email not found. Please sign up.
                    </p>
                  </div>
                )}
                {/* If signup is selected and send OTP has not been clicked */}
                {method === "signup" && showOTP === false && (
                  <div>
                    <form
                      onSubmit={(e) => {
                        handleSubmit(e);
                        setLoading(true);
                      }}
                      className="text-black"
                    >
                      <div className="mb-2 md:mb-4">
                        <label
                          className="block w-full uppercase text-xs mb-1 text-lightGrey"
                          htmlFor="email"
                        >
                          Enter email
                        </label>
                        <input
                          className="block w-full h-12 px-4 rounded-full text-black bg-lightGrey/10"
                          type="email"
                          placeholder="name@example.com"
                          name="email"
                          required
                        ></input>
                      </div>
                      <div className="mb-2 md:mb-4">
                        <label
                          className="block w-full uppercase text-xs mb-1 text-lightGrey"
                          htmlFor="name"
                        >
                          Your full name
                        </label>
                        <input
                          className="block w-full h-12 px-4 rounded-full text-black bg-lightGrey/10"
                          type="text"
                          placeholder="Full name"
                          name="name"
                          required
                        ></input>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-1 gap-4 mb-8 hidden">
                        <div className="">
                          <label
                            className="block w-full uppercase text-xs mb-1 text-lightGrey"
                            htmlFor="profession"
                          >
                            Select your profession
                          </label>
                          <div className="relative">
                            <select
                              className="block w-full h-12 bg-white appearance-none text-black px-4 rounded-full"
                              name="profession"
                              required
                            >
                              <option value="Architect">Architect</option>
                              <option value="Interior Designer">
                                Interior Designer
                              </option>
                              <option value="Civil Engineer">
                                Civil Engineer
                              </option>
                              <option value="Other">Other</option>
                            </select>
                            <span className="text-black absolute top-1/2 right-4 -translate-y-1/2">
                              <Image
                                width={16}
                                height={16}
                                src="/arrow.png"
                                alt=""
                              />
                            </span>
                          </div>
                        </div>
                        <div className="">
                          <label
                            className="block w-full uppercase text-xs mb-1 text-lightGrey"
                            htmlFor="employment"
                          >
                            Employment status
                          </label>
                          <div className="relative">
                            <select
                              className="block w-full h-12 bg-white appearance-none text-black px-4 rounded-full"
                              name="employment"
                              required
                            >
                              <option value="Studio owner">Studio owner</option>
                              <option value="Salaried employee">
                                Salaried employee
                              </option>
                              <option value="Currently employed">
                                Currently unemployed
                              </option>
                              <option value="Student">Student</option>
                            </select>
                            <span className="text-black absolute top-1/2 right-4 -translate-y-1/2">
                              <Image
                                width={16}
                                height={16}
                                src="/arrow.png"
                                alt=""
                              />
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        className="w-full h-12 bg-primary rounded-full  text-white disabled:bg-lightGrey hover:opacity-90"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Sending OTP..." : "Get OTP"}
                      </button>
                    </form>
                  </div>
                )}
                {/* If either login/signup is selected and OTP has been sent successfully */}
                {showOTP && (
                  <div>
                    <form
                      className="mb-8 text-black"
                      onSubmit={(e) => {
                        handleSubmit(e);
                        setLoading(true);
                      }}
                    >
                      <div className="mb-4">
                        <label
                          className="block w-full uppercase text-xs mb-1 text-lightGrey"
                          htmlFor="otp"
                        >
                          Enter the OTP received on mail
                        </label>
                        <input
                          className="block w-full h-12 px-4 rounded-full mb-4 bg-lightGrey/10"
                          type="text"
                          placeholder="Enter OTP"
                          name="otp"
                          id="otp"
                        ></input>
                      </div>
                      <button
                        className="w-full h-12 bg-primary rounded-full  text-white disabled:bg-lightGrey hover:opacity-90"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Verifying OTP..." : "Submit"}
                      </button>
                    </form>
                    <div>
                      <p
                        className={`block w-full uppercase text-xs mb-1 text-lightGrey ${
                          counter === 0 ? "opacity-0" : "opacity-1"
                        }`}
                      >
                        You can resend the OTP in{" "}
                        <span id="counter">{counter} seconds</span>
                      </p>
                      <p
                        className={`uppercase text-xs mb-1 text-errorRed ${
                          incorrect ? "block" : "hidden"
                        }`}
                      >
                        Otp has either expired, or is incorrect
                      </p>
                      <div className="flex justify-between">
                        <button
                          onClick={() => setShowOTP(false)}
                          className="flex items-center"
                        >
                          <span className="mr-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                              />
                            </svg>
                          </span>
                          Go back
                        </button>
                        <button
                          className={`underline ${
                            counter === 0 ? "inline-block" : "hidden"
                          }`}
                          disabled={resend}
                          onClick={(e) => {
                            console.log(method);
                            method === "login"
                              ? logIn(saved_data.current)
                              : signUp(saved_data.current);
                            setResend(true);
                          }}
                        >
                          {resend ? "Resending OTP..." : "Resend OTP"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
