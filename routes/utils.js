function getCallerIP(request) {
  var ip =
    request.headers["x-forwarded-for"] ||
    request.connection.remoteAddress ||
    request.socket.remoteAddress ||
    request.connection.socket.remoteAddress;
  ip = ip.split(",")[0];
  ip = ip.split(":").slice(-1); //in case the ip returned in a format: "::ffff:146.xxx.xxx.xxx"
  return String(ip);
}

function getUserName(request) {
  var username = "TODO:getUserName";
  return String(username);
}

module.exports = { getCallerIP, getUserName };
