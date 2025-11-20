"use client";
import router from "next/router";
import { useEffect } from "react";

export default function Session({ number, session }) {
  console.log(session);
  useEffect(() => {
    async function getZoomClient() {
      return new Promise(async (resolve, reject) => {
        const zoomEmbed = await (
          await import("@zoomus/websdk/embedded")
        ).default;
        resolve(zoomEmbed.createClient());
      })
        .then(async (client) => {
          const meetingSdkElement =
            document.getElementById("meetingSdkElement");

          if (meetingSdkElement) {
            client.init({
              language: "en-US",
              zoomAppRoot: meetingSdkElement,
            });
            const postData = {
              meetingNumber: "77411361394",
              role: 0,
            };
            const response = await fetch("/api/zoom", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(postData),
            });
            const data = await response.json();

            client.join({
              meetingNumber: postData.meetingNumber,
              signature: data.signature,
              userName: "react",
              sdkKey: data.sdkKey,
              password: "c9arS1",
              tk: "",
              role: 0,
            });
          }
        })
        .catch((error) => {
          console.log("error inside zoom useEffect", error);
        });
    }
    getZoomClient();
  }, []);

  return (
    <>
      {session && (
        <div className="text-white">
          <h1>{session.title}</h1>
          <div id="meetingSdkElement" className=""></div>
        </div>
      )}
    </>
  ); //Checking if sessions actually has values before rendering it. Or react was throwing errors. Only God knows when this will stop working!
}
