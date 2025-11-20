import { updateSection } from "@/app/actions/course-data";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const req_data = await req.json();
    console.log(req_data);
    if (req_data.type == "session.open.success") {
      console.log("New session started!!!!!!!!");
    } else if (req_data.type == "room.end.success") {
      console.log("Session has ended");
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        ok: false,
      },
      { status: 500 }
    );
  }
}
