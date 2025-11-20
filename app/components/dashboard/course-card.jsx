import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function CourseCard({ course, user }) {
  console.log(course, user);
  const [loading, setLoading] = useState(false);
  return (
    <div className="border border-borderGrey rounded-3xl flex flex-col overflow-hidden bg-black">
      <div className={` md:flex  p-5 border-b border-b-borderGrey grow`}>
        <div className="flex flex-col">
          <div>
            <p className="px-2 py-0.5 bg-primary rounded-full text-xs uppercase inline-block mb-2">
              {course.type}
            </p>
          </div>
          <h3 className="text-lg font-light mb-4">{course.name}</h3>
          <div className="flex">
            <div className="text-xs opacity-50">{`By ${course.educator_name}`}</div>
          </div>
        </div>
      </div>
      <div className="p-5 text-sm">
        {(user.role === 1 || user.role === 2 || course.live === true) && (
          <Link
            href={`/course/${course.id}`}
            className="flex items-center"
            onClick={() => setLoading(true)}
          >
            <span>{loading ? "Loading..." : "Go to course"}</span>
            <span>
              <ChevronRightIcon className={`w-4 h-4 ${loading && "hidden"}`} />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
