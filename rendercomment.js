import {likeButton}from "./DOM.js";
const commentsElement = document.getElementById("comments" );

export const renderComments = () =>{

    const commentsHtml = window.comments.map((comment) => {
        console.log(comment)
      const createDate = dateFns.format(new Date(comment.date), 'YYYY-MM-DD hh.mm.ss');
      console.log(createDate)
    return ` <li class="comment" data-text="${comment.text}" data-name="${comment.name}"
    data-date= "${createDate}" data-counter="${comment.likesCounter}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${createDate}</div>
          </div>
          <div class="comment-body">
            <div  class="comment-text" >
             ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span  class="likes-counter" data-counter="${comment.likesCounter}">${comment.likesCounter}</span>
              <button class="like-button" ></button>
            
            </div>
          </div>
        </li>`;
    }).join('');


    likeButton();

    commentsElement.innerHTML = commentsHtml;


    }

