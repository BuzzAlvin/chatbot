import { motion } from "framer-motion";
import Avatar from "./Avatar";

const ChatBubble = ({ message, isUser }) => {
  const isTyping = message.loading;
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className={`flex items-start gap-2 mb-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && <Avatar variant="messenger" />}

      <div
        className={`${isUser ? "bg-tetiary rounded-tr-xs" : "bg-white rounded-tl-xs"} text-gray-800 py-3 px-2 w-fit rounded-xl  max-w-[75%] wrap-break-word text-xs md:text-sm lg:text-base font-secondary`}
      >
        {isTyping ? (
          <div className="flex items-start gap-2">
            <div className="bg-white text-gray-500 py-2 px-3 rounded-xl text-xs sm:text-sm animate-pulse">
              Bot is typing...
            </div>
          </div>
        ) : (
          <>
            <p className="whitespace-pre-line wrap-break-words">
              {message.text.split(" ").map((word, index) => {
                const isLink =
                  word.startsWith("http://") || word.startsWith("https://");

                return isLink ? (
                  <a
                    key={index}
                    href={word}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline break-all"
                  >
                    {word}{" "}
                  </a>
                ) : (
                  word + " "
                );
              })}
            </p>
            <p
              className={`text-xs sm:text-sm text-gray-800 mt-1.5 text-end`}
            >
              {message.timestamp}
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ChatBubble;
