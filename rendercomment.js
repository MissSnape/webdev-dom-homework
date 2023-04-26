import { likeButton } from "./DOM.js";
const listElement = document.getElementById("list");
const textInputElement = document.getElementById("input-text");

export const renderComments = (comments) => {
    const commentsHtml = comments
      .map((comment) => {
        return `<li class="comment">
      <div class="comment-header">
      <div>${comment.name}</div>
          <div>${comment.dates}</div>
        </div>
        <div class="comment-body">
          <div style="white-space:pre-line" class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likeCounter}</span>
            <button class="like-button"></button>
      </li>`;
      })
      .join("");
    listElement.innerHTML = commentsHtml;
    function sendAnAnswer() {
        const commentElement = document.querySelectorAll(".comment");
        for (const answerElement of commentElement) {
          answerElement.addEventListener("click", () => {
            let writer = answerElement.querySelector(".comment-header");
            let reply = answerElement.querySelector(".comment-body");
            textInputElement.style.whiteSpace = "pre-line";
            textInputElement.value = `${writer.textContent}  ${reply.textContent}`;
          });
        }
      }
      sendAnAnswer();
      likeButton();
    };


