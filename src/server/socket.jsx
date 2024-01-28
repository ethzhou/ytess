import io from "socket.io-client";

export const socket = io("ws://localhost:8081"); // dev (use nodemon)
// export const socket = io("https://ytess-backend.onrender.com");  // real
