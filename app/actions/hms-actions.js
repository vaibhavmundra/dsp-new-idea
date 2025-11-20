"use server";

import { getInstructorStatus, getUserData } from "./auth";
import sendWhatsApp from "./brevo-actions";
import { getSection, updateSection } from "./course-data";

var jwt = require("jsonwebtoken");
var uuid4 = require("uuid4");

var app_access_key = process.env.HMS_ACCESS_KEY;
var app_secret = process.env.HMS_APP_SECRET;

export default async function hmsManagementToken() {
  var payload = {
    access_key: process.env.HMS_ACCESS_KEY,
    type: "management",
    version: 2,
    iat: Math.floor(Date.now() / 1000),
    nbf: Math.floor(Date.now() / 1000),
  };

  function token() {
    //Had to use this whole promise wala stuff otherwise token was returned as undefined
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        app_secret,
        {
          algorithm: "HS256",
          expiresIn: "24h",
          jwtid: uuid4(),
        },
        function (err, token) {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    });
  }

  let res = await token();
  return res;
}

export async function hmsAuthToken(id) {
  const user = await getUserData();

  let role, res;

  if (user.role === 3) {
    role = "viewer";
  } else if (user.role < 3) {
    role = "educator";
  }
  var payload = {
    access_key: app_access_key,
    room_id: id,
    role: role,
    type: "app",
    version: 2,
    iat: Math.floor(Date.now() / 1000),
    nbf: Math.floor(Date.now() / 1000),
  };

  function token() {
    //Had to use this whole promise wala stuff otherwise token was returned as undefined
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        app_secret,
        {
          algorithm: "HS256",
          expiresIn: "24h",
          jwtid: uuid4(),
        },
        function (err, token) {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    });
  }

  res = await token();
  return res;
}

export async function checkHMSSession() {
  const token = await hmsManagementToken();
  const res = await fetch(
    `https://api.100ms.live/v2/active-rooms/${process.env.HMS_ROOM_ID}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data;
}

//When an educator/admin starts the session, first the room is created and it's room id is updated in directus,
// then room codes are created by createRoomCode function. If a student logs in to an existing session,
// then the room code is fetched by the getRoomCode function

export async function createRoom(name, course_id, section_id) {
  const token = await hmsManagementToken();
  const data = {
    name: name,
    template_id: process.env.HMS_TEMPLATE_ID,
  };
  const res = await fetch("https://api.100ms.live/v2/rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const res_data = await res.json();
  const room_code = await createRoomCode(res_data.id);
  const code = await getRoomCode(res_data.id, course_id);
  const room_check_data = await getSection(section_id);
  const room_check = room_check_data.name;
  if(!room_check){
    const update_status = await updateSection(section_id, {
      status: "Ongoing",
      room_id: res_data.id,
      name: name,
    });
    console.log(update_status);
    await sendWhatsApp(course_id);
  }
  return code;
}

export async function createRoomCode(id) {
  const token = await hmsManagementToken();
  const data = await fetch(`https://api.100ms.live/v2/room-codes/room/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const codes = await data.json();
}

export async function getRoomCode(id, course_id) {
  const token = await hmsManagementToken();
  const instructor = await getInstructorStatus(course_id);
  const user = await getUserData();

  const data = await fetch(`https://api.100ms.live/v2/room-codes/room/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json_data = await data.json();
  const codes = json_data.data;

  if (user.role === 1) {
    const code = codes.find((code) => code.role === "admin");

    return code.code;
  } else if (instructor) {
    const code = codes.find((code) => code.role === "educator");
    return code.code;
  } else {
    const code = codes.find((code) => code.role === "viewer");
    return code.code;
  }
}

export async function disableRoom(id) {
  const token = await hmsManagementToken();
  const data = {
    enabled: false,
  };
  const res = await fetch(`https://api.100ms.live/v2/rooms/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export async function recordingHD() {
  const token = await hmsManagementToken();
  const data = [
    {
      name: "default",
      role: "admin",
      compositeRecording: {
        browserComposite: {
          width: 1920,
          height: 1080,
        },
      },
    },
  ];
  const res = await fetch(
    `https://api.100ms.live/v2/templates/654b2ff8c75a69c5f8103394/recordings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  const res_data = await res.json();
  console.log(res_data);
}
