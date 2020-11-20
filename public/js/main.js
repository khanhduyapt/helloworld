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

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {
  navigator.mediaDevices
    .getDisplayMedia({ video: true })
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
  const errorElement = document.querySelector("#errorMsg");
  errorElement.innerHTML += `<p>${msg}</p>`;
  if (typeof error !== "undefined") {
    console.error(error);
  }
}

if (navigator.mediaDevices && "getDisplayMedia" in navigator.mediaDevices) {
  //startButton.disabled = false;
} else {
  errorMsg(
    "getDisplayMedia is not supported.<br> Please using Google Chrome or CocCoc or Safari for best performance!"
  );
}
//=============================================================

const btn70_30 = document.getElementById("btn70_30");
btn70_30.addEventListener("click", () => {
  console.log("btn50_50");
});

const btn50_50 = document.getElementById("btn50_50");
btn50_50.addEventListener("click", () => {
  console.log("btn50_50");
  let divAppCenter = document.getElementById("divAppCenter");
  let divAppRight = document.getElementById("divAppRight");

  divAppCenter.setAttribute("visibility", "collapse");
  // divAppRight.
});

const btnChat = document.getElementById("btnChat");
btnChat.addEventListener("click", () => {
  console.log("btnChat");
});
