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
  res.render("index");
  // res.json({ msg: "Hello world" });
});

app.get("/join", (req, res) => {
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
const roomOfLoginUser = "khanhduyapt_lop12a3";
app.get("/", (req, res) => {
  res.render("Online_class", {
    roomId: roomOfLoginUser,
  });
});

const usersInRoom = {};
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

    const room_id = data.room_id;
    const client_socket_id = data.client_socket_id;
    if (usersInRoom[room_id]) {
      const length = usersInRoom[room_id].length;
      if (length > 1) {
        console.log("room full");
        return;
      }

      usersInRoom[room_id].push(client_socket_id);
    } else {
      usersInRoom[room_id] = [client_socket_id];
    }
    socketToRoom[client_socket_id] = room_id;
    const otherUsersInThisRoom = usersInRoom[room_id].filter(
      (id) => id !== client_socket_id
    );

    if (otherUsersInThisRoom) {
      console.log("otherUsers:", JSON.stringify(otherUsersInThisRoom));
      io.sockets.emit("step2_server_notice_all_users", otherUsersInThisRoom);
    }
  });

  socket.on("step3_client_sending_signal_one_by_one", (payload) => {
    io.to(payload.server_socket_id).emit("step4_server_emit_has_user_joined", {
      signal: payload.signal,
      callerID: payload.client_socket_id,
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
    let room = usersInRoom[roomID];
    if (room) {
      room = room.filter((id) => id !== socket.id);
      usersInRoom[roomID] = room;
      console.log("disconnect:", socket.id);

      // sending to all clients
      io.sockets.emit("step7_server_notice_disconnect", socket.id);
    }
  });
  //#endregion
});
var port = process.env.port || 3001;
server.listen(port);
console.log("http://localhost:" + port);
