"use server";

import { cookies } from "next/headers";

export async function imageList() {
  const _cookies = cookies(); //Adding this to force cache to no store even in the development environment
  const res = await fetch(
    `${process.env.DIRECTUS_API_BASE_URL}/items/images?fields=*,*.*,*.*.*`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
      },
    },
    { cache: "no-store" }
  );
  const data = await res.json();
  return data;
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

export async function addHotspot(formData) {
  const attributeData = {
    title: formData.get("title"),
    brand: formData.get("brand"),
    link: formData.get("link"),
  };
  const hotspotData = {
    position: { x: formData.get("spotX"), y: formData.get("spotY") },
    vendor: formData.get("vendor"),
    type: formData.get("type"),
  };

  const existing_attr = formData.get("existing_attr");
  const image = formData.get("image");
  const edit_img_id = formData.get("edit_img_id");
  const hotspots = formData.get("hotspots");
  const type = formData.get("type");
  let hotspotList = null;
  if (hotspots) {
    hotspotList = JSON.parse(hotspots);
  } else {
    hotspotList = { materials: [], objects: [], lights: [], systems: [] };
  }

  if (!existing_attr) {
    const uploadImageRes = await uploadImage(image);
    attributeData.image = uploadImageRes.id;
    const addAttributeRes = await addAttribute(attributeData);
    hotspotData.attr_id = addAttributeRes.id;
  } else {
    hotspotData.attr_id = parseInt(existing_attr);
  }

  hotspotList[type] = [...hotspotList[type], hotspotData];
  await updateHotspots(edit_img_id, hotspotList);
}

export async function deleteHotspot(list, type, hotspot, id) {
  console.log("Starting list", list, hotspot);
  const arr = list[type];
  const str_arr = arr.map((item) => JSON.stringify(item));
  const index = str_arr.indexOf(JSON.stringify(hotspot));
  if (index > -1) {
    str_arr.splice(index, 1);
    console.log("Curtailed!");
  }
  list[type] = str_arr.map((item) => JSON.parse(item));
  console.log("Removed hotspot", list);
  await updateHotspots(id, list);
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${process.env.DIRECTUS_API_BASE_URL}/files`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
    },
    body: formData,
  });
  const data = await res.json();
  console.log("Directus response>>", data);
  return data.data;
}

async function addAttribute(data) {
  console.log("Uploading this data>>", data);
  const res = await fetch(
    `${process.env.DIRECTUS_API_BASE_URL}/items/attributes`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
      },
      body: JSON.stringify(data),
    }
  );
  const response = await res.json();
  console.log("Directus response>>", response);
  return response.data;
}

async function updateHotspots(id, hotspotList) {
  console.log(hotspotList);
  console.log(JSON.stringify(hotspotList));
  const data = JSON.stringify(hotspotList);

  const res = await fetch(
    `${process.env.DIRECTUS_API_BASE_URL}/items/images/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
      },
      body: JSON.stringify({ hotspots: data }),
    }
  );
  const response = await res.json();
  console.log("Directus response publish hotspot>>", response);
  return response.data;
}

export async function fetchImgData(id) {
  const _cookies = cookies(); //Adding this to force cache to no store even in the development environment
  const res = await fetch(
    `${process.env.DIRECTUS_API_BASE_URL}/items/images/${id}?fields=hotspots,image.filename_disk`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
      },
    },
    { cache: "no-store" }
  );
  const data = await res.json();
  console.log("This is fetched image data", data);
  return data.data;
}

export async function fetchAttribute(id) {
  const _cookies = cookies(); //Adding this to force cache to no store even in the development environment
  const res = await fetch(
    `${process.env.DIRECTUS_API_BASE_URL}/items/attributes/${id}?fields=*,*.*,*.*.*`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
      },
    },
    { cache: "no-store" }
  );
  const data = await res.json();
  console.log("Fetched attribute data", data);
  return data.data;
}

export async function fetchPostBySlug(slug) {
  const _cookies = cookies();
  const response = await fetch(
    `${process.env.DIRECTUS_API_BASE_URL}/items/posts?filter[slug][_eq]=${slug}&fields=*,*.*`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
      },
    },
    { cache: "no-store" }
  );
  const data = await response.json();
  console.log("Blog fetched!", data);
  return data.data[0];
}

export async function fetchPosts() {
  const _cookies = cookies();
  const response = await fetch(
    `${
      process.env.DIRECTUS_API_BASE_URL
    }/items/posts?filter[published][_eq]=${true}&limit=10&sort=-published_date&fields=title,slug,author,published_date,featured_image.filename_disk,excerpt`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
      },
    },
    { cache: "no-store" }
  );
  const data = await response.json();
  return data.data;
}
