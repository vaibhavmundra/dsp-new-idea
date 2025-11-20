'use client'
import { handleSubmit } from "@/app/actions/community";
import { useState } from "react" 
export default function Pro(){
  
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    
  
    return (
      <div id="form" >
        <div className="text-center">
          <h2 className=" text-5xl mb-2">Think you are a fit?</h2>
          <p className="">Fill out this form and we will get in touch</p>
        </div>
  
        {submitted ? (
          <div className="text-center bg-black p-5 rounded-lg mt-8">
            <h2 className="text-2xl mb-4">Here is the link to join our community👇🏻</h2>
            <a href="https://chat.whatsapp.com/DzTasIWRFHQCgJbplAMnPe" className="underline" target="_blank">Join the Community</a>
          </div>
        ) : (
          <form action={(fData)=>{
            setLoading(true);
            if(!fData.get('check')){
              handleSubmit(fData)
              setSubmitted(true);
            }
            }} className="space-y-6">
            <div>
              <input
                type="checkbox"
                name="check"
                id="check"
                className="hidden"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm">
                Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 block w-full rounded-md border border-borderGrey px-3 py-2 bg-black"
              />
            </div>
  
            <div>
              <label htmlFor="phone" className="block text-sm">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                className="mt-1 block w-full rounded-md border border-borderGrey px-3 py-2 bg-black"
              />
            </div>
  
            <div>
              <label htmlFor="email" className="block text-sm">
                Email *
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 block w-full rounded-md border border-borderGrey px-3 py-2 bg-black"
              />
            </div>
  
            <div>
              <label htmlFor="firm" className="block text-sm">
                Firm&apos;s Name *
              </label>
              <input
                type="text"
                name="firm"
                id="firm"
                required
                className="mt-1 block w-full rounded-md border border-borderGrey px-3 py-2 bg-black"
              />
            </div>
  
            <div>
              <label htmlFor="city" className="block text-sm">
                Which city are you based out of? *
              </label>
              <input
                type="text"
                name="city"
                id="city"
                required
                className="mt-1 block w-full rounded-md border border-borderGrey px-3 py-2 bg-black"
              />
            </div>
            <div className="text-center">
                <button
                type="submit"
                className={`mx-auto px-6 md:px-8 h-12 ${loading?'bg-lightGrey':'bg-primary'} rounded-full text-sm text-white hover:bg-primary/70 relative z-10 disabled:bg-lightGrey`}
                >
                Submit Application
                </button>
            </div>
          </form>
        )}
      </div>)
  }