// components/VideoPlayer.jsx
"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useSearchParams } from "next/navigation";


export default function VideoPlayer({ url }) {
    const [mounted, setMounted] = useState(false);
    const searchParams = useSearchParams();
    const vid = searchParams.get("vid");


  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // render a placeholder with the same dimensions so layout doesn't jump
    return (
      <div className="w-auto h-auto border border-borderGrey rounded-lg" style={{ paddingTop: "56.25%", position: "relative" }}>
        {/* optional: spinner/placeholder */}
      </div>
    );
  }

  if(vid==="yes"){
      return (
        <section className= "mb-32 md:mb-64 px-5">
            <div className="container mx-auto">
                <h2 className="text-5xl md:text-6xl mb-8">Course Overview</h2>
                <div className="w-auto h-auto border border-borderGrey rounded-lg">
                <ReactPlayer
                    className="react-player"
                    style={{
                    paddingTop: "56.25%",
                    position: "relative",
                    }}
                    width="100%"
                    height="100%"
                    url={url}
                    controls
                />
                </div>
            </div>
        </section>
      );
  }
  else{
    return(
        <></>
    )
  }
}
