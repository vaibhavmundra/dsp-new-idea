"use client";
import getCourseData from "@/app/actions/course-data";
import { useLayoutEffect, useState } from "react";
import theme from "../get-theme";
import { ArrowRightIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import CourseCard from "./course-card";

export default function DashboardCourses({ user, courses }) {
  //For testimg purposes
  // const courses_temp = new Array(20).fill(courses[0]);
  let content;
  if (!courses.length) {
    content = (
      <div className="text-center flex justify-center items-center px-5 w-full h-full">
        <div className="">
          <h1 className="text-4xl font-light mb-8">
            You have not enrolled for any courses or workshops.
          </h1>
          <p>After you enroll, you can access your course from this page</p>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="py-5 md:h-auto md:w-auto">
        <h1 className="text-4xl mb-4">
          {user.role === 1 ? "Admin view" : "Enrolled courses:"}
        </h1>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-8">
          {courses.map((course, i) => {
            return <CourseCard user={user} course={course} key={i} />;
          })}
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="min-h-full w-full p-5">{content}</div>
    </>
  );
}
