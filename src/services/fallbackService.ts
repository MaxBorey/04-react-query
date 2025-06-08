import axios from "axios";

export default async function getImagesByQuery(query: string) {
  const myApiKey = import.meta.env.VITE_PIXABAY_API;
  const url = "https://pixabay.com/api/";

  const response = await axios.get(url, {
    params: {
      key: myApiKey,
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
    },
  });
  return response.data;
}