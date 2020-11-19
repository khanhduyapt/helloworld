const { randomInt } = require("crypto");
const { render } = require("ejs");
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

const {
  FS_COLLECTION_NAME,
  FS_ROLE,
} = require("./firestore/firestore_collections");
const FirestoreClient = require("./firestore/firestoreClient");
const { initData } = require("./firestore/InsertDummyData");
const { json } = require("express");
// initData();

app.get("/", (req, res) => {
  //res.render("dashboard");
  res.render("Online_class", {
    roomId: "lop12A3",
    userId: randomInt(1000),
  });
});

app.get("/api/students", async (req, res) => {
  FirestoreClient.getCollectionByPath(
    FS_COLLECTION_NAME.LANGUAGE_CENTERS +
      "/" +
      "pantado" +
      "/" +
      FS_COLLECTION_NAME.STUDENTS +
      "/"
  ).then((data) => {
    res.json(data);
  });

  //console.log(students);

  // students.forEach((doc) => {
  //   console.log(doc.data());
  // });

  //res.json(students());
});

/*
//#region permissions
// const { projects } = require("./permissions/dummyData");
// const { authUser } = require("./permissions/basicAuth");
// const {
//   canViewProject,
//   canDeleteProject,
//   scopedProjects,
// } = require("./permissions/Courses");

// router.get("/", authUser, (req, res) => {
//   res.json(scopedProjects(req.user, projects));
// });

// router.get("/:projectId", setProject, authUser, authGetProject, (req, res) => {
//   res.json(req.project);
// });

// router.delete(
//   "/:projectId",
//   setProject,
//   authUser,
//   authDeleteProject,
//   (req, res) => {
//     res.send("Deleted Project");
//   }
// );

// function setProject(req, res, next) {
//   const projectId = parseInt(req.params.projectId);
//   req.project = projects.find((project) => project.id === projectId);

//   if (req.project == null) {
//     res.status(404);
//     return res.send("Project not found");
//   }
//   next();
// }

// function authGetProject(req, res, next) {
//   if (!canViewProject(req.user, req.project)) {
//     res.status(401);
//     return res.send("Not Allowed");
//   }

//   next();
// }

// function authDeleteProject(req, res, next) {
//   if (!canDeleteProject(req.user, req.project)) {
//     res.status(401);
//     return res.send("Not Allowed");
//   }

//   next();
// }

//#endregion
//======================================================================
*/
// VD
const roomOfLoginUser = "Lop12a3";
const userId = randomInt(1000);
app.get("/", (req, res) => {
  res.render("Online_class", {
    roomId: roomOfLoginUser,
    userId: randomInt(1000),
  });
});

const users = {};
const socketToRoom = {};
io.on("connection", (socket) => {
  console.log("Co nguoi ket noi");

  //#region Messages
  socket.on("client_emit_message", (data) => {
    console.log("message:" + data);
    socket.broadcast.emit("server_postcard_message", data);
  });
  //#endregion

  //#region JOIN ROOM
  socket.on("step1_new_client_join_room", (data) => {
    console.log("step1_new_client_join_room" + JSON.stringify(data));

    const roomID = data.roomId;
    if (users[roomID]) {
      const length = users[roomID].length;
      if (length > 2) {
        socket.emit("room full");
        console.log("room full");
        return;
      }

      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);
    console.log("    usersInThisRoom:", JSON.stringify(usersInThisRoom));

    // sending to all clients, including sender
    io.sockets.emit("step2_server_notice_all_users", usersInThisRoom);
  });

  socket.on("step3_client_sending_signal_one_by_one", (payload) => {
    console.log(
      `step3: sending signal-to: ${payload.userToSignal} has ${payload.callerID} joined.`
    );
    io.to(payload.userToSignal).emit("step4_server_emit_has_user_joined", {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  });

  socket.on("step5_client_returning_signal", (payload) => {
    console.log("step5_client_returning_signal :", payload.callerID);
    io.to(payload.callerID).emit("step6_server_receiving_returned_signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });

  socket.on("disconnect", () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter((id) => id !== socket.id);
      users[roomID] = room;
      console.log("disconnect:", socket.id);

      // sending to all clients
      io.sockets.emit("step7_server_notice_disconnect", socket.id);
    }
  });
  //#endregion
});

server.listen(8080);
console.log("http://localhost:" + 8080);
