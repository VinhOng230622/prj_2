"use client";
import { useEffect, useState } from "react";
import  io  from "socket.io-client";

const socket = io("http://localhost:4000");

export default function Home() {
  const [serverMsg, setServerMsg] = useState("");
  const [isConnected, setIsConnected] = useState<boolean>(false);

  function checkConnection() {
    const status = socket.connected;
    setIsConnected(status);
    console.log(status ? "Socket.IO connected" : "Socket.IO not connected");
    return status;
  }


    useEffect(() => {
    const listener = (msg: string) => {
      setServerMsg(msg);
    };

    if (checkConnection()) {
      socket.on("message-from-server", listener);
    }

    return () => {
      socket.off("message-from-server", listener);
    };
  }, []);

  
  return (
    <div style={{ padding: 20 }}>
      <h1>⚙️ Web Client - Socket.IO</h1>

      <button
        onClick={() => socket.emit("message-from-client", "Hello server!")}
      >
        Gửi tin cho Server
      </button>

      <p>
        💬 Tin từ server: <strong>{serverMsg}</strong>
      </p>
    </div>
  );
}
