import { renderComments }from "./rendercomment.js";
import {fetchPromise, fetchAddComment} from "./api.js";
const buttonElement = document.getElementById("add-button");
const nameInputElement = document.getElementById("input-name");
const textInputElement = document.getElementById("input-text");


   export let comment = [
        {
          name: "Глеб Фокин",
          dates: "12.02.22 12:18",
          text: "Это будет первый комментарий на этой странице",
          likeCounter: 3,
         },
        {
          name: "Варвара Н.",
          dates: "13.02.22 19:22",
          text: "Мне нравится как оформлена эта страница! ❤",
         likeCounter: 75,
        },
      ];

function AddAComment() {
    let loadingsComments = document.getElementById('data-loader-two');
    loadingsComments.classList.remove('hidden');
    let formElement = document.getElementById('form');
    formElement.classList.add('hidden');
    buttonElement.disabled = true;
    console.log(textInputElement, nameInputElement)

    fetchAddComment(textInputElement.value, nameInputElement.value).then((response) => {
      console.log(response);
      if (response.status === 500) {
        throw new Error('Сервер сломался, попробуйте позже');
      } else if (response.status === 400) {
        alert ("Имя и комментарий должны быть не короче 3 символов");
        return;
      
      }
      response.json().then((responseData) => {
        commentJSON = responseData.result;
        let loadingsComments = document.getElementById('data-loader-two');
        loadingsComments.classList.add('hidden');
        let formElement = document.getElementById('form');
        formElement.classList.remove('hidden')
      });
     
    })
    .catch((error)=>{
      alert('Кажется, у вас сломался интернет, попробуйте позже');
      buttonElement.disabled = false;
      buttonElement.textContent = "Добавить";
      let formElement = document.getElementById('form');
        formElement.classList.remove('hidden');
        let loadingsComments = document.getElementById('data-loader-two');
    loadingsComments.style.display='none';
      console.warn(error);
    }

    )
  
    .then(()=>{
      buttonElement.disabled = false;
      buttonElement.textContent = "Добавить";
      textInputElement.value = "";
      nameInputElement.value = "";
      let formElement = document.getElementById('form');
        formElement.classList.remove('hidden');
        renderComments(comment);
        let loadingsComments = document.getElementById('data-loader-two');
        loadingsComments.classList.add('hidden');
      
    })
      
}


export function likeButton() {
        const likeButtonElements = document.querySelectorAll(".like-button");
        for (const likeButtonElement of likeButtonElements) {
          const counterElement =
            likeButtonElement.parentElement.querySelector(".likes-counter");
          likeButtonElement.addEventListener("click", (event) => {
            event.stopPropagation();
            likeButtonElement.classList.toggle("-active-like");
            likeButtonElement.classList.contains("-active-like")
              ? counterElement.innerHTML++
              : counterElement.innerHTML--;
          });
        }
      }
     export function time() {
        let dateComment = new Date();
        const months = [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ];
        let fullDate =
          dateComment.getDate() +
          "." +
          months[dateComment.getMonth()] +
          "." +
          dateComment.getFullYear() +
          " " +
          dateComment.getHours() +
          ":" +
          dateComment.getMinutes();
        return fullDate;
      }
      buttonElement.addEventListener("click", () => {
        nameInputElement.classList.remove("erorr");
        textInputElement.classList.remove("erorr");
        buttonElement.classList.remove("gray");

        if (nameInputElement.value === "" || textInputElement.value === "") {
          nameInputElement.classList.add("erorr");
          textInputElement.classList.add("erorr");
          buttonElement.classList.add("gray");

          return;
        }

        comment.push({
          name: nameInputElement.value
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll("&", "&amp;")
            .replaceAll('"', "&quot;"),
          dates: time(),
          text: textInputElement.value
            .replaceAll("BEGIN_QUOTE", "<div class='quote'>")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll("&", "&amp;")
            .replaceAll('"', "&quot;"),
          likeCounter: 0,
        });

        fetchPromise().then((response) => {
            let loadingComments =document.getElementById('data-loader');
            loadingComments.style.display='none';
            const jsonPromise = response.json();
            jsonPromise.then((responseData) => {

                let appComments = responseData.comments.map((comment) => {
                    return {
                        name: comment.author.name,
                        dates: new Date(comment.date).toLocaleString().slice(0, -3),
                        text: comment.text,
                        likeCounter: comment.likes,
                        isLiked: false,
                    };
                });

                console.log(appComments);
                AddAComment();
                nameInputElement.value = "";
                textInputElement.value = "";
                renderComments(appComments);
                likeButton();
            });
        });
      });
