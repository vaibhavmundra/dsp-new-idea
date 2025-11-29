"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

export default function Parameter({title,subtitle,type,state,setState,upper_lim,lower_lim,default_val,unit,toggle_left,toggle_right,children}){
    useEffect(()=>{
        setState(default_val);
    },[])
    return(
        <>
            <div className=" flex justify-between my-8">
                        <div>
                            <p className=" font-normal text-lg">{title}</p>
                            <p className=" text-xs text-greyText">{subtitle}</p>
                        </div>
                        <div className=" flex items-center gap-1">
                            {type!=="select"&&<p className={`uppercase text-xs text-greyText ${state===toggle_left&&'text-primary font-medium'}`}>{toggle_left}</p>}
                            {
                                (type==="select"?(<div className="bg-[#F1EFEE] rounded-full px-4 p-2 flex items-center gap-2">
                                <select
                                className="bg-[#F1EFEE] appearance-none"
                                value={state}
                                onChange={(e) => {
                                    setState(e.target.value)

                                }}
                                >
                                {Array.from({ length: upper_lim - lower_lim + 1 }, (_, i) => {
                                    const value = lower_lim + i;
                                    return (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                    );
                                })}
                                </select>
                                <ChevronDownIcon className="w-4 h-4"/>
                            </div>):<div className={`h-6 w-12 rounded-full relative transition-all duration-300 bg-lightGrey/30`}>
                                <button onClick={()=>{
                                    if(state==toggle_left){
                                        setState(toggle_right);
                                    }
                                    else{
                                        setState(toggle_left);
                                    }
                                }} className={`h-6 w-6 border border-borderGrey/50 rounded-full bg-white absolute ${state===toggle_left?'left-0':'right-0'} transition-all duration-300 ease-in-out`}></button>
                            </div>)
                            }
                            
                            <div>
                                <p className={`uppercase text-xs text-greyText ${state===toggle_right&&'text-primary font-medium'}`}>{type==="select"?unit:toggle_right}</p>
                            </div>
                        </div>

                    </div>
        </>
    )
}