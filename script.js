window.addEventListener("load",()=>{
  document.getElementById("loader").style.display="none";
});

function toggleTheme(){
  document.body.classList.toggle("light");
}

/* YouTube Subscriber Counter */
async function fetchSubs(){
  const API_KEY="YOUR_API_KEY";
  const CHANNEL_ID="YOUR_CHANNEL_ID";

  try{
    const res=await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`
    );
    const data=await res.json();
    const subs=data.items[0].statistics.subscriberCount;
    document.getElementById("subCount").innerText=subs+"+";
  }catch{
    document.getElementById("subCount").innerText="API Error";
  }
}

fetchSubs();
setInterval(fetchSubs,60000);

/* Firebase Comments */
function addComment(){
  const input=document.getElementById("commentInput");
  if(input.value==="") return;

  db.ref("comments").push({
    text:input.value
  });

  input.value="";
}

db.ref("comments").on("value",(snapshot)=>{
  const section=document.getElementById("commentSection");
  section.innerHTML="";
  snapshot.forEach((child)=>{
    const div=document.createElement("div");
    div.className="comment";
    div.innerHTML=child.val().text;
    section.appendChild(div);
  });
});

/* Admin */
function adminLogin(){
  const pass=prompt("Enter Admin Password:");
  if(pass==="HIMANSHU2026"){
    alert("Admin Mode Activated");
  }else{
    alert("Wrong Password");
  }
}
