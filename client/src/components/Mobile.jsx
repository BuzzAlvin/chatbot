import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bg from "/src/assets/Chat page image.png";
import Avatar from "/src/components/Avatar";
import Qactions from "/src/components/Qactions";
import ChatBubble from "/src/components/ChatBubble";
import { GoDotFill } from "react-icons/go";
import { FiArrowLeft, FiLock } from "react-icons/fi";
import { IoPaperPlane } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
import {
  LuBadgeCheck,
  LuFileWarning,
  LuCreditCard,
  LuClipboardList,
} from "react-icons/lu";
const Mobile = ({
  message,
  setMessage,
  messages,
  handleSend,
  chatContainerRef,
  loading,
}) => {
  const navigate = useNavigate();

  /* Quick Actions Tabs */
  const quickActions = [
    {
      icon: <LuClipboardList />,
      text: "Check Tax Status",
      prompt: "How can I check my tax status?",
    },
    {
      icon: <LuCreditCard />,
      text: "Pay my Tax",
      prompt: "How do I pay my tax online?",
    },
    {
      icon: <LuBadgeCheck />,
      text: "Get TCC",
      prompt: "How can I get a tax clearance certificate?",
    },
    {
      icon: <LuFileWarning />,
      text: "File Complaint",
      prompt: "I want to file a complaint.",
    },
    {
      icon: <MdOutlineLocationOn />,
      text: "Office Locations",
      prompt: "Where are the OIRS office locations?",
    },
  ];

  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="flex flex-col bg-cover bg-center h-dvh"
    >
      {/* Nav bar */}
      <div className="bg-primary text-gray-200 flex items-center gap-2 h-16 p-2 rounded-b-2xl mb-3">
        <FiArrowLeft onClick={() => navigate("/")} />
        <div className="flex items-center">
          <Avatar />
          <div className="flex flex-col ml-2">
            <p className="text-sm sm:text-base font-medium ">OIRS Assistant</p>
            <span className="flex items-center text-[10px] sm:text-sm tracking-tight">
              <p className="text-green-400 rounded-full">
                <GoDotFill />
              </p>
              online
            </span>
          </div>
        </div>
      </div>

      {/* Chat Bubbles */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto space-y-2 px-2"
      >
          <div className="flex flex-col gap-3">
    {messages.map((msg, index) => (
      <div key={index}>
        <ChatBubble
          message={msg}
          isUser={msg.sender === "user"}
          loading={loading}
        />

        {/* QUICK ACTIONS ATTACHED TO MESSAGE */}
        {msg.showQuickActions && messages.length <= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="grid grid-cols-2 gap-2 px-2 mb-2"
          >
            {quickActions.map((action, index) => (
              <Qactions
                key={index}
                icon={action.icon}
                text={action.text}
                prompt={action.prompt}
                setMessage={setMessage}
                handleSend={handleSend}
              />
            ))}
          </motion.div>
        )}
      </div>
    ))}
  </div>

      </div>

      {/* Chat Input */}
      <div className="px-4 py-2 mb-2 relative">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="bg-gray-100 w-full text-base font-typing py-3 pl-2 pr-9 border border-gray-200 outline-none focus:ring-1 focus:ring-primary rounded-full"
        />
        <button
          onClick={() => handleSend()}
          type="button"
          className="absolute right-[25px] bottom-[17px] bg-primary text-gray-300 p-2 rounded-full z-10"
        >
          <IoPaperPlane className="text-base" />
        </button>
      </div>

      {/* Footer */}
      <p className="flex items-center justify-center gap-0.5 text-gray-600 text-[9px]">
        <FiLock className="text-primary" />
        Powered by OIRS
      </p>
    </div>
  );
};

export default Mobile;
