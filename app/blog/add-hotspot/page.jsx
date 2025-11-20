"use client";

import {
  addHotspot,
  deleteHotspot,
  fetchAttribute,
  fetchHotspots,
  fetchImgData,
  imageList,
} from "@/app/actions/blog-data";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const BASE =
  "https://ttmyvezienkeutupovxz.supabase.co/storage/v1/object/public/dsp-public/";

export default function AddHotspot() {
  const [editImg, setEditImg] = useState(null);
  const [imgs, setImgs] = useState([]);
  const [type, setType] = useState(null);
  const [spot, setSpot] = useState(null);
  const [hotspots, setHotspots] = useState(null);
  const [pubSpot, setPubSpot] = useState(null);

  async function refresh(id) {
    const hp = await fetchImgData(id);
    const hp_obj = JSON.parse(hp.hotspots);
    console.log(hp_obj);
    setHotspots(hp_obj);
  }

  useEffect(() => {
    async function getImages() {
      const images = await imageList();
      console.log(images);
      return images;
    }
    getImages().then((fetchedImg) => setImgs(fetchedImg.data));
  }, []);
  return (
    <main className="bg-white text-black h-screen overflow-y-hidden">
      <section>
        <div className="grid grid-cols-4">
          <div className=" col-span-1">
            <div className="mb-8 p-5">
              <Link href="/">Back home</Link>
              <h1 className="text-7xl">Add hotspots</h1>
            </div>
            <div className="h-[600px] flex flex-col items-center overflow-y-scroll">
              {imgs.length > 0 ? (
                imgs.map((item) => {
                  return (
                    <img
                      key={item.id}
                      className="w-1/2 mb-4"
                      src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.image.filename_disk}`}
                      onClick={async () => {
                        setEditImg(item);
                        refresh(item.id);
                      }}
                    />
                  );
                })
              ) : (
                <p>Not flound</p>
              )}
            </div>
          </div>
          <div className=" col-span-3 h-screen border-l border-borderGrey/50 flex flex-col justify-between">
            <div className="">
              <div className="p-5 border-b border-borderGrey/50 h-[70px] flex justify-between">
                <h2 className=" text-3xl">
                  {type && editImg ? `Set ${type}` : ""}
                </h2>
                <div></div>
              </div>
              <div className="p-5 h-[calc(100vh-270px)] flex justify-center w-fit mx-auto">
                {editImg ? (
                  <EditImage
                    item={editImg}
                    spot={spot}
                    setSpot={setSpot}
                    type={type}
                    refresh={refresh}
                    hotspots={hotspots}
                    setPubSpot={setPubSpot}
                  />
                ) : (
                  <p>Select an image to continue</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-6 h-[200px] border-t border-borderGrey/50">
              <div className=" col-span-1 p-5 border-r border-borderGrey/50">
                <ul>
                  <li>
                    <button
                      onClick={() => setType("materials")}
                      className={type == "materials" ? "font-medium" : ""}
                      disabled={editImg ? false : true}
                    >
                      Materials
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setType("objects")}
                      className={type == "objects" ? "font-medium" : ""}
                      disabled={editImg ? false : true}
                    >
                      Objects
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setType("lights")}
                      className={type == "lights" ? "font-medium" : ""}
                      disabled={editImg ? false : true}
                    >
                      Lights
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setType("systems")}
                      className={type == "systems" ? "font-medium" : ""}
                      disabled={editImg ? false : true}
                    >
                      Systems
                    </button>
                  </li>
                </ul>
              </div>
              <div className=" col-span-5 p-5">
                <AttributeForm
                  spot={spot}
                  type={type}
                  editImg={editImg}
                  refresh={refresh}
                  pubSpot={pubSpot}
                  setPubSpot={setPubSpot}
                  hotspots={hotspots}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function EditImage({
  item,
  spot,
  setSpot,
  type,
  refresh,
  hotspots,
  setPubSpot,
}) {
  const [divWidth, setDivWidth] = useState(null);

  const handleImageClick = (event) => {
    if (type) {
      const rect = event.target.getBoundingClientRect();
      const xCoord = ((event.clientX - rect.left) / rect.width) * 100;
      const yCoord = ((event.clientY - rect.top) / rect.height) * 100;
      console.log(xCoord, yCoord);
      setSpot({
        position: { x: Math.floor(xCoord), y: Math.floor(yCoord) },
        state: "draft",
      });
    } else alert("You need to select type of hotspot before proceeding");
  };

  return (
    <div
      className=" max-w-fit relative"
      style={{ maxWidth: `${divWidth ? divWidth + "px" : "fit-content"}` }}
    >
      <img
        id="edit"
        alt="whatever"
        src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.image.filename_disk}`}
        className="h-full object-contain"
        onLoad={() => setDivWidth(document.getElementById("edit").offsetWidth)}
        onClick={(e) => handleImageClick(e)}
      ></img>
      {spot ? <Hotspot data={spot} /> : null}
      {hotspots &&
        type &&
        hotspots[type] &&
        hotspots[type].map((h, index) => {
          return <Hotspot data={h} key={index} setPubSpot={setPubSpot} />;
        })}
    </div>
  );
}

export function AttributeForm({
  spot,
  type,
  editImg,
  refresh,
  pubSpot,
  setPubSpot,
  hotspots,
}) {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState(false);

  function handleUpload(e) {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  }

  if (type && spot) {
    return (
      <div className="">
        <form
          action={async (fData) => {
            console.log(fData);
            await addHotspot(fData);
            refresh(editImg.id);
          }}
          className="grid grid-cols-5"
        >
          <div className={`col-span-1 ${link ? "hidden" : "block"}`}>
            <div>
              <img
                src={
                  file ? URL.createObjectURL(file) : `/square-placeholder.jpg`
                }
                className="w-[120px] mb-2 mx-auto"
              />
            </div>
            <input
              type="file"
              id="file"
              name="image"
              className=" text-sm"
              onChange={(e) => handleUpload(e)}
            ></input>
          </div>
          <div className="ml-8 col-span-4">
            <div className={`mb-2 ${link ? "block" : "hidden"}`}>
              <input
                className="h-8 w-full border border-borderGrey/30 px-5 rounded-md"
                placeholder="Enter Attribute Id"
                name="existing_attr"
              ></input>
            </div>
            <div className={`mb-2 ${link ? "hidden" : "block"}`}>
              <input
                className="h-8 w-full border border-borderGrey/30 px-5 rounded-md"
                placeholder="Title"
                name="title"
              ></input>
            </div>
            <div className=" flex mb-2">
              <div className={`grow mr-2 ${link ? "hidden" : "block"}`}>
                <input
                  className="h-8 w-full border border-borderGrey/30 px-5 rounded-md"
                  placeholder="Brand"
                  name="brand"
                ></input>
              </div>
              <div className="grow">
                <input
                  className="h-8 w-full border border-borderGrey/30 px-5 rounded-md"
                  placeholder="Vendor"
                  name="vendor"
                ></input>
              </div>
            </div>
            <div className=" flex mb-2">
              <input
                className="h-8 w-full border border-borderGrey/30 px-5 rounded-md"
                placeholder="Link"
                name="link"
              ></input>
            </div>
            <input type="hidden" name="spotX" value={spot.position.x} />
            <input type="hidden" name="spotY" value={spot.position.y} />
            <input type="hidden" name="type" value={type} />
            <input type="hidden" name="edit_img_id" value={editImg.id} />
            <input
              type="hidden"
              name="hotspots"
              value={editImg.hotspots || ""}
            />
            <div className={`flex justify-between`}>
              <div className={`flex items-center`}>
                <input
                  type="checkbox"
                  name="check"
                  className=" mr-2"
                  checked={link}
                  onChange={() => setLink((l) => !l)}
                />
                <p>Link to existing attribute?</p>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-primary rounded-full px-4 h-10 text-white"
                >
                  Publish hotspot
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  } else if (pubSpot) {
    return (
      <div>
        <SpotData pubSpot={pubSpot} type={type} />
        <div className=" mt-8 flex justify-end px-5">
          <button
            className=" text-sketch-green"
            onClick={async () => {
              const result = confirm("Delete this hotspot?");
              if (result === true) {
                await deleteHotspot(hotspots, type, pubSpot, editImg.id);
                alert("hotspot deleted");
                refresh(editImg.id);
              }
            }}
          >
            Delete Hotspot
          </button>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export function SpotData({ pubSpot, type }) {
  const [attData, setAttData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAttribute(pubSpot.attr_id);
      setAttData(data);
      console.log(data);
    }
    fetchData();
  }, [pubSpot]);

  if (attData) {
    return (
      <div
        className={`w-fit py-2 pr-10 pl-2 rounded-md shadow-md ${
          type ? "flex" : "hidden"
        }`}
      >
        <div className=" ">
          <img
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${attData.image.filename_disk}`}
            className="w-[50px] rounded-md"
          ></img>
        </div>
        <div className=" ml-4">
          <p className=" font-medium">{attData.title}</p>
          <p className=" text-greyText">{attData.brand}</p>
          <p className=" italic text-sm text-greyText">
            Vendor: {pubSpot.vendor}
          </p>
        </div>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}

export function Hotspot({ data, setPubSpot }) {
  console.log("This is hotspot data>>>", data);
  return (
    <button
      className={`absolute z-10`}
      style={{
        left: `${data.position.x}%`,
        top: `${data.position.y}%`,
        transform: "translate(-50%,-50%)",
      }}
      onClick={() => {
        setPubSpot(data);
      }}
    >
      <HotSpotAnimation state={data.state} />
    </button>
  );
}

export function HotSpotAnimation({ state }) {
  let color;
  if (state == "draft") color = " bg-sketch-skyBlue";
  else if (state == "edit") color = "bg-orange";
  else color = "bg-white";
  return (
    <div
      className={`recorder-container ${color}`}
      style={{ height: "20px", width: "20px" }}
    >
      <div className="outer-2" style={{ width: "20px", height: "20px" }}></div>
      <div className="icon-microphone">&nbsp;</div>
    </div>
  );
}
