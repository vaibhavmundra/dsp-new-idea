"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { getCourseData } from "./course-data";
import { getUserPurchases } from "./payment";

export async function logout() {
  const supabase = createServerComponentClient({ cookies });
  const { error } = await supabase.auth.signOut();
}

export async function getUserDataLegacy() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.auth.getSession();
  if (data.session) {
    const name =
      data.session.user.user_metadata.first_name +
      " " +
      data.session.user.user_metadata.last_name;
    const first_name = data.session.user.user_metadata.first_name;
    const last_name = data.session.user.user_metadata.last_name;
    const email = data.session.user.email;
    const parsed_data = {
      ...data.session,
      parsed_data: { name, first_name, last_name, email },
    };
    return parsed_data;
  }
}
export async function getUserData() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.auth.getSession();
  if (data.session) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("name,role,data,id,email")
      .eq("id", data.session.user.id);
    return profile[0];
  }
}

export async function getInstructorStatus(id) {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.auth.getSession();
  if (data.session) {
    const uuid = data.session.user.id;
    const curr_user = await getUserData();
    const course = await getCourseData(id);
    const instructor_uuid = course.data.educator_uuid;
    if (uuid === instructor_uuid || curr_user.role === 1) {
      return true;
    } else {
      return false;
    }
  }
}

export async function getUserRole() {}

export async function updateEmail(email) {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.auth.updateUser({
    email: email, //Redirect URL is configured in the email template sent from Supabase's end
  });
  if (data) {
    return data;
  }
  return error;
}

export async function updateUserData(user_data) {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.auth.updateUser({
    data: user_data,
  });
  if (data) {
    const { sess, err } = await supabase.auth.refreshSession();
    return sess;
  }
  return error;
}

export async function checkEnrollment(id) {
  const user = await getUserData();
  if (!user) {
    return;
  }
  const purchases = await getUserPurchases(user.email);
  console.log(purchases);
  let enrolled_courses = [];
  let found = false;
  if (purchases.length) {
    found = purchases.find((item) => item.course_id === id);
  }
  return found;
}


