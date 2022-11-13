// 로그인 
let username = prompt("아이디를 입력하세요.");
let roomNum = prompt("채팅방 번호를 입력하세요.");

document.querySelector("#username").innerHTML = username;

const eventSource = new EventSource(`http://localhost/chat/roomNum/${roomNum}`);

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if(data.sender === username){     // 로그인 한 유저가 보낸 메시지 
    // 파란 박스 
    initMyMessage(data);
  } else {
    // 회색 박스 
    initOthersMessage(data);
  }  
}

// 파란 박스 만들기
function getSendMsgBox(data){

  let md = data.createdAt.substring(5, 10);
  let tm = data.createdAt.substring(11,16);
  let convertTime = tm + " | " + md;

  return ` <div class="sent_msg">
  <p>${data.msg}</p>
  <span class="time_date"> ${convertTime} / <b>${data.sender}</b> </span>
</div>`  
}

// 회색 박스 만들기
function getReceiveMsgBox(data){

  let md = data.createdAt.substring(5, 10);
  let tm = data.createdAt.substring(11,16);
  let convertTime = tm + " | " + md;

  return ` <div class="received_withd_msg">
  <p>${data.msg}</p>
  <span class="time_date"> ${convertTime} / <b>${data.sender}</b> </span>
</div>`  
}

// 최초 초기화 될 때 1번 방에 3건이 있으면 3건의 데이터를 다 가져옴.
// addMessage() 함수 호출하면 DB에 insert되고, 그 데이터가 자동으로 흘러들어온다.(SSE)
// 파란 박스 초기화 
function initMyMessage(data){
  let chatBox = document.querySelector("#chat-box");

  let sendBox = document.createElement("div");

  sendBox.className = "outgoing-msg";

  sendBox.innerHTML = getSendMsgBox(data);
  chatBox.append(sendBox);  

  // 스크롤 하기 
  document.documentElement.scrollTop = document.body.scrollHeight;
}

// 회색 박스 초기화 
function initOthersMessage(data){
  let chatBox = document.querySelector("#chat-box");

  let receivedBox = document.createElement("div");

  receivedBox.className = "received_msg";

  receivedBox.innerHTML = getReceiveMsgBox(data);
  chatBox.append(receivedBox);  

  // 스크롤 하기 
  document.documentElement.scrollTop = document.body.scrollHeight;
}

// AJAX 채팅 메시지 전송 
// 데이터 베이스에 insert만 수행하면 됨.
async function addMessage(){
  
  let msgInput = document.querySelector("#chat-outgoing-msg");

  let chat = {
    sender: username,
    roomNum: roomNum,
    msg: msgInput.value,
  };

  fetch("http://localhost/chat", {
    method: "post",
    body: JSON.stringify(chat),   // js -> json 
    headers: {
      "Content-Type":"application/json;charset=utf-8"
    }
  });

  msgInput.value = "";    // 메시지 창 지우기 
}

// 버튼 클릭시 메시지 전송 
document.querySelector("#chat-outgoing-button").addEventListener("click", () => {
  addMessage();
});

// 엔터키 누를 때 메시지 전송
document.querySelector("#chat-outgoing-msg").addEventListener("keydown", (e) => {
  if(e.keyCode == 13){
    addMessage();
  }
}); 