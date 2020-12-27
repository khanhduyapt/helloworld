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
  if (
    value &&
    value.toUpperCase() !== "null".toUpperCase() &&
    value.toUpperCase() !== "undefined".toUpperCase()
  ) {
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
  var result = new Date(date);
  result.setMonth(result.getMonth() + strToFloat(months));
  return result;
}

function addMinutes(date, minutes) {
  var result = new Date(date);
  result.setMinutes(result.getMinutes() + parseInt(minutes));
  return result;
}

export {
  strToFloat,
  strToDate,
  objToStr,
  arrayRemove,
  addDays,
  addMonths,
  addMinutes,
};
