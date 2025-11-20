"use server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { convertTo12Hour } from "../components/utilities/formatted_date";

function normalizePhoneNumbers(data) {
  return data
    .map((item) => item.user_phone) // Extract phone numbers
    .filter((phone) => phone) // Remove null or undefined entries
    .map((phone) => phone.replace(/\D/g, "")) // Remove non-digit characters
    .map((phone) => {
      if (phone.startsWith("91") && phone.length === 12) {
        return phone; // Already has country code and correct length
      } else if (phone.length === 10) {
        return "91" + phone; // Add country code if missing
      } else {
        return null; // Invalid phone number
      }
    })
    .filter((phone) => phone && phone.length === 12); // Keep only valid phone numbers
}

export default async function sendWhatsApp(course_id,template_id=12,start_time) {
  let time='';
  if(start_time){
    time = convertTo12Hour(start_time);
    console.log('This the time',time);
  }
  console.log('Sending wa messageges>>>>>..');
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
    { auth: { persistSession: false } }
  );
  const { data, error } = await supabase
    .from("purchases")
    .select("user_phone")
    .eq("course_id", course_id);
  const normalized_numbers = normalizePhoneNumbers(data);

  const response = await fetch(
    "https://api.brevo.com/v3/whatsapp/sendMessage",
    {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contactNumbers: normalized_numbers,
        templateId: template_id,
        senderNumber: "919641422836",
        params:{START_TIME:time}
      }),
    }
  );
  const brevo_response = await response.json();
  console.log('Response from brevo>>>', brevo_response);
}

export async function confirmationMessage(name, start_date, user_phone,email){

  console.log(name, start_date, user_phone);
  console.log("Sending confirmation whatsapp>>>>!");
  const normalized_number = normalizePhoneNumbers([{user_phone:user_phone}])
  console.log(name, start_date, normalized_number);
  await makeContact(email,normalized_number[0]);


  const response = await fetch(
    "https://api.brevo.com/v3/whatsapp/sendMessage",
    {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contactNumbers: normalized_number,
        templateId: 14,
        senderNumber: "919641422836",
        params:{COURSE:name, START_DATE:start_date}
      }),
    }
  );
  const brevo_response = await response.json();
  console.log(brevo_response);

}

export async function makeContact(email, normalized_number){
  const response = await fetch('https://api.brevo.com/v3/contacts',{
    method:"POST",
    headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
    body:JSON.stringify({email,
      "listIds":[3],
      "attributes":{
        "WHATSAPP":normalized_number
      },
      "updateEnabled":true
    })
  })
  const contact_resp = await response.json();
  console.log("Result after making contact >>>>",contact_resp);
}