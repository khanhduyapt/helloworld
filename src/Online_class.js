window.onload = function () {
  const $ = require("jquery");
  const io = require("socket.io-client");
  const socket = io("/");

  const Peer = require("simple-peer");

  var localPeer;
  var friendSocketId;

  const videoConstraints = { width: { exact: 640 }, height: { exact: 480 } };

  var btnSubmitMessage = document.getElementById("btnSubmitMessage");
  btnSubmitMessage.addEventListener("click", function (event) {
    event.preventDefault();
    var message = $("#txtMessage").val();
    $("#app__right__chatContents").append(
      `<p class="chat__receiver"><span class="chat__name">Duydk</span>` +
        message +
        `</p>`
    );
    $("#txtMessage").val("");

    socket.emit("client_emit_message", message);
  });
  socket.on("server_postcard_message", function (data) {
    $("#app__right__chatContents").append(
      `<p class="chat__message"><span class="chat__name">Co giao</span>` +
        data +
        `</p>`
    );
  });

  window.btnTurnOnCameraClick = function () {
    console.log("btnTurnOnCameraClick");

    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        let video = document.getElementById("studentVideo");
        if (!video) video = document.createElement("video");
        video.setAttribute("id", socket.id);
        addStudentVideoStream(video, stream);

        socket.emit("step1_new_client_join_room", {
          room_id: $("#roomId").val(),
          client_socket_id: socket.id,
        });
      });
  };

  socket.on("step2_server_notice_all_users", (friend_socket_id) => {
    if (friend_socket_id != socket.id) {
      friendSocketId = friend_socket_id;
      let myVideo = document.getElementById("studentVideo");

      localPeer = new Peer({
        initiator: true,
        trickle: false,
        stream: myVideo.srcObject,
      });

      localPeer.on("signal", (signal) => {
        socket.emit("step3_client_sending_signal", {
          to_socket_id: friend_socket_id,
          from_socket_id: socket.id,
          signal,
        });
      });
    }
  });

  socket.on("step4_server_emit_has_signal", (payload) => {
    const friendPeer = new Peer({
      initiator: false,
      trickle: false,
    });
    friendPeer.signal(payload.signal);

    console.log("step5_client_returning_signal", payload);

    friendPeer.on("signal", (signal) => {
      socket.emit("step5_client_returning_signal", {
        signal,
        callerID: payload.callerID,
      });
    });

    friendPeer.on("stream", (stream) => {
      var video = document.createElement("video");
      video.setAttribute("id", friendSocketId);
      addTeacherVideoStream(video, stream);

      console.log("friendPeer streaming...");
    });
  });

  socket.on("step6_server_receiving_returned_signal", (payload) => {
    localPeer.signal(payload.signal);
  });

  socket.on("step7_server_notice_disconnect", (userId) => {
    $("#" + userId).remove();
  });

  window.btnTurnOffMicClick = function () {
    console.log("btnTurnOffMicClick");
  };

  window.btnShareScreenClick = function () {
    console.log("btnShareScreenClick");
  };

  window.btnEndCoursesClick = function () {
    console.log("btnEndCoursesClick");
  };

  //------------------------------------------

  //------------------------------------------

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
    video.id = "studentVideo";
    $("#studentVideoGrid").append(video);
  }
};
