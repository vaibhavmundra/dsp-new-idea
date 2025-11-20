"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


export default  function FurnAdPage(){
    const searchParams = useSearchParams();
    const source = searchParams.get("dsp_state");
    const supabase = createClientComponentClient();


    if (source) {
        async function checker(){
            const { data, error } = await supabase.auth.getSession();
            if (data.session) {
                const { data: profile } = await supabase
                .from("profiles")
                .select("name,role,data,id,email")
                .eq("id", data.session.user.id);
                console.log(profile);
    
                const existingData = profile[0].data || {};
    
                const { error: updateError } = await supabase
                .from("profiles")
                .update({ source: source })
                .eq("id", data.session.user.id);

                console.log("User updated");
            }
        }
        checker();

    }

    return(
        <main>
            <section className="h-screen md:h-auto relative overflow-hidden">
        <div className="px-5 absolute w-full h-full z-10">
          <img src="/dsp-sm-logo.png" className=" w-12 py-5"/>
          <div className="grid md:grid-cols-3">
            <div className="bg-black/30 backdrop-blur-[10px] p-10 rounded-md border border-white/50 my-10 text-white font-normal">
              <h1 className="md:text-6xl text-4xl mb-32">We are glad to see your interest.<span>Our product is still in development.</span> Look to hear from us in your inbox soon.</h1>
            </div>
          </div>
        </div>
        <div className="">
          <div className="">
            <img
              src="/figma/config.jpeg"
              alt="customise wardrobe"
              className="h-screen md:h-screen md:w-full object-cover"
            />
          </div>
        </div>
      </section>
        </main>
    )
}