function strToFloat(strValue) {
  if (strValue && strValue.length > 0) {
    const floatVal = parseFloat(strValue.replaceAll(",", ""));
    return floatVal;
  } else {
    return 0;
  }
}

function strToDate(strValue) {
  if (strValue && strValue.toUpperCase() !== "null".toUpperCase()) {
    return new Date(strValue);
  } else {
    return null;
  }
}

function objToStr(value) {
  if (value && value !== "null" && value !== "undefined") {
    return value;
  }
  return "";
}

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele !== value;
  });
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function addMonths(date, months) {
  console.log("addMonths", date, months);
  var result = new Date(date);
  result.setMonth(result.getMonth() + tryParseInt(months));
  return result;
}

function tryParseInt(value) {
  const parsed = parseInt(value);
  if (isNaN(parsed)) {
    return 0;
  }
  return parsed;
}

function addMinutes(date, minutes) {
  var result = new Date(date);
  result.setMinutes(result.getMinutes() + tryParseInt(minutes));
  return result;
}

function changeContactNotifyNum(number) {
  let notifice = document.getElementById("admin_contacts_badge");

  const name = "item__badge__hide";
  const arr = notifice.className.split(" ");

  if (number === 0) {
    if (arr.indexOf(name) === -1) {
      notifice.className += " " + name;
    }
  } else {
    if (arr.indexOf(name) !== -1) {
      notifice.className = notifice.className.replaceAll(name, "");
    }

    if (notifice) notifice.innerHTML = number;
  }
}

export {
  changeContactNotifyNum,
  strToFloat,
  strToDate,
  objToStr,
  arrayRemove,
  addDays,
  addMonths,
  addMinutes,
  tryParseInt,
};
