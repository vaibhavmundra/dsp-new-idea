"use client";
import { useEffect } from "react";
import * as fbq from "./pixel";
import { useSearchParams } from "next/navigation";

export default function PageView() {
  const searchParams = useSearchParams();
  const source = searchParams.get("dsp");
  useEffect(() => {
    if (source !== "dsp_organic") {
      fbq.pageview();
      console.log("page viewed!");
    }
  });
  return <></>;
}
