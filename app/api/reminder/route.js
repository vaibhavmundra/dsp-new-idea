import sendWhatsApp from "@/app/actions/brevo-actions";
import { NextResponse } from "next/server";


async function getUpcomingCourses() {
    console.log('Starting func>>>');
    const now = new Date()
    const yyyy = now.getFullYear()
    const mm   = String(now.getMonth() + 1).padStart(2, '0')
    const dd   = String(now.getDate()).padStart(2, '0')
    const today = `${yyyy}-${mm}-${dd}` // "2025-05-23"
  
    // build the URL with a template literal
    const url = 
    `${process.env.DIRECTUS_API_BASE_URL}/items/courses` +
    `?filter[start_date][_lte]=${encodeURIComponent(today)}` +
    `&filter[end_date][_gte]=${encodeURIComponent(today)}`;

      console.log('Checking>>>>',url,today);
  
    const res = await fetch(url, {
        cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
      },
    })
  
    if (!res.ok) {
      throw new Error(`Directus responded ${res.status}`)
    }
  
    const { data } = await res.json()
    console.log('This is the data>>>>>',data);
    return data
  }

  export async function POST(req,res){
    try {
        console.log('Srtarting this up>>>>>>>.');
        const courses = await getUpcomingCourses()
        await Promise.all(courses.map(c => sendWhatsApp(c.id,17,c.class_time)))
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