const correctPin = "7788";
const adminPassword = "HIMANSHU2026";
let isAdmin = false;

/* ================= PIN ================= */
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

/* ================= ADMIN ================= */
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
    alert("🔥 Super Admin Activated");
    loadComments();
    closeAdmin();
  } else {
    alert("Wrong Password");
  }
}

/* Hidden shortcut Ctrl+Shift+H */
document.addEventListener("keydown", function(e){
  if(e.ctrlKey && e.shiftKey && e.key === "H"){
    showAdminLogin();
  }
});

/* ================= COMMENTS ================= */

function addComment(){
  const name = document.getElementById("username").value;
  const text = document.getElementById("commentText").value;

  if(name === "" || text === "") return;

  const comments = JSON.parse(localStorage.getItem("comments")) || [];

  comments.push({
    name,
    text,
    likes:0,
    replies:[]
  });

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

    div.innerHTML = `
      <strong>${c.name}</strong>
      <p>${c.text}</p>
      <div class="comment-actions">
        <button onclick="likeComment(${index})">❤️ ${c.likes}</button>
        <button onclick="showReplyBox(${index})">Reply</button>
      </div>
      <div id="replies-${index}"></div>
    `;

    /* DELETE BUTTON */
    if(isAdmin){
      const del = document.createElement("button");
      del.innerText="Delete";
      del.className="delete-btn";
      del.onclick=function(){ deleteComment(index); };
      del.style.display="block";
      div.appendChild(del);
    }

    list.appendChild(div);

    /* Load Replies */
    c.replies.forEach((r,replyIndex)=>{
      const replyDiv = document.createElement("div");
      replyDiv.className="reply";
      replyDiv.innerHTML = `
        <strong>${r.name}</strong>
        <p>${r.text}</p>
      `;

      if(isAdmin){
        const delReply = document.createElement("button");
        delReply.innerText="X";
        delReply.className="delete-btn";
        delReply.style.display="block";
        delReply.onclick=function(){
          deleteReply(index,replyIndex);
        };
        replyDiv.appendChild(delReply);
      }

      document.getElementById(`replies-${index}`).appendChild(replyDiv);
    });

  });
}

/* ================= LIKE ================= */

function likeComment(index){
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments[index].likes++;
  localStorage.setItem("comments", JSON.stringify(comments));
  loadComments();
}

/* ================= DELETE ================= */

function deleteComment(index){
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.splice(index,1);
  localStorage.setItem("comments", JSON.stringify(comments));
  loadComments();
}

/* ================= REPLY ================= */

function showReplyBox(index){
  const replyBox = document.createElement("div");
  replyBox.innerHTML = `
    <input type="text" id="replyName${index}" placeholder="Your Name">
    <input type="text" id="replyText${index}" placeholder="Reply...">
    <button onclick="addReply(${index})">Send</button>
  `;
  document.getElementById(`replies-${index}`).appendChild(replyBox);
}

function addReply(index){
  const name = document.getElementById(`replyName${index}`).value;
  const text = document.getElementById(`replyText${index}`).value;

  if(name==="" || text==="") return;

  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments[index].replies.push({name,text});
  localStorage.setItem("comments", JSON.stringify(comments));
  loadComments();
}

function deleteReply(commentIndex,replyIndex){
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments[commentIndex].replies.splice(replyIndex,1);
  localStorage.setItem("comments", JSON.stringify(comments));
  loadComments();
}
