// const CAPITAL_ALPHABETS = "ABCDEFGHJKLMNPQRSTUVWXYZ";

module.exports = function generateRandomString(length = 6) {
  const characters = "abcdefghijkmnopqrstuvwxyz23456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
};
