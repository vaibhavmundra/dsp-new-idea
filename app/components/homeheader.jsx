"use client";
import { gsap } from "gsap";
import { useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Homeheader() {
  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    // Animating the h1 span reveals
    gsap.from(".dsp-reveal", {
      duration: 1,
      y: "100px",
      ease: "expo",
      stagger: "0.1",
    });

    //Animating the colored gradient
    const timeline = gsap.timeline();
    timeline
      .to(".dsp-reveal", {
        duration: 1,
        backgroundImage:
          "linear-gradient(135deg, #fff 0%, #ef663c 5%, #6161f5 10%, #fff 100%)",
        delay: 0.5,
      })
      .to(".dsp-reveal", {
        duration: 0.5,
        backgroundImage:
          "linear-gradient(135deg, #fff 0%, #ef663c 0%, #6161f5 0%, #fff 0%)",
      });

    //Animating the descriptive text
    gsap.from(".uppercase", { duration: 0.5, delay: 1, x: "200%" });

    //Animating the text below
    gsap.to("h3", {
      scrollTrigger: { trigger: "h3" },
      backgroundImage:
        "linear-gradient(90deg, #fff 100%, #545454 110%, #545454 300%)",
      duration: 1,
    });
  });

  return (
    <>
      <div className=" h-screen text-right flex justify-end items-center px-5 relative z-10">
        <div>
          <h1 className="dsp-main text-8xl font-normal mb-4 bg-clip-text">
            <span
              className="block"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
            >
              <span className="dsp-reveal block">learn</span>
            </span>
            <span
              className="block"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
            >
              <span className="dsp-reveal block">connect</span>
            </span>
            <span
              className="block"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 120%, 0% 120%)" }}
            >
              <span className="dsp-reveal block leading-tight">& grow</span>
            </span>
          </h1>
          <p className="text-white uppercase">as a spatial designer</p>
        </div>
      </div>
      <div className=" h-screen flex flex-col items-start justify-center px-5">
        <h3 className="text-4xl grey-reveal lg:w-1/2  mb-16">
          Established in 2020, Designopolis is an upskilling platform made for
          the building construction and design industry.
        </h3>
        <h3 className="text-4xl grey-reveal lg:w-1/2 mb-16">
          Till date, more than 8000+ AEC professionals have enrolled for our
          courses and workshops
        </h3>
      </div>
    </>
  );
}
