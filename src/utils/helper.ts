export function truncate(
  text: string,
  startChar: number,
  endChar: number,
  maxLength: number
) {
  if (text.length > maxLength) {
    let start = text.substring(0, startChar);
    let end = text.substring(text.length - endChar, text.length);
    while (start.length + end.length < maxLength) {
      start = start + ".";
    }
    return start + end;
  }
  return text;
}

export function errorMessage(err: any) {
  const convertedError = err as any;
  if (convertedError.reason) {
    return convertedError.reason;
  }
  else {
    return "Unknown error"
  }
}
