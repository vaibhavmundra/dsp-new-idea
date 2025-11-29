"use client";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";


export default function DropOpen({label,children,default_state,setter,serial,current,showShutter, setShowShutter}){
    const [open,setOpen] = useState(false);
    useEffect(()=>{
        setOpen(false);
        if(current===serial){
            setOpen(true);
        }
        if(current===4) {
            setShowShutter(true);
        }
        else{
            setShowShutter(false);
        }

    },[current])
    return(
        <div className="my-2 relative">
            <div className=" flex items-center justify-between mb-2">
                <p className=" uppercase text-greyText">{label}</p>
                <button className="h-12 w-12 bg-[#F1EFEE] rounded-full flex items-center justify-center" onClick={()=>{
                    setOpen(prev => !prev)
                    setter(serial);
                    }}>{open?<ChevronUpIcon className="w-4 h-4 text-greyText"/>:<ChevronDownIcon className="w-4 h-4 text-greyText"/>}</button>
            </div>
            <div className={`${open ? "max-h-[500px] opacity-100 mb-8" : "max-h-0 opacity-0"} z-10 transition-all duration-300 ease-in-out overflow-scroll no-scrollbar`}>
                <div className=" h-[1px] bg-lightGrey/10"></div>
                {children}
            </div>
            
        </div>
    )

}