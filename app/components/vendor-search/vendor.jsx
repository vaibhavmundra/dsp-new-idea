'use client'
import { useState } from "react";
import Image from "next/image";
import { handleVendorSubmit } from "@/app/actions/vendor-search";

export default function VendorSearch(){

    const [national, setNational] = useState(false);
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    return(
        <>
            <div className="container mx-auto my-32 px-4">
                <div className="mb-10">
                    <h1 className="text-5xl mb-2">Find me vendors</h1>
                    <p className="opacity-70">Let AI search for vendors and contact them for you. Only vendors who suit your requirements will contact you via WhatsApp automatically.</p>
                </div>
            
            {
                submitted?
                <div>
                    <div className="text-center bg-black p-5 rounded-lg mt-8">
                        <h2 className="text-2xl mb-4">We have received your search request.</h2>
                        <p>Now time to wait as our AI does the searching for you. Expect to hear back from some vendors soon</p>
                    </div>
                </div>
                :(<form onSubmit={async (e) => {
                    e.preventDefault();                       // prevent full page POST
                    setLoading(true);
                    const form = e.currentTarget;
                    const fData = new FormData(form);         // gather fields
                    try {
                    if(!fData.robo_check){
                        await handleVendorSubmit(fData);        // call your server action
                        setSubmitted(true);
                    }
                    } finally {
                    setLoading(false);                      // flip off when done
                    }
                }}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm">
                            Your/Your firm&apos;s name? *
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            className="mt-1 w-full block rounded-md border border-borderGrey px-3 py-2 bg-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm">
                            Your WhatsApp number? *
                        </label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            required
                            className="mt-1 w-full block rounded-md border border-borderGrey px-3 py-2 bg-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm">
                            Your Email? *
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            required
                            className="mt-1 w-full block rounded-md border border-borderGrey px-3 py-2 bg-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="search" className="block text-sm">
                            What are you looking for? *
                        </label>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            required
                            className="mt-1 w-full block rounded-md border border-borderGrey px-3 py-2 bg-black"
                            placeholder="example: terracotta bricks"
                        />
                    </div>
                    <div className="mb-4">
                        <div className="mb-2" >
                            <label htmlFor="city" className="block text-sm">
                                Which city is the project located in? 
                            </label>
                            <input
                                type="text"
                                name="city"
                                id="city"
                                value={city}
                                onChange={e=>setCity(e.target.value)}
                                disabled={national}
                                className="mt-1 w-full block rounded-md border border-borderGrey px-3 py-2 bg-black"
                                placeholder="example: Hyderabad"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="check" id="check" value={national} onChange={(e)=>{
                                setNational(e.target.value);
                                if(e.target.value){
                                    setCity('');
                                }
                                }}/>
                            <p>I am looking for vendors nationally and am not restricted to any city.</p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm">
                            What category does the vendor belong to? *
                        </label>
                        <div className="relative">
                            <select name="category" id="category" required className="mt-1 w-full block appearance-none rounded-md border border-borderGrey px-3 py-2 bg-black">
                                <option value="Facade Material">Facade Material</option>
                                <option value="Flooring Material">Flooring Material</option>
                                <option value="False ceiling">False ceiling</option>
                                <option value="Sanitaryware">Sanitaryware</option>
                                <option value="Sanitaryware">Sanitaryware</option>
                                <option value="Lighting">Lighting</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Wood materials">Wood materials</option>
                                <option value="Hardware">Hardware</option>
                                <option value="Fabrics">Fabrics</option>
                                <option value="Landscaping">Landscaping</option>
                                <option value="Services">Services</option>
                            </select>
                            <span className="text-black absolute top-1/2 right-4 -translate-y-1/2">
                                                          <Image
                                                            width={16}
                                                            height={16}
                                                            src="/arrow_white.png"
                                                            alt=""
                                                          />
                            </span>
                        </div>
                    </div>
                    <div className="hidden">
                                <input
                        type="checkbox"
                        name="robo_check"
                        id="robo_check"
                    />
                    </div>
                    <div>
                            <button
                        type="submit"
                        className={`mx-auto px-6 md:px-8 h-12 ${loading?'bg-lightGrey':'bg-primary'}  rounded-full text-sm text-white hover:bg-primary/70 relative z-10 disabled:bg-lightGrey`}
                        >
                        {loading?"Loading...":"Find me vendors"}
                        </button>
                    </div>
                </form>)
            }
            </div>
        </>
    )
}