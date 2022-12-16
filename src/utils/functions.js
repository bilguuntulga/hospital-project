import { message } from "antd";

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

export const getAPIErrors = (err) => {

  let errors = {
    DOCTOR_IS_RESTING:"Эмч амарч байна",
    PAST_TENSE:"Өнгөрсөн цаг учир үйлдэл хийх боломжгүй",
    DOCTOR_NOTFOUND:"Эмч байхгүй байна",
  }
  return message.error(errors[err?.message || err] || "Алдаа гарлаа");
}