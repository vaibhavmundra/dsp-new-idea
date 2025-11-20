"use server";
// let Vimeo = require("vimeo").Vimeo;
// let client = new Vimeo(
//   `${process.env.VIMEO_CLIENT_ID}`,
//   `${process.env.VIMEO_CLIENT_SECRET}`,
//   `${process.env.VIMEO_ACCESS_TOKEN}`
// );

const nameSpace = {
  courseType: ["Workshop", "Course", "Hybrid"],
  sectionType: ["Live", "Video", "Quiz", "Article", "Link"],
  liveStatus: ["Upcoming", "Ongoing", "Archived"],
  user: ["1-Admin", "2-Educator", "3-Student"],
};

export async function getCourseDataLegacy(arr) {
  let response = [];
  arr.forEach((query) => {
    data.forEach((item) => {
      if (item.id === query) {
        response.push(item);
      }
    });
  });
  return response;
}

export async function getCourseList(list){
  const queryParams = new URLSearchParams({
    filter: JSON.stringify({
      id: { _in: list },
    }),
  });

  const res = await fetch(
    `${process.env.DIRECTUS_API_BASE_URL}/items/courses?${queryParams.toString()}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
      },
    },
    { cache: "force-cache" }
    
    
  );
  const data = await res.json();
  console.log("Server was calllllled >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  return data;
}

export async function getCourseData(id) {
  const res = await fetch(
    `${process.env.DIRECTUS_API_BASE_URL}/items/courses/${id}?fields=*,*.*,*.*.*`,
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
//Response structure returned from above function
// {
//   data: {
//     date_created: '2023-11-19T10:17:18.139Z',
//     date_updated: '2023-11-19T10:25:50.258Z',
//     end_date: '2023-11-26',
//     start_date: '2023-11-24',
//     educator_uuid: 'bd0ed968-354c-4d88-bb44-e0fe7c763c7a',
//     educator_name: 'Swapnali Bhadale',
//     type: 'Hybrid',
//     name: 'Lighting design for Interior Projects',
//     id: 2,
//     chapters: [ [Object], [Object] ]
//   }
// }

export async function getCourses() {
  const res = await fetch(
    `${process.env.DIRECTUS_API_BASE_URL}/items/courses`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
      },
    }
  );
  const data = await res.json();
  return data;
}
//This method is called from the createRoom function in the ./hma-actions.js file
//Important namespaces room_id,status:'Archived' or 'Ongoing' or 'Upcoming'
export async function updateSection(id, body) {
  const res = await fetch(
    `${process.env.DIRECTUS_API_BASE_URL}/items/section/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
      },
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  return data;
}

export async function getSection(id) {
  const res = await fetch(
    `${process.env.DIRECTUS_API_BASE_URL}/items/section/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
      },
    }
  );
  const data = await res.json();
  console.log("This is the room check data>>>>>", data);
  return data.data;
}

export async function uploadRecordings(data) {
  const embed_domains = [];
  const body = {
    upload: {
      approach: "pull",
      size: data.size,
      link: data.url,
    },
    name: data.name,
    privacy: {
      view: "disable",
      embed: embed_domains.length ? "whitelist" : "public",
    },
    embed: {
      buttons: {
        embed: false,
        like: false,
        share: false,
        watchlater: false,
      },
      color: `${process.env.PRIMARY_COLOR}`,
      end_screen: {
        type: "empty",
      },
      playbar: true,
      title: {
        name: "hide",
        owner: "hide",
      },
      logos: {
        vimeo: false,
      },
      closed_captions: true,
    },
    name: data.name,
  };
  if (embed_domains.length) {
    body.embed_domains = embed_domains;
  }
  const res = await fetch("https://api.vimeo.com/me/videos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
      Accept: "application/vnd.vimeo.*+json;version=3.4",
    },
    body: JSON.stringify(body),
  });
  const res_data = await res.json();
  if (res_data.name) {
    console.log("Updating directus");
    const str = res_data.name.split("-");
    const course_id = str[str.length - 3]; //Changes in how the course is named in video.jsx will affect this
    const section_id = str[str.length - 2];
    const room_data = await getSection(section_id);
    const room_check=room_data.name;
    if(room_check===data.name){
      console.log("Room check validity was passed>>>>");
      const directus_res = await updateSection(section_id, {
        title:`${room_data.title}: Recording`,
        status: "Archived",
        recording_url: res_data.link,
        date_held: new Date(),
      });
      res_data.directus = directus_res;
      console.log(directus_res);
      return res_data;
    }
    else{
      return "Room check failed";
    }
    
  }

}
