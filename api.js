import {time} from "./DOM.js";

export const fetchPromise = () => fetch(
      "https://webdev-hw-api.vercel.app/api/v1/:gerasimova_anna/comments",
      {
        method: "GET",
      }
    )

export const fetchAddComment = (text, name) => fetch(
    "https://webdev-hw-api.vercel.app/api/v1/:gerasimova_anna/comments",
    {
        method: "POST",
        body: JSON.stringify({
            text: text,
            name: name,
            dates: time(),
            likeCounter: 0,
        }),
    }
)
