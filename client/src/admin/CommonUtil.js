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

export { strToFloat, strToDate, objToStr, arrayRemove };
