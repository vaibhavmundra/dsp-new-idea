import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const session = await supabase.auth.getSession();
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event == "USER_UPDATED") {
      const { data, error } = await supabase.auth.refreshSession();
    }
  });
  if (
    (req.url.includes("/dashboard") || req.url.includes("/course/")) &&
    !session.data.session
  ) {
    const new_url = new URL("/login", req.url);
    new_url.searchParams.set("from", "dashboard");
    return NextResponse.redirect(new_url);
  }
  return res;
}
