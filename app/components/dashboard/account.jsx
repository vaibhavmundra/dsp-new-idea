"use client";
import { updateEmail, updateUserData } from "@/app/actions/auth";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useState } from "react";

export default function DashboardAccount({ user, courses, purchases }) {
  const supabase = createClientComponentClient();

  console.log(user, purchases);
  return (
    <div className="flex flex-col h-full">
      <div className="p-5 mb-16">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-borderGrey">
          <div></div>
          <button
            className="px-6 md:px-8 h-12 bg-black rounded-full text-sm text-white hover:bg-black/70"
            onClick={async () => {
              const { error } = await supabase.auth.signOut();
              location.reload();
            }}
          >
            Logout
          </button>
        </div>
        <h1 className="text-2xl mb-10">Your account details:</h1>

        <div className="md:grid md:grid-cols-2 mb-12">
          <div className="mb-4 md:mb-0">
            <p className="text-medium">Your email</p>
            <p className="opacity-50 text-xs">
              All communication regarding Designopolis will be sent to this
              email
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <input
              className="mb-4 md:mb-0 block flex-grow h-12 px-4 rounded-full  caret-black text-black"
              type="email"
              placeholder={user.email}
              name="email"
              required
              id="email"
            ></input>
            <button
              className="bg-primary rounded-full h-12 md:px-4 md:ml-2 "
              onClick={async () => {
                const data = await updateEmail(
                  document.getElementById("email").value
                );
                console.log(data);
              }}
            >
              Update email
            </button>
          </div>
        </div>

        <div className="md:grid md:grid-cols-2">
          <div className="mb-4 md:mb-0">
            <p className="text-medium">Your name</p>
            <p className="opacity-50 text-xs">
              All certificates will be issued in this name.
            </p>
          </div>
          <div className="md:flex">
            <div className="mb-4 md:mb-0 flex flex-col flex-grow">
              <input
                className="block flex-grow h-12 px-4 rounded-full caret-black text-black mb-4"
                type="text"
                placeholder={`${user.name}`}
                name="name"
                id="name"
                required
              ></input>
            </div>
            <div className="flex-grow flex md:flex-grow-0 md:justify-between md:ml-2">
              <button
                className="bg-primary h-12 px-4 rounded-full flex-grow"
                onClick={async () => {
                  const current_data = user.user.user_metadata;
                  current_data.name = document.getElementById("name").value;
                  const response = await updateUserData(current_data);
                  console.log(response);
                  location.reload();
                }}
              >
                Update name
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 flex-grow">
        <h2 className="text-2xl mb-10">Your purchase history:</h2>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8">
          {purchases.length &&
            purchases.map((purchase, i) => {
              return (
                <div
                  className="p-5 bg-black rounded-2xl border border-borderGrey"
                  key={i}
                >
                  <div className="mb-4">
                    <p>
                      {
                        courses.find(
                          (course) => course.id === purchase.course_id
                        ).name
                      }
                    </p>
                  </div>
                  <div className="opacity-50 text-xs">
                    <p>Purchased on: {purchase.created_at}</p>
                    <p>Order ID: {purchase.order_id}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="px-5 pt-5 pb-12 md:p-5 mx-auto">
        <Link href="mailto:support@designopolis.co.in">
          Contact support via email
        </Link>
      </div>
    </div>
  );
}
