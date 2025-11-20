import Buy from "@/app/components/razorpay/buy-course";
import Footer from "@/app/components/footer";
import Carousel from "@/app/components/landing-page/carousel";
import KeyLearnings from "@/app/components/landing-page/key-learning";
import Review from "@/app/components/landing-page/review";
import Reviews from "@/app/components/landing-page/reviews-grid";
import Schedule from "@/app/components/landing-page/schedule";
import Marquee from "@/app/components/marquee";
import { Tick } from "@/app/components/style/icons";
import Info from "@/app/components/landing-page/info";
import award from "@/public/works/est_award.jpg";
import dining from "@/public/works/est_dining_2.webp";
import living from "@/public/works/est_living.webp";
import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  BookmarkSquareIcon,
  ChartPieIcon,
  ChatBubbleLeftIcon,
  CheckCircleIcon,
  PlayCircleIcon,
  PresentationChartLineIcon,
  SignalIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import Calendar from "@/app/components/landing-page/calendar";
import Navbar from "@/app/components/navbar";
import * as fbq from "../../components/pixel";
import PageView from "@/app/components/pageview";
import { checkEnrollment, getUserData } from "@/app/actions/auth";
import { getUserPurchases } from "@/app/actions/payment";
import Urgency from "@/app/components/landing-page/urgency";
import Announcement from "@/app/components/announcement";
import Breakup, { Enroll } from "@/app/components/landing-page/breakup";
import { formattedDate, formattedDateLong } from "@/app/components/utilities/formatted_date";

const sessions = [
  {
    date: "2025-11-07",
    sessions: [{ start: "19:00", end: "21:30" }],
    covering:
      "Estimation core concepts | Introduction to class project | Block estimate ",
  },
  {
    date: "2025-11-08",
    sessions: [{ start: "19:00", end: "21:30" }],
    covering: "Working on a real world live project estimate",
  },
  {
    date: "2025-11-09",
    sessions: [{ start: "19:00", end: "21:30" }],
    covering:
      "Continuing our live project estimate | Professional tips for designers | Conclusion",
  },
];

//Important init data that one needs to set
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
const amount = 179900;
const course_id = 26;
const selling = true;
export const est_selling = selling;
const name = "Estimation & Costing for Interior Projects";

