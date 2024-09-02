export function generateCode(length: number): string {
  const choices = "1234567890qwertyuiopasdfghjklzxcvbnm";
  let code = "";
  for (var i = 0; i < length; i++) {
    code += choices.charAt(Math.floor(Math.random() * choices.length));
  }

  return code;
}
