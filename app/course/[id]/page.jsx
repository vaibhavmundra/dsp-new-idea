import CoursePortal from "../../components/course-portal/course-portal";
import { notFound } from "next/navigation";
import {
  checkEnrollment,
  getInstructorStatus,
  getUserData,
} from "@/app/actions/auth";
import { getCourseData } from "@/app/actions/course-data";
import { getUserPurchases } from "@/app/actions/payment";
export const dynamic = "force-dynamic";

export default async function Course({ params }) {
  let content;
  const course = await getCourseData(params.id);
  if (course.errors) {
    notFound();
  }

  const enrolled = await checkEnrollment(+params.id);
  const user = await getUserData();
  const instructor_access = await getInstructorStatus(params.id);
  console.log(instructor_access);
  console.log("This is enrolled", enrolled);

  if (
    (enrolled && Object.keys(enrolled).length) ||
    user.role === 1 ||
    user.role === 2 ||
    instructor_access
  ) {
    content = (
      <CoursePortal
        course={course.data}
        user={user}
        instructor_access={instructor_access}
      />
    );
  } else {
    content = <h1>Please enroll for this course</h1>;
  }
  // const enrolled_courses = await getUserPurchases(user.email);
  // let enroll_status = enrolled_courses.find((item) => item === +params.id);
  // if (user.role === 1) {
  //   enroll_status = true;
  // }
  // if (!enroll_status) {
  //   content = <h1>Please enroll for this course</h1>;
  // } else {
  //   content = (
  //     <CoursePortal
  //       course={course.data}
  //       user={user}
  //       instructor_access={instructor_access}
  //     />
  //   );
  // }

  return <>{content}</>;
}
