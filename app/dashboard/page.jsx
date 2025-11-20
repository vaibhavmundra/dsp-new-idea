import { getSession, getUserData } from "../actions/auth";
import getCourseData, { getCourses } from "../actions/course-data";
import { getUserPurchases } from "../actions/payment";
import DashboardPortal from "../components/dashboard/dashboard-portal";

export default async function Dashboard() {
  const user = await getUserData();
  const purchases = await getUserPurchases(user.email);
  let enrolled_courses = [];
  let courses = [];
  if (purchases.length) {
    enrolled_courses = purchases.map((purchase) => purchase.course_id);
  }
  if (purchases.length || user.role === 1) {
    const { data } = await getCourses();
    if (user.role === 1 || user.role === 2) {
      courses = data;
    } else {
      enrolled_courses.forEach((id) => {
        courses.push(data.find((course) => course.id === id));
      });
    }
  }

  return (
    <DashboardPortal user={user} courses={courses} purchases={purchases} />
  );
}
