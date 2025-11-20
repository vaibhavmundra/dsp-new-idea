"use client";
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  gsap.registerPlugin(ScrollTrigger);
  useLayoutEffect(() => {
    // const timeline = gsap.timeline();
    // gsap.from(".dsp-footer-icon", {
    //   scrollTrigger: {
    //     trigger: ".marquee-outer",
    //   },
    //   x: "-500px",
    //   duration: 1,
    //   ease: "power",
    // });
    // gsap.to(".dsp-footer-icon", {
    //   scrollTrigger: {
    //     trigger: ".footer-div",
    //     scrub: 1,
    //   },
    //   xPercent: -20,
    //   duration: 0.2,
    //   ease: "linear",
    //   stagger: 0.2,
    // });
  });

  return (
    <>
      <div className="footer-div px-5 border-t border-borderGrey">
        <div className="flex flex-col md:flex-row justify-between pt-12 mb-12">
          <div className="mb-8 md:mb-0">
            <div className="mb-2">
              <Link href="/">
                <Image
                  src="/designopolis-logo-lg.png"
                  width={200}
                  height={200}
                  alt="designopolis logo"
                />
              </Link>
            </div>
            <div>
              <div className="icon-div flex gap-1.5">
                <a href="https://instagram.com/designopolis_" target="_blank">
                  <div className="dsp-footer-icon border border-white rounded-full p-2  hover:bg-white hover:text-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="feather feather-instagram"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </div>
                </a>

                <a
                  href="https://in.linkedin.com/company/designopolis-institute-of-design-technology"
                  target="_blank"
                >
                  <div className="dsp-footer-icon icon-move border border-white rounded-full p-2  hover:bg-white hover:text-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="feather feather-linkedin"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </div>
                </a>
                <a href="mailto:support@designopolis.co.in" target="_blank">
                  <div className="dsp-footer-icon icon-move border border-white rounded-full p-2  hover:bg-white hover:text-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="feather feather-mail"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:text-right">
            <Link href="/" className="opacity-70 hover:opacity-100">
              Home
            </Link>
            <Link href="/about" className="opacity-70 hover:opacity-100">
              About
            </Link>
            <Link href="/dashboard" className="opacity-70 hover:opacity-100">
              Dashboard
            </Link>
            <Link href="/login" className="opacity-70 hover:opacity-100">
              Login
            </Link>
          </div>
        </div>
        <div className="flex md:flex-row flex-col justify-between pb-12 text-[9px] md:text-xs uppercase opacity-70 gap-2">
          <div>Zima Blue Private Limited. GSTIN 19AABCZ6133H1Z5</div>
          <div className="flex gap-2">
            <Link href="/terms-of-use">Terms of Service</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/refund-policy">Refund Policy</Link>
          </div>
        </div>
      </div>
    </>
  );
}
