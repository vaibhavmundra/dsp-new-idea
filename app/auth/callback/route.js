import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const next = "/furn-ad";

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const {data,error} = await supabase.auth.getSession();
      if (!error) {
                console.log("Signed in!", data.session);
                const { data: profile } = await supabase
                .from("profiles")
                .select("name,role,data,id,email")
                .eq("id", data.session.user.id);
                console.log(profile);
    
                const { error: updateError } = await supabase
                .from("profiles")
                .update({ source: 'furn_ad_signup' })
                .eq("id", data.session.user.id);

                console.log("User updated");
            }
      return NextResponse.redirect(new URL(next, req.url));
    }
  }

  // return the user to an error page with instructions
  console.log("Error!");
  return NextResponse.redirect(new URL("/auth/auth-code-error", req.url));
}
