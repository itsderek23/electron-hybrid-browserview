// in preload scripts, we have access to node.js and electron APIs
// the remote web app will not, so this is safe
const { ipcRenderer: ipc, remote } = require('electron');

document.addEventListener("DOMContentLoaded",function(){
  document.getElementsByTagName("form")[0].addEventListener("submit", (evt) => {
    evt.preventDefault();
    const input = document.getElementsByTagName("input")[0];
    console.log("sending hello=",input.value)
    ipc.send("hello",input.value)
  })
});

ipc.on("greeting", (evt, result) => {
  console.log("received full greeting=",result)
  const greetingContainer = document.getElementById("greeting_container");
  greetingContainer.innerHTML = result;
});
