"use client";
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Marquee() {
  gsap.registerPlugin(ScrollTrigger);
  const marquee = useRef(0);

  useLayoutEffect(() => {
    marquee.current =
      -1 *
        document.querySelector(".marquee-text").getBoundingClientRect().width +
      "px";

    gsap.to(".marquee-inner", {
      xPercent: -50,
      repeat: -1,
      duration: 15,
      ease: "linear",
    });

    gsap.to(".marquee-outer", {
      scrollTrigger: {
        trigger: ".marquee-outer",
        scrub: 1,
      },
      x: "200px",
      duration: 10,
      ease: "linear",
    });
  });

  return (
    <>
      <div className="text-white overflow-hidden">
        <div className="marquee-outer transform-gpu min-w-fit  -translate-x-[calc(500px)]">
          <div className="dsp-left marquee-inner flex flex-nowrap justify-around text-[calc(16vh)] md:text-[calc(11vw)]">
            <div className="marquee-text whitespace-nowrap w-1/2 pl-[calc(50vw)] ">
              learn. connect. grow
            </div>
            <div className="marquee-text whitespace-nowrap w-1/2 pl-[calc(50vw)] ">
              learn. connect. grow
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
