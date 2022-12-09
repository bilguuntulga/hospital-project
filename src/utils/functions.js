export const genderTranslator = (gender) => {
  switch (gender) {
    case "MALE":
      return "Эрэгтэй";
    case "FEMALE":
      return "Эмэгтэй";
    default:
      return "";
  }
};

export function convertToHex(str) {
  var hex = "";
  for (var i = 0; i < str.length; i++) {
    hex += "" + str.charCodeAt(i).toString(16);
  }
  return hex;
}
