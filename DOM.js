import {renderComments} from "./rendercomment.js";
import{getCommentsLoading,getComments,postComments} from "./api.js";

const buttonElement = document.getElementById("add-button");
const commentsElement = document.getElementById("comments" ); 
 const nameInputElement = document.getElementById("name-input" );
 const commentInputElement = document.getElementById("comment-input" );
const likes = document.querySelectorAll('.likes'); 
let addForm = document.getElementById("add-form");
let host = "https://webdev-hw-api.vercel.app/api/v1/:gerasimova_anna/comments";

// get
export const fetchAndRenderComments = () => {
  let commentsLoading = document.createElement('div');
commentsLoading.id = 'commentsLoading';
commentsLoading.innerHTML = '<p>Комментарии загружается...</p>';
commentsElement.parentNode.replaceChild(commentsLoading, commentsElement);
 return getCommentsLoading();
};

// второй get
export const fetchAndRenderCommentsTwo = () => {
return getComments();
   }
  
fetchAndRenderComments();
fetchAndRenderCommentsTwo(); 


export const likeButton = () => {
const likeElements = document.querySelectorAll('.like-button'); 

for (const likeElement of likeElements) {
  likeElement.addEventListener('click', (event) => {
    likeElement.classList.toggle('-active-like');
    const index = [...document.querySelectorAll('.like-button')].indexOf(likeElement); 
    const count = document.querySelectorAll('.likes-counter')[index]; 
    likeElement.classList.contains('-active-like') ? count.innerHTML++ : count.innerHTML--;
    event.stopPropagation();
    
  })
}

const commentElementsAnswer = document.querySelectorAll('.comment');
for (const commentAnswer of commentElementsAnswer) {
  commentAnswer.addEventListener('click', () => {
    const text = commentAnswer.dataset.text;
    const nameComment = commentAnswer.dataset.name;
    commentInputElement.value = text +"\n" + nameComment ;
    
  })
}
}
// массив объектов
window.comments = [];
  
  
// дата
export function data () {
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
  
   
  nameInputElement.classList.remove('error');

  if (nameInputElement.value === '' ) {
    nameInputElement.classList.add('error');
    return;
  }

  commentInputElement.classList.remove('error');

  if (commentInputElement.value === '' ) {
    commentInputElement.classList.add('error');
    return;
  }
  
  comments.push({
    name: nameInputElement.value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;"),
    date: data (),
    text: commentInputElement.value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;"),
    likesCounter: 0,
      }); 
     
 
const postAndRenderComments = () => {
  let addFormLoading = document.createElement('div');
  addFormLoading.id = 'addFormLoading';
  addFormLoading.innerHTML = '<p>Комментарий загружается...</p>';
  addForm.parentNode.replaceChild(addFormLoading, addForm);

return postComments(comments[comments.length - 1].name, comments[comments.length - 1].text)
.then(() => {
  return addFormLoading.parentNode.replaceChild(addForm, addFormLoading);

}).then(() => {
  return fetchAndRenderCommentsTwo();
 
 })
.catch((error) =>{
  addFormLoading.parentNode.replaceChild(addForm, addFormLoading);
alert('Кажется, у вас сломался интернет, попробуйте позже');
console.warn(error);

});

 } 

 
 postAndRenderComments();
 
 nameInputElement.value = '';
 commentInputElement.value = '';
 
  
  likeButton();
  
});


  
 
 
  
 

 
renderComments();
likeButton();

 