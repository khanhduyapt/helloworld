/*
const $ = require("jquery");
const Peer = require("simple-peer");
const io = require("socket.io-client");
const socket = io("/");

var peers = [];
var peersRef = [];
const videoConstraints = {
  height: 600,
  width: 800,
};
navigator.mediaDevices
  .getUserMedia({ video: videoConstraints, audio: true })
  .then((stream) => {
    const video = document.createElement("video");
    addStudentVideoStream(video, stream);

    socket.emit("step1_new_client_join_room", {
      roomId: $("#roomId").val(),
      userId: socket.id,
    });

    socket.on("step2_server_notice_all_users", (users) => {
      console.log(users);
      const peersFromServer = [];
      users.forEach((userID) => {
        console.log(userID);
        const newPeer = createPeer(userID, socket.id, stream);
        peersFromServer.push(newPeer);

        peersRef.push({
          peerID: userID,
          peer: newPeer,
        });
        console.log("peersRef pushed");
      });

      peers = [...peersFromServer];
      console.log(peers);
    });

    socket.on("step4_server_emit_has_user_joined", (payload) => {
      console.log("step4_server_emit_has_user_joined");
      const peer = addPeer(payload.signal, payload.callerID, stream);
      peersRef.push({
        peerID: payload.callerID,
        peer,
      });

      peers = [...peers, peer];
      console.log("add to peers");
    });

    socket.on("step6_server_receiving_returned_signal", (payload) => {
      console.log("step6_server_receiving_returned_signal");

      const item = peersRef.find((p) => p.peerID === payload.id);
      if (item === null) return;

      item.peer.signal(payload.signal);
      item.peer.on("stream", (stream) => {
        var video = document.createElement("video");

        addTeacherVideoStream(video, stream);

        console.log(payload.id + "streaming...");
      });
    });

    socket.on("step7_server_notice_disconnect", (userId) => {
      $("#" + userId).remove();
    });
  });
//==================================

function addTeacherVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  video.className = "video_600_800";
  $("#teacherVideoGrid").append(video);
}

function addStudentVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  video.className = "video_300_400";
  $("#studentVideoGrid").append(video);
}

function createPeer(userToSignal, callerID, stream) {
  const newPeer = new Peer({
    initiator: true,
    trickle: false,
    stream,
  });

  newPeer.on("signal", (signal) => {
    console.log(
      "createPeer=>signal=>sending signal to:",
      userToSignal,
      callerID
    );
    socket.emit("step3_client_sending_signal_one_by_one", {
      userToSignal,
      callerID,
      signal,
    });
  });

  return newPeer;
}

function addPeer(incomingSignal, callerID, stream) {
  const peer = new Peer({
    initiator: false,
    trickle: false,
    stream,
  });

  peer.on("signal", (signal) => {
    socket.emit("step5_client_returning_signal", { signal, callerID });
  });

  peer.signal(incomingSignal);

  return peer;
}

console.log("webpack run OK");
*/
