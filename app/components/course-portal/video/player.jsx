"use client";

import Video from "./video";
import PlayerHeader from "./player-header";
import PlayerFooter from "./player-footer";

export default function Player() {
  return (
    <div className="flex-grow flex flex-col justify-between">
      <div>
        {/* <PlayerHeader /> */}
        <Video />
      </div>
      <PlayerFooter />
    </div>
  );
}
