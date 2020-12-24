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

export { strToFloat, strToDate };
