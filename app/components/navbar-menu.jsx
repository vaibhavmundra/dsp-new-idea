"use client";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRightIcon,
  Bars3Icon,
  EllipsisVerticalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export function CourseList({courses}){

  function statusChecker(start_date, end_date) {
    // Create a date object for today without the time portion.
    const today = new Date();
    const current = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
    // Parse start_date and end_date strings into date objects.
    const start = new Date(start_date);
    const end = new Date(end_date);
  
    // If today is on or before the start date, return "upcoming"
    if (current <= start) {
      return {label:"upcoming",color:"bg-orange", rank:0};
    }
    // If today is after the end date, return "archived"
    else if (current > end) {
      return {label:"archived",color:"bg-greyText", rank:2};
    }
    // Otherwise (today is a day after start_date and on or before end_date) return "ongoing"
    else {
      return {label:"ongoing",color:"bg-sketch-yellow", rank:1};
    }
  }

  const list_final = [[],[],[]];

  courses.forEach(course => {
    const end_date = course.end_date;
    const start_date = course.start_date;
    const status = statusChecker(start_date,end_date);
    course.status = status;
    if(status.rank===0){
      list_final[0].push(course);
    }
    else if(status.rank===1){
      list_final[1].push(course);
    }
    if(status.rank===2){
      list_final[2].push(course);
    }
  });
  const flattened = list_final.flat();
  return(
    <>
    {flattened.map((course,i)=><div key={i}><Link href={`/courses/${course.slug}`}
    className="opacity-70 hover:opacity-100 flex items-center">
      {course.name}
              <span className={` ${course.status.color} uppercase text-xs rounded-full py-0.5 px-2 ml-1 text-white`}>
                {course.status.label}
              </span>
    </Link></div>)}
    </>
  )
}

export default function NavMenu({ user, className, courses }) {
  const [menu, setMenu] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const supabase = createClientComponentClient();
  const router = useRouter();
  return (
    <nav
      className={`top-0 w-full p-5 flex flex-col
       
           border-b border-borderGrey
          backdrop-blur-md z-20 ${className} ${
            !showNav && !menu && "-translate-y-full"
          } transition-transform duration-300`}
    >
      <div className="flex items-center justify-between">
        <Link href="/" className="hidden md:block">
          <Image src="/dsp-sm-logo.png" width={50} height={50} alt="" />
        </Link>
        <Link href="/" className="block md:hidden">
          <Image src="/dsp-sm-logo.png" width={30} height={30} alt="" />
        </Link>
        <div className="flex items-center">
          <button onClick={()=>{
            if(user){
              router.push('/dashboard')
            }
            else{
              router.push('/login');
            }
          }} className=" border border-white rounded-full h-12 text-white px-4 mr-4 hover:border-white/70">
            {user?"Dashboard":"Login"}
          </button>
        <button
          className="p-2 border bg-white border-white rounded-full text-black relative z-10 hover:bg-fullBlack hover:text-white"
          onClick={() => {
            setMenu((m) => !m);
            console.log(menu);
          }}
        >
          {menu ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <EllipsisVerticalIcon className="w-6 h-6" />
          )}
        </button>
        </div>
      </div>

      <div
        className={`${
          menu ? "md:grid md:grid-cols-2" : "hidden"
        } bg-white text-black absolute top-0 inset-x-0 pt-32 p-5 border-b border-borderGrey`}
      >
        <div className="flex flex-col gap-4">
          <p className="text-3xl mb-4 md:mb-8">{user ? `Hi ${user.name},` : ""}</p>
          <Link href="/" className="opacity-70 hover:opacity-100">
            Home
          </Link>
          <Link href="/about" className="opacity-70 hover:opacity-100">
            About
          </Link>
          <Link href="/blog" className="opacity-70 hover:opacity-100">
            Behind the Space
          </Link>
          {/* <Link href="/dashboard" className="opacity-70 hover:opacity-100">
            Dashboard
          </Link> */}

          {/* {user ? (
            <div
              className="cursor-pointer opacity-70 hover:opacity-100"
              onClick={async () => {
                const { error } = await supabase.auth.signOut();
                location.reload();
              }}
            >
              Logout
            </div>
          ) : (
            <Link href="/login" className="opacity-70 hover:opacity-100">
              Login
            </Link>
          )} */}
          <a
            href="https://designopolis.spayee.com"
            target="_blank"
            className="cursor-pointer opacity-70 hover:opacity-100 flex items-center"
          >
            <span>Legacy website</span>
            <span>
              <ArrowUpRightIcon className="w-4 h-4 ml-1" />
            </span>
          </a>
          <div className="pb-8"></div>
        </div>
        <div className="md:border-l border-borderGrey md:pl-10">
          <p className="text-3xl mb-4">Courses/Workshops</p>
          <div className="flex flex-col gap-4 mb-8">
            <CourseList courses={courses}/>
          </div>
        </div>
      </div>
    </nav>
  );
}
