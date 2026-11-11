const HIDDEN_MESSAGE_IDS = new Set([
  11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 30, 31, 33, 34, 35, 36, 37,
  38, 39, 41, 42, 43, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 57, 58, 59, 60, 61, 62, 63, 64, 65,
  66, 67, 69, 70, 71, 72, 73, 74, 75, 76, 78, 79, 80, 81, 82, 84, 85, 87, 88, 89, 91, 92, 93, 94,
  95, 96, 100, 101, 102, 103, 104, 106, 107, 108, 109, 110, 111, 112, 114, 116, 119, 120, 121, 123,
  124, 125, 126, 127, 128, 129, 130, 131, 132, 134, 135, 136, 137, 138, 140, 141, 143, 144,
]);

const BLOCKED_PATTERNS = [
  /\bfuck\b/i,
  /\btamari\b/i,
  /\btari\b/i,
  /\btango\b/i,
  /\btangoo\b/i,
  /\bmasi\b/i,
  /\bben\b/i,
  /\bpiko\b/i,
  /\bbhegu\b/i,
  /\bthane\b/i,
];

export const isMessageHidden = (message) => {
  const searchableText = `${message.text || ""} ${message.sender || ""}`;
  return (
    HIDDEN_MESSAGE_IDS.has(message.id) ||
    BLOCKED_PATTERNS.some((pattern) => pattern.test(searchableText))
  );
};
