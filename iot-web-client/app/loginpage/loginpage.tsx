'use client'

import { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import  io  from "socket.io-client";

const socket = io("http://localhost:4000");

export default function LoginPage() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (!username) return alert("Chưa nhập tên đăng nhập");
        if (!password) return alert("Chưa nhập mật khẩu");

        if (username === "admin" && password === "1234") {
        localStorage.setItem("username", "true");
        router.push("/dashboard");
        } else {
        alert("Sai tên đăng nhập hoặc mật khẩu");
        }
    };
    return (
    <div style={{ padding: 20 }}>
        <h1>🔐 Đăng nhập</h1>
        <div>   
            <input
                type="text"
                placeholder="Tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Đăng nhập</button>
        </div>
    </div>
    );
}

