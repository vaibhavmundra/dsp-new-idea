import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { editorial, eiko, writer, denton } from "@/app/layout";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import FurnCard from "./components/modular-furniture/card";
import Link from "next/link";


export default async function Index() {
  return (
    <section className="overflow-x-hidden bg-[#F1EFEE] text-black font-normal">
      <section className="h-screen md:h-auto relative overflow-hidden pb-8">
        <div className="px-5 absolute w-full h-full z-10">
          <img src="/dsp-sm-logo.png" className=" w-12 py-5"/>
          <div className="md:static md:grid md:grid-cols-3 absolute inset-x-0 bottom-0 container mx-auto">
            <div className="bg-black/30 backdrop-blur-[10px] p-10 md:rounded-md rounded-none rounded-t-xl border border-white/50 md:my-10">
              <h1 className="md:text-6xl text-4xl mb-8 md:mb-32 text-white font-normal">Furniture that <span className={`${denton.variable} font-denton`}>fits your life.</span> Not the other way around.</h1>
              <div className=" flex justify-start">
              <Link href="/products/wardrobe" className="uppercase px-6 md:px-8 h-12 bg-primary rounded-full text-sm text-white hover:bg-white hover:text-primary transition-all duration-200 relative z-10 disabled:bg-lightGrey flex flex-row items-center"><p className=" mr-2">Start customising</p> <ArrowRightIcon className="w-4 h-4"/></Link>
              </div>
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
      <section className="p-5 mb-32">
        <div className=" container mx-auto ">
          <div className="flex justify-center mb-4 text-lightGrey">
            AS FEATURED IN
          </div>
          <div className="flex flex-wrap items-center justify-between w-full">
            <img 
            src="/figma/ad_logo.png"
            alt="image"
            className="w-auto md:h-auto h-10"
            />
            <img 
            src="/figma/vogue.png"
            alt="image vogue"
            className="w-auto md:h-auto h-10"
            />
            <img 
            src="/figma/yourstory.png"
            alt="image yourstory"
            className="w-auto md:h-auto h-10"
            />
            <img 
            src="/figma/indian_exp.png"
            alt="image"
            className="md:w-auto md:h-auto md:block hidden"
            />
            
          </div>
        </div>
      </section>
      <section className="mb-32 px-5">
        <div className=" container mx-auto">
          <div>
            <h3 className="text-5xl mb-8">Fully customise in <span className={`${denton.variable} font-denton`}>minutes</span></h3>
          </div>
          <div className=" grid md:grid-cols-3 gap-16">
            <FurnCard img="/figma/figma-room-1.jpg" name="Deccan" tag="starts at" price="₹59,900" detail="Laminate + Rattan"/>
            <FurnCard img="/figma/figma-room-2.jpg" name="Victorian" tag="starts at" price="₹69,900" detail="Mouldings with PU paint"/>
            <FurnCard img="/figma/figma-room-3.jpeg" name="Bombae" tag="starts at" price="₹49,900" detail="Laminate finish"/>
          </div>

        </div>
      </section>
      <section className="mb-32 px-5">
        <div className=" container mx-auto">
          <div>
              <h3 className="text-5xl mb-8">Built for <span className={`${denton.variable} font-denton`}>life</span></h3>
          </div>
          <div className=" grid md:grid-cols-3 gap-16">
              <FurnCard img="/figma/f-1.jpg" name="Built using the highest quality architectural ply"/>
              <FurnCard img="/figma/f-2.jpg" name="European hardware designed to last for years"/>
              <FurnCard img="/figma/f-3.jpg" name="Nifty features designed for Indian households"/>
          </div>
        </div>

      </section>
      <section className=" mb-32 px-5">
        <div className=" container mx-auto">
          <div>
            <h3 className=" text-5xl mb-8">At the <span className={`${denton.variable} font-denton`}>heart </span>of everything we do? <span className={`${denton.variable} font-denton`}>You.</span></h3>
          </div>
          <div className=" grid md:grid-cols-3 gap-16">
              <FurnCard img="/figma/customise_wardrobe.jpg" tag="Step 1" price="You design it exactly how you want"/>
              <FurnCard img="/figma/designopolis_factory.jpg" tag="Step 2" price="We make it to your order"/>
              <FurnCard img="/figma/packaging.jpg" tag="Step 3" price="Dispatched to you in 15 days"/>
          </div>

        </div>
      </section>
      <section className="h-screen md:h-auto relative overflow-hidden">
        <div className="px-5 mb-12 absolute w-full h-full z-10 grid md:grid-cols-3">
          <div className="bg-black/30 backdrop-blur-[10px] p-10 rounded-md border border-white/50 my-20">
            <h1 className="md:text-6xl text-5xl mb-8 text-white font-normal"><span className={`${denton.variable} font-denton`}>Made to fit.</span> Made to stay. Made simple.</h1>
            <div className=" flex justify-start">
              <Link href="/products/wardrobe" className=" uppercase px-6 md:px-8 h-12 bg-primary rounded-full text-sm text-white hover:bg-white hover:text-primary transition-all duration-200 relative z-10 disabled:bg-lightGrey flex flex-row items-center"><p className=" mr-2">Start customising</p> <ArrowRightIcon className="w-4 h-4"/></Link>
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
      
    </section>
  );
}