export const metadata = {
  title: name,
  description:
    "Develop the critical professional skill of creating cost estimates that win projects, and generate profits",
  openGraph: {
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_STORAGE_URL}/fe7681c7-2eef-4d0a-87bd-45fe6dde30b8.jpg`,
      },
    ],
  },
};

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

export async function Hero(border_bottom) {
  const status = await checkEnrollment(course_id);
  // const current_price = PriceCalculate(sessions[0].date, amount);
  // const price_dates = priceDates(sessions[0].date);

  return (
    <>
      <section
        className={`h-screen md:h-auto flex flex-col items-center relative overflow-hidden  ${
          border_bottom && "border-b border-borderGrey"
        }`}
      >
        {/* Facebook pixel pageview event component */}
        <PageView />
        {/* Facebook pixel pageview event component */}

        <div className="p-5 mb-12 absolute top-1/2 transform -translate-y-1/2 z-10">
          <div className="mx-auto flex flex-col items-center text-center md:w-3/4">
            <h1 className="text-5xl md:text-8xl mb-8">
              Estimation & Costing for Interior Projects
            </h1>
            <p className="mb-12 opacity-60 text-lg">
              Develop the critical professional skill of creating cost estimates
              that win projects, and generate profits
            </p>
            <div className="flex items-center p-1 border border-lightGrey rounded-full backdrop-blur-[2px] relative z-20 overflow-hidden">
              <div className="px-5 text-left font-medium text-xs md:text-base">
                <p>07th-09th November, 2025</p>
                <p>
                  <span className="line-through">INR 4999</span> INR{" "}
                  {amount / 100} <span className="text-[0.5rem]">+ GST</span>
                </p>
              </div>
              <Enroll selling={selling} />

              <div className="absolute inset-0 bg-white opacity-10"></div>
            </div>
            {/* <div className=" text-xs uppercase opacity-70 mt-4 hidden">
              <p className="mb-1 underline">Pricing info:</p>
              <p className="mb-1">
                <span className=" font-medium">
                  INR {(amount - 20000) / 100}
                </span>{" "}
                till {price_dates[0]} 11:59 PM |{" "}
                <span className=" font-medium">
                  INR {(amount - 10000) / 100}
                </span>{" "}
                till {price_dates[1]} 11:59 PM
              </p>
              <p>
                Then <span className="font-medium">INR {amount / 100}</span>{" "}
                till enrollments close
              </p>
              <p>{}</p>
            </div> */}
          </div>
        </div>
        <div className="">
          <div className="">
            <img
              src="/courses/lighting_hero.svg"
              alt="lighting course hero image"
              className="h-screen md:h-auto md:w-full object-cover md:opacity-50"
            />
          </div>
        </div>
      </section>
      {selling && (
        <Urgency
          showUrgency={true}
          amount={amount}
          course_id={course_id}
          status={status}
          selling={selling}
          key="A"
          sessions={sessions}
        />
      )}
      <div
        id="modal"
        className="hidden inset-0 fixed transition-all duration-300  bg-black/70 backdrop-blur-sm z-50"
      ></div>
      <Breakup
        amount={amount}
        course_id={course_id}
        name={name}
        selling={selling}
        start_date = {`${formattedDateLong(sessions[0].date)} ${sessions[0].sessions[0].start}`}
      />
    </>
  );
}

export default function LandingPage() {
  return (
    <>
      {/* <Announcement /> */}
      <Navbar />
      <main className=" bg-fullBlack  text-white">
        <Hero border_bottom={false} />
        <section
          className="px-5 bg-fullBlack transform border-t border-t-borderGrey rounded-3xl pt-16 mb-32 md:pt-32 md:mb-64"
          style={{ boxShadow: "0rem -2rem 2rem rgba(255,255,255,0.05)" }}
        >
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              <div className="md:border-r border-borderGrey">
                <h2 className="text-5xl md:text-6xl mb-8">The basics</h2>

                <div className="grid auto-rows-max gap-4">
                  <div className="">
                    <div className="mb-2 flex items-center">
                      <div className="flex items-end">
                        <div className="w-1 h-1  bg-white"></div>
                        <div className="w-1 h-2 ml-1  bg-greyText"></div>
                        <div className="w-1 h-3 ml-1  bg-greyText"></div>
                      </div>
                      <h4 className="text-lg ml-2">Beginner level</h4>
                    </div>
                    <div className="opacity-50 text-sm">
                      We will build your concepts from scratch
                    </div>
                  </div>
                  <div className="">
                    <div className="mb-2 flex items-center">
                      <SignalIcon className="w-6 h-6 text-white/70" />
                      <h4 className="text-lg ml-2">Online workshop</h4>
                    </div>
                    <div className="opacity-50 text-sm">
                      With lifetime access to recordings
                    </div>
                  </div>
                  <div className="">
                    <div className="mb-2 flex items-center">
                      <UserCircleIcon className="w-6 h-6 text-white/70" />
                      <h4 className="text-lg ml-2">03 Sessions</h4>
                    </div>
                    <div className="opacity-50 text-sm">
                      To be held on weekends
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="uppercase inline-block px-4 py-1 border border-white rounded-full opacity-70 mb-4 md:mb-8">
                  Key learnings
                </h3>
                <ul className="grid grid-rows-6 gap-4">
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-6 h-6 text-orange/70 flex-shrink-0" />
                    <p className="ml-2">
                      You will learn how to create professional estimates that
                      win you projects
                    </p>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-6 h-6 text-orange/70 flex-shrink-0" />
                    <p className="ml-2">
                      You’ll learn how professionals quickly calculate rough
                      costs during client meetings
                    </p>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-6 h-6 text-orange/70 flex-shrink-0" />
                    <p className="ml-2">
                      To calculate quantities for major works such as carpentry,
                      electrical, PU paint, etc.
                    </p>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-6 h-6 text-orange/70 flex-shrink-0" />
                    <p className="ml-2">
                      How to smartly include your profits in the quotation
                    </p>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-6 h-6 text-orange/70 flex-shrink-0" />
                    <p className="ml-2">
                      Current market rates for all major works and how different
                      contractors charge
                    </p>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-6 h-6 text-orange/70 flex-shrink-0" />
                    <p className="ml-2">
                      See how these all come together over a real world
                      residential project
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Workshop info section */}
        <section className="mb-32 md:mb-64 px-5">
          <div className="container mx-auto">
            <h2 className="text-5xl md:text-6xl mb-16">Sessions schedule</h2>
            <div className="border rounded-3xl border-borderGrey bg-gradient-to-t from-black to-fullBlack overflow-hidden">
              <div className="">
                <Calendar sessions={sessions} suppressHydrationWarning />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-fullBlack mb-32 md:mb-64 px-5">
          <div className="container mx-auto ">
            <h2 className="text-5xl md:text-6xl mb-12 md:hidden">
              Meet your instructor
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1 mx-auto border border-borderGrey rounded-3xl flex-col items-start overflow-hidden">
                <div className="relative">
                  <img
                    src="/educators/neha_garg.jpg"
                    alt="educator"
                    className="w-full h-auto"
                  />
                </div>
                <div className="pb-10 pt-5 px-5">
                  <div className="flex items-start mb-4">
                    <p className="text-2xl">Neha Garg</p>
                    <a
                      className="ml-2"
                      href="https://www.linkedin.com/in/nehagarg-studiojane"
                      target="_blank"
                    >
                      <div className="dsp-footer-icon icon-move border border-white rounded-full p-2  hover:bg-white hover:text-black">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="white"
                          stroke="currentColor"
                          className="feather feather-linkedin"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </div>
                    </a>
                  </div>
                  <p className="opacity-50 text-sm">
                    Founder & Principal Designer,<br></br> Studio Jane, Mumbai,{" "}
                    <br></br> Alumnus of LS Raheja School of Architecture,
                    Mumbai
                  </p>
                </div>
              </div>

              <div className="md:col-span-2 flex flex-col justify-between md:pl-8">
                <h2 className="text-5xl md:text-6xl hidden md:block">
                  Meet your instructor
                </h2>
                <div className="mb-8">
                  <p className="md:text-xl opacity-50">
                    Neha Garg is the founder and principal designer of Studio
                    Jane, an interior and architecture consultancy firm based in
                    Mumbai. Her work has been featured in several media outlets,
                    highlighting her ability to create cohesive and elegant
                    spaces that reflect the distinct personalities of her
                    clients. Her projects often include a mix of natural
                    elements, minimalistic designs, and sophisticated touches
                    that create warm and welcoming environments​.
                  </p>
                </div>
                <div className=" grid grid-cols-3 gap-2">
                  <Image
                    src={award}
                    alt="Neha Garg awarded at WADE 2024"
                    className=" rounded-xl object-cover"
                  />
                  <Image
                    src={dining}
                    alt="Work of Studio Jane"
                    className=" rounded-xl object-cover"
                  />
                  <Image
                    src={living}
                    alt="Work of studio Jane"
                    className=" rounded-xl object-cover"
                  />
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </section>

        {/* DSP Advantages section */}
        <section className=" bg-fullBlack mb-16 md:mb-64 px-5">
          <div className="container mx-auto">
            <div className="border-b border-borderGrey mb-16">
              <div className="mb-4 md:mb-8">
                <h2 className="text-5xl md:text-6xl">What is included</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <div className="flex flex-col mb-2">
                  <PlayCircleIcon className="mb-1 w-6 h-6 text-orange/70 flex-shrink-0" />
                  <p className="">Lifetime access</p>
                </div>
                <p className="opacity-50 text-sm">
                  You get lifetime access to the workshop and recordings. You
                  can watch/rewatch at your own pace
                </p>
              </div>
              <div>
                <div className="flex flex-col mb-2">
                  <CheckCircleIcon className="mb-1 w-6 h-6 text-orange/70 flex-shrink-0" />
                  <p className="">Participation certificate</p>
                </div>
                <p className="opacity-50 text-sm">
                  You will get a participation certificate that you can share on
                  Linkedin
                </p>
              </div>
              <div>
                <div className="flex flex-col mb-2">
                  <ChatBubbleLeftIcon className="mb-1 w-6 h-6 text-orange/70 flex-shrink-0" />
                  <p className="">Community access</p>
                </div>
                <p className="opacity-50 text-sm">
                  Get access to our community of like minded spatial designers.
                </p>
              </div>
              <div>
                <div className="flex flex-col mb-2">
                  <ArrowDownTrayIcon className="mb-1 w-6 h-6 text-orange/70 flex-shrink-0" />
                  <p className="">Downloadable study material</p>
                </div>
                <p className="opacity-50 text-sm">
                  Every learning experience also contains supplemental learning
                  materials that you can download
                </p>
              </div>
              <div>
                <div className="flex flex-col mb-2">
                  <ChartPieIcon className="mb-1 w-6 h-6 text-orange/70 flex-shrink-0" />
                  <p className="">Quizzes & projects</p>
                </div>
                <p className="opacity-50 text-sm">
                  Reinforce concepts with interesting quizzes and projects
                </p>
              </div>
              <div>
                <div className="flex flex-col mb-2">
                  <UserCircleIcon className="mb-1 w-6 h-6 text-orange/70 flex-shrink-0" />
                  <p className="">Expert support</p>
                </div>
                <p className="opacity-50 text-sm">
                  Our Instructors are only a message away for answers and
                  feedback
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-5 bg-fullBlack mb-16 md:mb-64">
          <div className="container mx-auto">
            <h2 className="text-5xl md:text-6xl mb-8 md:mb-16">
              Reviews from past editions
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Review
                heading="“...because of how everything was explained with the help of a project...”"
                text="In architecture, practical knowledge about things is one of the most integral part of the course. This course enabled me to understand how the estimation of a project needs to be done in a very clear way mostly because of how everything was explained with the help of a project. This allowed me to relate and understand the requirements. In a conventional method, it becomes very difficult to relate and imagine the project. But this unconventional method was very practical and helpful. Looking forward to more such courses for Designopolis!"
                courseType="Workshop"
                courseName="Estimation and Costing for Interior Projects"
                customerName="Anashuiya Bhattacharya"
                profession="Architect"
              />
              <Review
                heading="“...And I am now able to create the estimate of my own small residence projects.”"
                text="I am very much overwhelmed to the efforts being made to introduce the Basic Concept of Estimation & Costing. 

                Whenever a project is introduced to me, the client asks for the cost of project so that this may help him in making practical decisions before execution of the work & for getting the Bank loan sanctioned. 
                
                Thus I decided to take this Course. Being an Architect I found it very precise and briefly elaborated to have an accurate idea of the costs involved in the project. And this estimate course helps in to have a Cost Control of the estimate. And I am now able to create the estimate of my own small residence projects. In short this course is very clear & the study material, all resources i.e the dwgs, the 3d are very helpful to understand & create the estimate step by step."
                courseType="Course"
                courseName="Complete Estimation and Costing"
                customerName="Md Manzar Shaban"
                profession="Architect"
              />
              <Review
                heading="“...This course provides all the details about practical knowledge...”"
                text="It is the best course for those students who really intrigue in estimation And costing. This course provides all the details about practical knowledge And skills which are quite needful on the sites."
                courseType="Workshop"
                courseName="Estimation and Costing for Interior Projects"
                customerName="Akshay Raoji Kamble"
                profession="Architect"
              />
              <Review
                heading="“...Step by step sessions really helped.”"
                text="Learnt a lot through this course. Step by step sessions really helped. Also the detailed filling of measurement sheet was very helpful to understand the subject thoroughly."
                courseType="Workshop"
                courseName="Estimation and Costing for Interior Projects"
                customerName="Zeal Modi"
                profession="Architect"
              />
            </div>
          </div>
        </section>
        <Hero border_bottom={true} />
        <Marquee />
        <Footer />
      </main>
    </>
  );
}
