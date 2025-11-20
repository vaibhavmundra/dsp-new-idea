import OpenAI from "openai";
import { NextResponse } from "next/server";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,  // this is also the default if you omit it
    });

export async function POST(req) {
  const req_data = await req.json();
  console.log('This is the text sent',req_data);
  if (!req_data.text) return NextResponse.json({ error: "No text provided" },{status:400});

  const modRes = await openai.moderations.create({ input: req_data.text });
  const { flagged, categories } = modRes.results[0];
  return NextResponse.json({ flagged, categories },{status:200});
}