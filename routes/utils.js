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

function objToStr(value) {
  if (
    value &&
    value.toUpperCase() !== "null".toUpperCase() &&
    value.toUpperCase() !== "undefined".toUpperCase()
  ) {
    return value;
  }
  return "";
}

function strToFloat(strValue) {
  const value = objToStr(strValue);

  if (
    value === "" ||
    value.toUpperCase() === "null".toUpperCase() ||
    value.toUpperCase() === "undefined".toUpperCase()
  )
    return 0;

  return parseFloat(value.replace(/,/g, ""));
}

function stringToDate(strValue) {
  if (strValue && strValue.toUpperCase() !== "null".toUpperCase()) {
    return new Date(strValue);
  } else {
    return null;
  }
}

function strToDate(strValue) {
  try {
    if (
      strValue === "" ||
      strValue.toUpperCase() === "null".toUpperCase() ||
      strValue.toUpperCase() === "undefined".toUpperCase()
    ) {
      return null;
    }

    return new Date(strValue);
  } catch (error) {
    return null;
  }
}

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

module.exports = {
  getCallerIP,
  getUserName,
  strToFloat,
  stringToDate,
  strToDate,
  arrayRemove,
  objToStr,
};
