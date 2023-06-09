import { useEffect, useState } from "react";
import axios from "axios";

const Chat = () => {
  const [chats, setChats] = useState([]);

  const authFetch = axios.create({
    baseURL: "http://localhost:5000/api",
  });

  const fetchChat = async () => {
    const { data } = await authFetch.get("/chat");
    console.log(data);
    setChats(data);
  };

  useEffect(() => {
    fetchChat();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default Chat;
