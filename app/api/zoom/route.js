import { NextResponse } from "next/server";
const KJUR = require("jsrsasign");

export async function POST(req, res) {
  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2;

  const oHeader = { alg: "HS256", typ: "JWT" };

  const req_data = await req.json();
  console.log(req_data);

  const oPayload = {
    sdkKey: process.env.ZOOM_MEETING_SDK_KEY,
    mn: req_data.meetingNumber,
    role: 0,
    iat: iat,
    exp: exp,
    appKey: process.env.ZOOM_MEETING_SDK_KEY,
    tokenExp: iat + 60 * 60 * 2,
  };

  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);
  const signature = KJUR.jws.JWS.sign(
    "HS256",
    sHeader,
    sPayload,
    "PzUZzx5lZu3Dx6NksSSmYyo2zqdWyaFx"
  );

  return NextResponse.json({
    signature: signature,
    sdkKey: process.env.ZOOM_MEETING_SDK_KEY,
  });
}
