export const genderTranslator = (gender) => {
  switch (gender) {
    case "MALE":
      return "Эрэгтэй";
    case "FEMALE":
      return "Эмэгтэй";
    default:
      return "GENDER_NOTFOUND";
  }
};
