module.exports = function (io) {
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
      console.log("step1_new_client " + JSON.stringify(data));

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

      if (otherUsersInThisRoom.length > 0) {
        io.to(otherUsersInThisRoom[0]).emit(
          "step2_server_notice_all_users",
          client_socket_id
        );
        io.to(client_socket_id).emit(
          "step2_server_notice_all_users",
          otherUsersInThisRoom[0]
        );
      }
    });

    socket.on("step3_client_sending_signal", (data) => {
      console.log(
        "step3_client_sending signal to: " +
          data.to_socket_id +
          " from: " +
          data.from_socket_id
      );

      io.to(data.to_socket_id).emit("step4_server_emit_has_signal", {
        signal: data.signal,
        callerID: data.from_socket_id,
      });
    });

    socket.on("step5_client_returning_signal", (data) => {
      console.log("step5_client_returning_signal :", data.callerID);
      io.to(data.callerID).emit("step6_server_receiving_returned_signal", {
        signal: data.signal,
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
    //========================================================
    socket.on("screen1_teacher_share_screen", (data) => {
      console.log("screen1_teacher_share_screen");

      const otherUsersInThisRoom = usersInRoom[data.room_id].filter(
        (id) => id !== data.fr_id
      );

      if (otherUsersInThisRoom.length > 0) {
        io.to(data.fr_id).emit(
          "screen2_server_notice_share_screen",
          otherUsersInThisRoom[0]
        );
      }
    });

    socket.on("screen3_client_screen_signal", (data) => {
      console.log("screen3_client_screen_signal");

      io.to(data.to_socket_id).emit("screen4_server_emit_sceen_signal", {
        signal: data.signal,
        callerID: data.from_socket_id,
      });
    });

    socket.on("screen5_client_returning_sceen_signal", (data) => {
      console.log("screen5_client_returning_sceen_signal :", data.callerID);
      io.to(data.callerID).emit("screen6_server_returned_sceen_signal", {
        signal: data.signal,
        id: socket.id,
      });
    });

    socket.on("screen7_client_ended_share_screen", (data) => {
      console.log("screen7_client_ended_share_screen", data);
      io.sockets.emit("screen7_server_ended_share_screen", {
        fr_id: data.fr_id,
      });
    });

    //#endregion
  });
};
