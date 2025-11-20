import sendWhatsApp from "@/app/actions/brevo-actions";
import { NextResponse } from "next/server";

export async function POST(req,res){
    try {
        const req_data = await req.json();
        console.log('Srtarting time change up>>>>>>>.', req_data);
        await  sendWhatsApp(req_data.id,23,req_data.start_time) //feed start_time in 24 hour format
        return NextResponse.json({ ok: true },{status:200})
      } catch (err) {
        console.error(err)
        return NextResponse.json(
            {
                ok: false,
            },
            { status: 500 }
            );
      }

  }