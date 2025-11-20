"use client";

import { useState } from "react";

export default function Carousel() {
  const [slide, setSlide] = useState(1);
  return (
    <div className="py-20 px-5">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-5xl mb-2">Become a complete professional</h3>
          <p className="opacity-50">
            Designopolis is how spatial designers develop their skill
          </p>
        </div>

        <div className="overflow-hidden border border-borderGrey rounded-3xl mb-8">
          <div className="flex flex-nowrap">
            <div
              className={`grid grid-cols-3 min-w-full transform transition duration-300 bg-black`}
              style={{ transform: `translateX(${-(slide - 1) * 100}%)` }}
            >
              <div className="col-span-2">
                <img
                  src="/carousel-learn.webp"
                  alt="designopolis learn object-fit"
                />
              </div>
              <div className="p-8 border-l border-borderGrey flex flex-col justify-end">
                <h3 className="text-5xl mb-4">Power packed learning</h3>
                <p className="opacity-50">
                  Learn the frameworks and processes used by practicing
                  professionals to deliver real world projects.
                </p>
              </div>
            </div>
            <div
              className={`grid grid-cols-3 min-w-full transform transition duration-300 bg-black`}
              style={{ transform: `translateX(${-(slide - 1) * 100}%)` }}
            >
              <div className="col-span-2">
                <img
                  src="/carousel-quiz.webp"
                  alt="designopolis learn object-fit"
                />
              </div>
              <div className="p-8 border-l border-borderGrey flex flex-col justify-end">
                <h3 className="text-5xl mb-4">
                  Quizzes, assignments, and projects
                </h3>
                <p className="opacity-50">
                  Apply what you learn to tackle simulated scenarios. Solidify
                  your learning with interesting quizzes and puzzles.
                </p>
              </div>
            </div>
            <div
              className={`grid grid-cols-3 min-w-full transform transition duration-300 bg-black`}
              style={{ transform: `translateX(${-(slide - 1) * 100}%)` }}
            >
              <div className="col-span-2">
                <img
                  src="/carousel-certificate.webp"
                  alt="designopolis learn object-fit"
                />
              </div>
              <div className="p-8 border-l border-borderGrey flex flex-col justify-end">
                <h3 className="text-5xl mb-4">Get Certified</h3>
                <p className="opacity-50">
                  Join a community of achievers upon completing each course with
                  a Designopolis certificate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2">
        <button
          className={`w-6 h-6 rounded-full   ${
            slide === 1 ? "bg-primary" : "bg-lightGrey opacity-50"
          }`}
          onClick={(e) => setSlide(1)}
        ></button>
        <button
          className={`w-6 h-6 rounded-full   ${
            slide === 2 ? "bg-primary" : "bg-lightGrey opacity-50"
          }`}
          onClick={() => setSlide(2)}
        ></button>
        <button
          className={`w-6 h-6 rounded-full   ${
            slide === 3 ? "bg-primary" : "bg-lightGrey opacity-50"
          }`}
          onClick={() => setSlide(3)}
        ></button>
      </div>
    </div>
  );
}
