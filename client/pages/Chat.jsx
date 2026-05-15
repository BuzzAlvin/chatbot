import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "../src/hook/useIsMobile";
import Mobile from "../src/components/Mobile";
import Desktop from "../src/components/Desktop";

const Chat = () => {
  //ismobile hooks
  const isMobile = useIsMobile();

  /* input text */
  const [message, setMessage] = useState("");
  /* chat storage */
  const [messages, setMessages] = useState([]);
  //Loading state
  const [loading, setLoading] = useState(false);

  //Auto Scroll to Latest Message
  const chatContainerRef = useRef();

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    const loadGreeting = async () => {
      if (isMobile === null) return;

      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isGreeting: true,
        }),
      });

      const data = await res.json();

      setMessages([
        {
          text: data.reply,
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),

          showQuickActions: true,
        },
      ]);
    };

    loadGreeting();
  }, [isMobile]);

  //Bot is typing Effect...
  const botTyping = {
    text: "",
    sender: "bot",
    loading: true,
  };

  //Mock Bot
  const handleSend = async (customMessage = null) => {
    // use quick action prompt OR typed message
    const finalMessage = customMessage || message;

    if (!finalMessage.trim()) return;

    //user message
    const userMessage = {
      text: finalMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    //show user message immediately after send
    setMessages((prev) => [...prev, userMessage, botTyping]);

    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("https://irs-chatbot.onrender.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message: finalMessage,
          history: messages,
        }),
      });

      if (!res.ok) {
        throw new Error("Server failed");
      }

      const data = await res.json();

      //bot message
      const botReply = {
        text: data.reply,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => prev.filter((m) => !m.loading).concat(botReply));
    } catch (error) {
      console.log(error);

      //error message from the server
      const errorMessage = {
        text: "⚠️ Unable to connect. Please check your internet connection or try again shortly.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) =>
        prev.filter((m) => !m.loading).concat(errorMessage),
      );
    }

    setLoading(false);
  };

  return (
    <>
      <div className="block md:hidden">
        <Mobile
          message={message}
          setMessage={setMessage}
          messages={messages}
          handleSend={handleSend}
          chatContainerRef={chatContainerRef}
          loading={loading}
        />
      </div>

      <div className="hidden md:block">
        <Desktop
          message={message}
          setMessage={setMessage}
          messages={messages}
          handleSend={handleSend}
          chatContainerRef={chatContainerRef}
          loading={loading}
        />
      </div>
    </>
  );
};

export default Chat;
