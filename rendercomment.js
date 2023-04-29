
import {likeButton}from "./DOM.js";
const commentsElement = document.getElementById("comments" );


export const renderComments = () =>{
    const commentsHtml = window.comments.map((comment, index) => {
    return ` <li class="comment" data-text="${comment.text}" data-name="${comment.name}"
    data-date= "${comment.date}" data-counter="${comment.likesCounter}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
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
    
    