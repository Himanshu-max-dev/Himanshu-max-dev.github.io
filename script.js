const correctPin = "7788";
const adminPassword = "HIMANSHU2026";
let isAdmin = false;

/* PIN */
function checkPin(){
  const input = document.getElementById("pinInput").value;
  if(input === correctPin){
    document.getElementById("pin-screen").style.display="none";
    document.getElementById("mainContent").style.display="block";
    loadComments();
  } else {
    document.getElementById("errorMsg").innerText="Wrong PIN";
  }
}

/* ADMIN */
function showAdminLogin(){
  document.getElementById("adminPanel").style.display="flex";
}

function closeAdmin(){
  document.getElementById("adminPanel").style.display="none";
}

function adminLogin(){
  const pass = document.getElementById("adminPass").value;
  if(pass === adminPassword){
    isAdmin = true;
    alert("Admin Mode Activated");
    document.querySelectorAll(".delete-btn").forEach(btn=>{
      btn.style.display="block";
    });
    closeAdmin();
  } else {
    alert("Wrong Password");
  }
}

/* COMMENTS */
function addComment(){
  const name = document.getElementById("username").value;
  const text = document.getElementById("commentText").value;

  if(name === "" || text === "") return;

  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.push({name,text});
  localStorage.setItem("comments", JSON.stringify(comments));

  document.getElementById("username").value="";
  document.getElementById("commentText").value="";
  loadComments();
}

function loadComments(){
  const list = document.getElementById("commentList");
  list.innerHTML="";
  const comments = JSON.parse(localStorage.getItem("comments")) || [];

  comments.forEach((c,index)=>{
    const div = document.createElement("div");
    div.className="comment";
    div.innerHTML=`<strong>${c.name}</strong><p>${c.text}</p>`;

    const del = document.createElement("button");
    del.className="delete-btn";
    del.innerText="X";
    del.onclick=function(){
      deleteComment(index);
    };

    if(isAdmin) del.style.display="block";

    div.appendChild(del);
    list.appendChild(div);
  });
}

function deleteComment(index){
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.splice(index,1);
  localStorage.setItem("comments", JSON.stringify(comments));
  loadComments();
}
