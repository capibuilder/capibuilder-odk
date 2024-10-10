export function generateRandomId(length: number) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  let randomId = "";

  for (let i = 0; i < length; i++) {
    randomId += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return randomId;
}
