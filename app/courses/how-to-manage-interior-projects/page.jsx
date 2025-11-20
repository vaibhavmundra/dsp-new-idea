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
import Breakup, { Enroll } from "@/app/components/landing-page/breakup";
import Announcement from "@/app/components/announcement";
import { formattedDate, formattedDateLong } from "@/app/components/utilities/formatted_date";

const sessions = [
  {
    date: "2025-09-26",
    sessions: [{ start: "19:00", end: "21:30" }],
    covering:
      "Introduction | Project Cycle | Common execution problems",
  },
  {
    date: "2025-09-27",
    sessions: [{ start: "19:00", end: "21:30" }],
    covering:
      "Managing client expectations | Site analysis checklist | Budgeting",
  },
  {
    date: "2025-09-28",
    sessions: [{ start: "19:00", end: "21:30" }],
    covering:
      "Project planning in detail | Vendor management | Procurement",
  }
];

//Important init data that one needs to set
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
const amount = 179900;
const course_id = 24;
const selling = true;
const name = "How to Manage Interior Projects";

export const metadata = {
  title: name,
  description:
    "Develop a practical understanding, explore best practices, and learn how to effectively manage interior projects",
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
  console.log(status);
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
            <h1 className="text-5xl md:text-8xl mb-8">{name}</h1>
            <p className="mb-12 opacity-60 text-lg">
            Develop a practical understanding, explore best practices, and learn how to effectively manage interior projects
            </p>
            <div className="flex items-center p-1 border border-lightGrey rounded-full backdrop-blur-[2px] relative z-20 overflow-hidden">
              <div className="px-5 text-left font-medium text-xs md:text-base">
                <p>26th Sep - 28th Sep, 2025</p>
                <p>
                  <span className="line-through">INR 2999</span> INR{" "}
                  {amount / 100} <span className="text-[0.5rem]">+ GST</span>
                </p>
              </div>

              {/* <Buy
                name={name}
                amount={amount}
                course_id={course_id}
                status={status}
                showStatus={true}
                selling={selling}
                className="px-6 md:px-8 h-12 bg-primary rounded-full text-sm text-white hover:bg-primary/70 relative z-10"
              >
                Enroll now
              </Buy> */}
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
      {/* <Announcement></Announcement> */}
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
                      <h4 className="text-lg ml-2">03 sessions</h4>
                    </div>
                    <div className="opacity-50 text-sm">
                      The workshop will be held over 03 sessions
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
                      How to make a project execution timeline and track progress
                    </p>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-6 h-6 text-orange/70 flex-shrink-0" />
                    <p className="ml-2">
                    Incorporate best practices before construction starts at site
                    </p>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-6 h-6 text-orange/70 flex-shrink-0" />
                    <p className="ml-2">
                      Day to day management of sites and site-visit checklist
                    </p>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-6 h-6 text-orange/70 flex-shrink-0" />
                    <p className="ml-2">
                      Best practises to manage billing, vendors, and contractors
                    </p>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-6 h-6 text-orange/70 flex-shrink-0" />
                    <p className="ml-2">
                      Pre-handover checklist, snag lists, and warranty management
                    </p>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-6 h-6 text-orange/70 flex-shrink-0" />
                    <p className="ml-2">
                      Get access to professional{" "}
                      <span className="font-semibold">checklists and templates</span>
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
            <div className="mb-16">
              <h2 className="text-5xl md:text-6xl mb-4">Sessions schedule</h2>
              <p className="mb-12 opacity-60 text-lg">
                This workshop consists of 03 live sessions
              </p>
            </div>
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
              <div className="md:col-span-1 mx-auto border border-borderGrey rounded-3xl flex flex-col items-start overflow-hidden">
                <div className="relative">
                  <img
                    src="/educators/swathika_prem.jpg"
                    alt="educator"
                    className="w-full h-auto"
                  />
                </div>
                <div className="pb-10 pt-5 px-5">
                  <div className="flex items-start mb-4">
                    <p className="text-2xl">Swathika Prem</p>
                    <a
                      className="ml-2"
                      href="https://www.linkedin.com/in/swathika-prem-778b68109/"
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
                  Architect & Construction Consultant,
                    <br></br> MSc Construction Management, University of Adelaide
                    <br></br>Leasing Consultant, Jupiter Texas
                  
                  </p>
                </div>
              </div>

              <div className="md:col-span-2 flex flex-col justify-between md:pl-8">
                <h2 className="text-5xl md:text-6xl hidden md:block">
                  Meet your instructor
                </h2>
                <div>
                  <p className="md:text-xl opacity-50">
                  Swathika is a highly skilled architect with a Masters degree in Construction Management from the University of Adelaide. She has extensive experience in the fit-out sector, specializing in residential, retail, and office spaces. Throughout her career, Swathika has worked with prominent companies such as Livspace, John Holland, and Smartworks, gaining valuable expertise across a variety of projects. Currently, she serves as a consultant for a US-based startup, where she applies her in-depth background in both architecture and project execution. 
                  <br></br>
                  <br></br>
                  With a strong focus on design and construction, Swathika collaborates with design firms to ensure execution excellence across all projects. Her practical knowledge and strategic insights allow her to effectively navigate the complexities of construction project management.
                  </p>
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
                heading="“...drew very clear day to day construction/design problems...”"
                text="The instructor drew very clear day-to-day contruction/design problems paralells to PM. She gave a very clear understanding about how we can add structure to the creative process. The course itself was designed in a way which respected attendee's time. "
                courseType="Workshop"
                courseName="How to Manage Interior Projects"
                customerName="Srusti Ithal"
                profession="Interior Designer"
              />
              <Review
                heading="“...The training covered all the aspects of PM in complete detail with lots of practical examples...”"
                text="I found the coursed to be a good balance between theory and practical knowledge. The training covered all the aspects of PM in complete detail with lots of practical examples, most importantly relevant to our Indian context. I recommend the training to all the professionals of our field."
                courseType="Workshop"
                courseName="How to Manage Interior Projects"
                customerName="Chandrahas Umrania"
                profession="Architect with 30+ years of experience"
              />
              <Review
                heading="“...taught in a very interesting manner, punctured with personal anecdotes.”"
                text="The subject was taught in a very interesting manner, punctured with personal anecdotes. I appreciate the comprehensiveness of the course syllabus. The teacher turned a boring subject into an engrossing one. I also liked the professionalism, platform and manner in which Designopolis organized the workshop. "
                courseType="Workshop"
                courseName="How to Manage Interior Projects"
                customerName="Sharmishtha Tembhurnikar"
                profession="Architect"
              />
              <Review
                heading="“She introduced structure to what can be an overly creative design process.”"
                text="The instructor brought about many real life paralells faced by designers on a day to day basis for each bullet point she made. She introduced structure to what can be an overly creative design process. This is a starting out point to anyone intrested in PM."
                courseType="Workshop"
                courseName="How to Manage Interior Projects"
                customerName="Shilpa Varadharajan "
                profession="Interior Designer"
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
