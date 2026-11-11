import { useEffect, useState } from "react";

export const ScrambleText = () => {
  const fullName = "Shinobi Coder",
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    [firstName, setFirstName] = useState(""),
    [lastName, setLastName] = useState("");
  useEffect(() => {
    let letters = Array(fullName.length).fill(" ");
    letters[0] = "S";
    let position = 1,
      intervalId;
    function scrambleNext() {
      if (position >= fullName.length) {
        clearInterval(intervalId);
        setTimeout(() => {
          letters = Array(fullName.length).fill(" ");
          letters[0] = "S";
          position = 1;
          scrambleNext();
        }, 3e3);
        return;
      }
      if (fullName[position] === " ") {
        letters[position] = " ";
        position++;
        scrambleNext();
        return;
      }
      let ticks = 0;
      intervalId = window.setInterval(() => {
        ticks < 3
          ? ((letters[position] = alphabet[Math.floor(Math.random() * alphabet.length)]),
            updateDisplay(letters),
            ticks++)
          : (clearInterval(intervalId),
            (letters[position] = fullName[position]),
            updateDisplay(letters),
            position++,
            scrambleNext());
      }, 80);
    }
    function updateDisplay(chars) {
      const joined = chars.join(""),
        [first, last] = joined.split(" ");
      setFirstName(first || "");
      setLastName(last || "");
    }
    scrambleNext();
    return () => clearInterval(intervalId);
  }, [fullName]);
  return (
    <span>
      <span className="first-name">{firstName}</span> <span className="last-name">{lastName}</span>
    </span>
  );
};
