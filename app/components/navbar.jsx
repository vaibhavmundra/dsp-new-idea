import { getUserData } from "../actions/auth";
import { getCourseList, getCourses } from "../actions/course-data";
import NavMenu from "./navbar-menu";

export default async function Navbar() {
  const user = await getUserData();
  const selling_course_ids = [16,26,24,28,27];
  const courses = await getCourseList(selling_course_ids);

  return (
    <div className="relative z-50">
      <NavMenu user={user} courses={courses.data} />
    </div>
  );
} 
