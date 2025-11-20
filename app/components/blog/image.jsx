"use client";
import { fetchImgData } from "@/app/actions/blog-data";
import { EditImage, Hotspot, SpotData } from "@/app/blog/add-hotspot/page";
import { useEffect, useRef, useState } from "react";

export default function BlogImage({ id }) {
  const [hotspots, setHotspots] = useState(null);
  const [selectedSpot, setSelected] = useState("");
  const [type, setType] = useState(null);
  const [img, setImg] = useState(null);

  useEffect(() => {
    async function fetchData(id) {
      const hp = await fetchImgData(id);
      const hp_obj = JSON.parse(hp.hotspots);
      setHotspots(hp_obj);
      setImg(hp);
    }
    fetchData(id);
  }, []);

  return (
    <div className=" w-fit">
      <div className=" flex items-center w-fit ml-auto mb-4">
        <p>Show space data:</p>
        <div className="relative w-[200px] ml-2">
          <select
            className="block h-10 w-full  appearance-none text-black px-4 rounded-full"
            name="type"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="">None</option>
            <option value="materials">Materials</option>
            <option value="objects">Objects</option>
            <option value="lights">Lights</option>
            <option value="systems">Systems</option>
          </select>
          <span className="text-black absolute top-1/2 right-4 -translate-y-1/2">
            <img width={8} height={8} src="/arrow.png" alt="" />
          </span>
        </div>
      </div>

      {img && (
        <EditImage
          item={img}
          type={type}
          hotspots={hotspots}
          setPubSpot={setSelected}
        />
      )}
      {selectedSpot ? (
        <div className=" mt-4 flex justify-end">
          <SpotData pubSpot={selectedSpot} type={type} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
