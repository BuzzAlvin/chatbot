import bg from "/src/assets/Chat page image.png";
import Avatar from "./Avatar";
import ChatBubble from "./ChatBubble";
import { GoDotFill } from "react-icons/go";
import {
  LuBadgeCheck,
  LuCreditCard,
  LuClipboardList,
  LuShieldCheck,
} from "react-icons/lu";
import { IoHeadset, IoPaperPlane } from "react-icons/io5";
import { FiLock } from "react-icons/fi";
import {
  MdSupportAgent,
  MdOutlineLocationOn,
  MdAccessTimeFilled,
} from "react-icons/md";

const Desktop = ({
  message,
  setMessage,
  messages,
  handleSend,
  chatContainerRef,
  loading
}) => {
  /* Quick Actions Tabs */
  const quickActions = [
    { icon: <LuClipboardList />, text: "Check Tax Status", prompt: "How can I check my tax status?"},
    { icon: <LuCreditCard />, text: "Pay my Tax", prompt: "How do I pay my tax online?"},
    { icon: <LuBadgeCheck />, text: "Get Tax Clearance", prompt: "How can I get a tax clearance certificate?" },
    { icon: <IoHeadset />, text: "File Complaint", prompt: "I want to file a complaint." },
    { icon: <MdOutlineLocationOn />, text: "Office Locations", prompt: "Where are the OIRS office locations?" },
  ];

  const bottomDesign = [
    {
      icon: <LuShieldCheck />,
      title: "Secure & Confidential",
      text: "Your information is protected and confidential.",
    },
    {
      icon: <MdAccessTimeFilled />,
      title: "Always Available",
      text: "We are available to assist you 24/7.",
    },
    {
      icon: <LuBadgeCheck />,
      title: "Accurate Information",
      text: "get accurate and up to date infromation",
    },
    {
      icon: <IoHeadset />,
      title: "Here to Help",
      text: "We are committed to providing you the support",
    },
  ];

  return (
    <div className="flex flex-col h-dvh">
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Nav section */}
        <nav className="font-primary bg-primary text-gray-200 md:w-64 lg:w-72 flex flex-col md:p-2 lg:p-3">
          <div className="flex items-center gap-1 mb-8">
            <img
              src="/OIRS LOGO.png"
              alt="OIRS logo"
              className="md:w-16 lg:w-20 "
            />
            <div className="flex flex-col items-center justify-center font-primary text-center">
              <h1 className=" font-extrabold md:text-base lg:text-lg">OIRS</h1>
              <p className="font-medium text-sm sm:text-base tracking-tight leading-tight w-full">
                OSUN INTERNAL REVENUE SERVICE
              </p>
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex-1">
            <h3 className="md:text-base lg:text-lg tracking-tight font-medium mb-4">
              Quick Actions
            </h3>
            <div className="flex flex-col md:gap-3 lg:gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setMessage(action.prompt);
                    handleSend(action.prompt);
                  }}
                  className="flex items-center gap-3 cursor-pointer hover:text-gray-200/80"
                >
                  <span className="md:text-xl lg:text-2xl">{action.icon}</span>
                  <span className="md:text-sm lg:text-base">{action.text}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-tetiary flex items-center justify-center md:gap-2.5 lg:gap-4 rounded-lg p-2">
            <span className="md:text-2xl lg:text-3xl">
              <MdSupportAgent />
            </span>
            <span>
              <p className="font-semibold md:text-xs lg:text-sm">Need Help?</p>
              <p className="font-medium md:text-xs lg:text-sm">
                24/7 to help you.
              </p>
            </span>
          </div>
        </nav>

        {/* Chat Section */}
        <div
          style={{ backgroundImage: `url(${bg})` }}
          className="w-full bg-cover bg-center shadow-lg flex flex-col min-h-0 "
        >
          {/* Header */}
          <div className="flex md:gap-1.5 lg:gap-2 bg-gray-50 px-8 py-2">
            <Avatar />
            <div>
              <p className="font-medium md:text-sm lg:text-base ">
                OIRS Assistant
              </p>
              <p className="flex items-center md:text-xs lg:text-sm font-secondary">
                <GoDotFill className="text-green-400 rounded-full" /> online
              </p>
            </div>
          </div>

          {/* Chat Bubbles */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto min-h-0 space-y-3 md:px-3 lg:px-4 py-4 scroll-smooth"
          >
            {messages.map((msg, index) => (
              <ChatBubble
                key={index}
                message={msg}
                isUser={msg.sender === "user"}
              />
            ))}
          </div>

          {/* Input Section */}
          <div className="px-4 py-6 mb-4 bg-gray-100 mx-4 rounded-lg">
            <div className="flex items-center md:gap-1.5 lg:gap-2">
              <input
                type="text"
                placeholder="Type your message.."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="bg-white w-full md:text-xs lg:text-sm font-typing py-2 pl-2 pr-9 border border-gray-200 outline-none focus:ring-1 focus:ring-primary rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.05)]"
              />
              <button
                onClick={() => handleSend()}
                className="bg-primary text-gray-300 p-1.5 rounded-full cursor-pointer"
              >
                <IoPaperPlane className="md:text-sm lg:text-base" />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 pl-2 pt-1">
              Press Enter to Send
            </p>
          </div>
        </div>
      </div>
      {/* footer design */}
      <footer className="bg-gray-300  py-3 lg:pr-4 md:pr-3">
        <div className="bg-gray-400 grid grid-cols-4 justify-left gap-6 p-2 rounded-lg ">
          {bottomDesign.map((item, index) => (
            <div
              key={index}
              className={`flex items-center md:gap-2 lg:gap-3 flex-1 pr-4 ${
                index !== bottomDesign.length - 1
                  ? "border-r border-gray-500"
                  : ""
              }`}
            >
              <span className="text-primary md:text-[30px] lg:text-[40px]">
                {item.icon}
              </span>
              <span className="pr-2">
                <p className="text-primary md:text-[11px] lg:text-xs">
                  {item.title}
                </p>
                <p className="text-gray-700 md:text-[11px] lg:text-xs">
                  {item.text}
                </p>
              </span>
            </div>
          ))}
        </div>
      </footer>
      {/* Footer */}
      <p className="flex items-center justify-center gap-0.5 text-gray-600 md:text-[10px] lg:text-xs md:py-0.5 lg:py-1">
        <FiLock className="text-primary" />
        Powered by OIRS
      </p>
    </div>
  );
};

export default Desktop;
