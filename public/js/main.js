/*
 *  Copyright (c) 2018 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
"use strict";
console.log("main.js started!");
// Polyfill in Firefox.
// See https://blog.mozilla.org/webrtc/getdisplaymedia-now-available-in-adapter-js/
if (adapter.browserDetails.browser == "firefox") {
  adapter.browserShim.shimGetDisplayMedia(window, "screen");
}
const screenConstraints = {
  width: screen.width,
  height: screen.height,
};
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {
  navigator.mediaDevices
    .getDisplayMedia({ audio: true, video: screenConstraints })
    .then(handleSuccess, handleError);
});

function handleSuccess(stream) {
  //startButton.disabled = true;
  const video = document.querySelector("video");
  video.srcObject = stream;

  // demonstrates how to detect that the user has stopped
  // sharing the screen via the browser UI.
  stream.getVideoTracks()[0].addEventListener("ended", () => {
    errorMsg("The user has ended sharing the screen");
    //startButton.disabled = false;
  });
}

function handleError(error) {
  errorMsg(`getDisplayMedia error: ${error.name}`, error);
}

function errorMsg(msg, error) {
  alert(msg + "<br>" + error);
  // const errorElement = document.querySelector("#errorMsg");
  // //errorElement.innerHTML += `<p>${msg}</p>`;
  // errorElement.innerHTML += "<p>" + msg + "</p>";
  // if (typeof error !== "undefined") {
  //   console.error(error);
  // }
}

if (navigator.mediaDevices && "getDisplayMedia" in navigator.mediaDevices) {
  //startButton.disabled = false;
} else {
  errorMsg(
    "getDisplayMedia is not supported.<br> Please using Google Chrome or CocCoc or Safari for best performance!"
  );
}
//=============================================================

// const btn50_50 = document.getElementById("btn50_50");
// btn50_50.addEventListener("click", () => {
//   console.log("btn50_50");
//   let divVideos = document.getElementById("divVideos");

//   if (divVideos.classList.contains("app__right__videoFullScreen")) {
//     divVideos.classList.remove("app__right__videoFullScreen");
//     divVideos.classList.add("app__right__video");

//     document
//       .getElementById("img5050")
//       .setAttribute("src", "/icons/view_sidebar-24px.svg");
//   } else {
//     divVideos.classList.remove("app__right__video");
//     divVideos.classList.add("app__right__videoFullScreen");

//     document
//       .getElementById("img5050")
//       .setAttribute("src", "/icons/people_outline-24px.svg");
//   }
// });

// const btnChat = document.getElementById("btnChat");
// btnChat.addEventListener("click", () => {
//   console.log("btnChat");
//   let divChat = document.getElementById("divChat");
//   let visibility = divChat.style.visibility;
//   if (visibility === "collapse") {
//     document
//       .getElementById("imgChat")
//       .setAttribute("src", "/icons/speaker_notes-24px.svg");

//     divChat.style.visibility = "visible";
//   } else {
//     document
//       .getElementById("imgChat")
//       .setAttribute("src", "/icons/speaker_notes_off-24px.svg");

//     divChat.style.visibility = "collapse";
//   }
// });
