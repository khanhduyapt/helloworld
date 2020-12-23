function stringCurruncyToFloat(strValue) {
  const floatVal = parseFloat(strValue.replaceAll(",", ""));
  return floatVal;
}

function stringToDate(strValue) {
  if (strValue && strValue.toUpperCase() !== "null".toUpperCase()) {
    return new Date(strValue);
  } else {
    return null;
  }
}

export { stringCurruncyToFloat, stringToDate };
