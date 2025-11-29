"use client";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";


export default function DropOpen({label,children,default_state,setter,serial,current,showShutter, setShowShutter,icon,width}){
    const [open,setOpen] = useState(false);
    useEffect(()=>{
        setOpen(false);
        if(current===serial){
            setOpen(true);
        }
        if(current===3) {
            setShowShutter(true);
        }
        else{
            setShowShutter(false);
        }

    },[current])
    return(
        <div className="my-2">
            <div className="z-10 flex items-center justify-between mb-2">
                <p className="hidden md:block uppercase text-greyText">{label}</p>
                <button className="h-12 w-12 bg-white md:bg-[#F1EFEE] rounded-full flex items-center justify-center" onClick={()=>{
                    setOpen(prev => !prev)
                    setter(serial);
                    }}>{open?<ChevronUpIcon className="w-4 h-4 text-greyText"/>:(width<500?icon:<ChevronDownIcon className="w-4 h-4 text-greyText"/>)}</button>
            </div>
            <div className={`${open ? "max-h-[500px] opacity-100 mb-8" : "max-h-0 opacity-0"} transition-all duration-300 ease-in-out overflow-scroll no-scrollbar md:static absolute top-0 left-5 right-5 inset-x-0 p-5 md:p-0 md:translate-y-0 -translate-y-full bg-white md:bg-none md:rounded-none rounded-lg`}>
                <div className="hidden md:block h-[1px] bg-lightGrey/10"></div>
                {children}
            </div>
            
        </div>
    )

}