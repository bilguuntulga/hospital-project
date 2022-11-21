import request from "./request";

export async function uploadImage(file) {
  const { signature, timestamp } = await request.post("/v1/api/upload");
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/dnxalrd2a/image/upload?api_key=682723139835675&timestamp=${timestamp}&signature=${signature}`,
    {
      method: "POST",
      body: form,
    }
  );
  const data = await res.json();
  return data.secure_url;
}
