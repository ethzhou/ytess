import { useContext, useEffect, useRef, useState } from "react";
import { socket } from "../server/socket";

export default function Home() {
  const inputRef = useRef();

  const [chat, setChat] = useState([]);

  useEffect(() => {
    function handleMessage(text) {
      console.log(`received ${text}`);
      setChat(chat => [...chat, text]);
    }
    socket.on("messageevent", handleMessage);

    return () => {
      socket.removeListener("messageevent", handleMessage);
    };
  }, []);

  return (
    <>
      <ul>
        {chat.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <input ref={inputRef} type="text" />
      <button
        onClick={() => {
          console.log(`emitting ${inputRef.current.value}`);
          socket.emit("meemee", inputRef.current.value);
        }}
      >
        send
      </button>
    </>
  );
}
