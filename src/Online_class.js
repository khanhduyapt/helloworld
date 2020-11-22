window.onload = function () {
  const $ = require("jquery");
  const io = require("socket.io-client");
  const socket = io("/");

  const Peer = require("simple-peer");

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

  var localPeer;
  const videoConstraints = {
    width: { min: 640, max: 1280 },
    height: { min: 480, max: 720 },
  };
  window.btnTurnOnCameraClick = function () {
    console.log("btnTurnOnCameraClick");

    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: false })
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
      $("#to_socket_id").val = friend_socket_id;
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
      video.setAttribute("id", $("#to_socket_id").val());
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

  //#region Share Screen, peer1 sends screen video to peer2.
  var peer1;
  var peer2;

  window.btnShareScreenClick = function () {
    console.log("btnShareScreenClick");
    navigator.mediaDevices
      .getDisplayMedia({
        video: { width: screen.width, height: screen.height },
        audio: true,
      })
      .then((stream) => {
        var video = document.getElementById("screenVideo");
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", () => {
          video.play();
        });

        socket.emit("screen1_teacher_share_screen", {
          room_id: $("#roomId").val(),
          fr_id: socket.id,
        });
      })
      .catch(() => {});
  };

  socket.on("screen2_server_notice_share_screen", (friend_socket_id) => {
    if (friend_socket_id != socket.id) {
      var screenVideo = document.getElementById("screenVideo");
      console.log("screen2_server_notice_share_screen", friend_socket_id);
      peer1 = new Peer({
        initiator: true,
        trickle: false,
        stream: screenVideo.srcObject,
      });

      peer1.on("signal", (signal) => {
        socket.emit("screen3_client_screen_signal", {
          to_socket_id: friend_socket_id,
          from_socket_id: socket.id,
          signal,
        });
      });
    }
  });

  socket.on("screen4_server_emit_sceen_signal", (payload) => {
    console.log("screen4_server_emit_sceen_signal", payload);

    const peer2 = new Peer({
      initiator: false,
      trickle: false,
    });
    peer2.signal(payload.signal);
    peer2.on("signal", (signal) => {
      socket.emit("screen5_client_returning_sceen_signal", {
        signal,
        callerID: payload.callerID,
      });
    });

    peer2.on("stream", (stream) => {
      var video = document.getElementById("screenVideo");
      video.srcObject = stream;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });

      console.log("peer2 streaming...");
    });
  });

  socket.on("screen6_server_returned_sceen_signal", (payload) => {
    peer1.signal(payload.signal);
  });

  //#endregion Share Screen

  window.btnTurnOffMicClick = function () {
    console.log("btnTurnOffMicClick");
  };

  window.btnEndCoursesClick = function () {
    console.log("btnEndCoursesClick");
  };

  window.btnPeople5050Click = function () {
    console.log("btnPeople5050Click");
    let divVideos = document.getElementById("divVideos");

    if (divVideos.classList.contains("app__right__videoFullScreen")) {
      divVideos.classList.remove("app__right__videoFullScreen");
      divVideos.classList.add("app__right__video");

      document
        .getElementById("img5050")
        .setAttribute("src", "/icons/view_sidebar-24px.svg");
    } else {
      divVideos.classList.remove("app__right__video");
      divVideos.classList.add("app__right__videoFullScreen");

      document
        .getElementById("img5050")
        .setAttribute("src", "/icons/people_outline-24px.svg");
    }
  };

  window.btnShowChatboxClick = function () {
    console.log("btnShowChatboxClick");
    let divChat = document.getElementById("divChat");
    let visibility = divChat.style.visibility;
    if (visibility === "collapse") {
      document
        .getElementById("imgChat")
        .setAttribute("src", "/icons/speaker_notes-24px.svg");

      divChat.style.visibility = "visible";
    } else {
      document
        .getElementById("imgChat")
        .setAttribute("src", "/icons/speaker_notes_off-24px.svg");

      divChat.style.visibility = "collapse";
    }
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
