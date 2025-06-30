export async function getClipboard() {
  try {
    const text = navigator.clipboard.readText()
    return text;
  } catch (err) {
    console.error("Failed to read clipboard contents: ", err);
    return "";
  }
}