"use server";

import { cookies } from "next/headers";
import { uploadImage } from "./blog-data";

export async function fetchQuestions(course_tag, qTab, id) {
  const _cookies = cookies(); //Adding this to force cache to no store even in the development environment
  const filterParams = {
    _and: [{ course: { _eq: course_tag } }, { published: { _eq: true } }],
  };

  // Conditionally add the unresolved filter
  if (qTab === "unanswered") {
    filterParams._and.push({ resolved: { _eq: false } });
  }
  if (qTab === "you") {
    filterParams._and.push({ user: { _eq: id } });
  }

  const filterString = encodeURIComponent(JSON.stringify(filterParams));
  const res = await fetch(
    `${process.env.DIRECTUS_API_BASE_URL}/items/question?sort=-date_created&filter=${filterString}&fields=*,*.*,*.*.*`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
      },
    },
    { cache: "no-store" }
  );
  const data = await res.json();
  // Sorting logic: Pinned first, then by date
  const sortedData = data.data.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.date_created) - new Date(a.date_created);
  });

  return { data: sortedData };
}

export async function postQuestion(formData) {
  const file = formData.get("file");
  const q_id = formData.get("q_edit");
  let filename_disk, url, method, body;
  if (!q_id) {
    if (file.size > 0) {
      const f = await uploadImage(file);
      filename_disk = f.id;
    }
    method = "POST";
    url = `${process.env.DIRECTUS_API_BASE_URL}/items/question`;

    body = {
      question: formData.get("title"),
      description: formData.get("description"),
      course: formData.get("course"),
      user: formData.get("user"),
      file: filename_disk,
      published: true,
      resolved: false,
    };
  } else {
    filename_disk = formData.get("q_file");
    method = "PATCH";
    url = `${process.env.DIRECTUS_API_BASE_URL}/items/question/${q_id}`;
    body = {
      question: formData.get("title"),
      description: formData.get("description"),
    };
  }

  console.log(body);

  const res = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
    },
    body: JSON.stringify(body),
  });
  const response = await res.json();
  console.log("Directus response publish question>>", response);
  return response.data;
}

export async function postComment(formData, extra_data) {
  let filename_disk, url;

  if (extra_data.method === "POST") {
    const file = formData.get("file");
    if (file.size > 0) {
      const f = await uploadImage(file);
      filename_disk = f.id;
    }
    url = `${process.env.DIRECTUS_API_BASE_URL}/items/comments`;
  } else if (extra_data.method === "PATCH") {
    filename_disk = extra_data.file;
    url = `${process.env.DIRECTUS_API_BASE_URL}/items/comments/${extra_data.id}`;
  }

  const body = {
    comment: formData.get("comment"),
    user: formData.get("user_id"),
    user_name: formData.get("user_name"),
    file: filename_disk,
    question_id: formData.get("question_id"),
  };

  const res = await fetch(url, {
    method: extra_data.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
    },
    body: JSON.stringify(body),
  });
  const response = await res.json();
  console.log("Directus response publish hotspot>>", response);
  return response.data;
}

export async function deleteQuestion(id) {
  const res = await fetch(
    `${process.env.DIRECTUS_API_BASE_URL}/items/question/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
      },
    }
  );
  const data = await res.json();
}

export async function pinQuestion(id, state) {
  let body;
  if (state === true) {
    body = { pinned: true };
  }
  if (state === false) {
    body = { pinned: false };
  }
  const res = await fetch(
    `${process.env.DIRECTUS_API_BASE_URL}/items/question/${id}`,
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
}

export async function deleteComment(id) {
  const res = await fetch(
    `${process.env.DIRECTUS_API_BASE_URL}/items/comments/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
      },
    }
  );
  const data = await res.json();
}

export async function fetchComments(q_id) {
  const _cookies = cookies();
  const res = await fetch(
    `${process.env.DIRECTUS_API_BASE_URL}/items/comments?sort=date_created&filter[question_id][_eq]=${q_id}&fields=*,*.*,*.*.*`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
      },
    },
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.data;
}

export async function markSolution(q_id, c_id, status) {
  let c_body, q_body;
  if (status === true) {
    c_body = { solution: true };
    q_body = { resolved: true };
  } else if (status === false) {
    c_body = { solution: false };
    q_body = { resolved: false };
  }
  const _cookies = cookies();
  const comment_res = await fetch(
    `${process.env.DIRECTUS_API_BASE_URL}/items/comments/${c_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
      },
      body: JSON.stringify(c_body),
    },
    { cache: "no-store" }
  );
  const question_res = await fetch(
    `${process.env.DIRECTUS_API_BASE_URL}/items/question/${q_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
      },
      body: JSON.stringify(q_body),
    },
    { cache: "no-store" }
  );
}
