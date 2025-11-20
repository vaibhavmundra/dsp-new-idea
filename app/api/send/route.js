import EmailTemplate from "@/app/components/utilities/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, course } = body;
    const { data, error } = await resend.emails.send({
      from: "Shivani from Designopolis <support@designopolis.co.in>",
      to: [email],
      subject: "Important: How to Access",
      react: EmailTemplate({ email, course }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
