"use client";

import { HMSPrebuilt } from "@100mslive/roomkit-react";
import { useEffect, useState } from "react";
import theme from "../../get-theme";
import { useContext } from "react";
import { CourseContext } from "../course-portal";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";

export default function Meeting({ code, name, id }) {
  const [leaveScreen, setLeaveScreen] = useState(true);
  const context = useContext(CourseContext);
  const screen = context.screen;
  const setScreen = context.setScreen;
  return (
    <>
      {leaveScreen && (
        <div className="w-screen top-0 inset-x-0 flex justify-center absolute z-20 mt-4">
          <button
            className="flex"
            onClick={() => {
              setScreen("Nothing");
            }}
          >
            <span>
              <ArrowLongLeftIcon className="w-6 h-6" />
            </span>
            <p className="ml-2">Back to course</p>
          </button>
        </div>
      )}
      <div className="h-screen w-screen absolute z-10 top-0 inset-x-0">
        <HMSPrebuilt
          roomCode={code}
          options={{ userName: name, userID: id }}
          typography={{ font_family: "Neue Montreal" }}
          logo={{ url: "/" }}
          onJoin={() => {
            setLeaveScreen(false);
          }}
          onLeave={() => {
            setLeaveScreen(true);
          }}
          themes={[
            {
              palette: {
                primary_default: theme.colors.primary,
                primary_bright: theme.colors.primary,
                primary_dim: theme.colors.primary,
                primary_disabled: theme.colors.primary,
                on_primary_high: "rgba(245, 249, 255, 0.95)",
                on_primary_medium: "rgba(224, 236, 255, 0.8)",
                on_primary_low: theme.colors.black,
                secondary_default: theme.colors.black,
                secondary_bright: theme.colors.black,
                secondary_dim: theme.colors.black,
                secondary_disabled: theme.colors.black,
                on_secondary_high: "#FFFFFF",
                on_secondary_medium: "#D3D9F0",
                on_secondary_low: "#A4ABC0",
                background_default: theme.colors.fullBlack,
                background_dim: theme.colors.fullBlack,
                surface_default: theme.colors.black,
                surface_bright: theme.colors.black,
                surface_brighter: theme.colors.black,
                surface_dim: theme.colors.black,
                on_surface_high: "#EFF0FA",
                on_surface_medium: "#C5C6D0",
                on_surface_low: theme.colors.black,
                border_default: theme.colors.borderGrey,
                border_bright: theme.colors.borderGrey,
                alert_success: "#36B37E",
                alert_warning: theme.colors.errorRed,
                alert_error_default: theme.colors.orange,
                alert_error_bright: theme.colors.errorRed,
                alert_error_brighter: "#FFEDEC",
                alert_error_dim: theme.colors.black,
              },
            },
          ]}
        />
      </div>
    </>
  );
}
