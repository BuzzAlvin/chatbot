import { useNavigate } from "react-router-dom";
import { MdCheckBox, MdOutlineWatchLater } from "react-icons/md";
import { IoWatch } from "react-icons/io5";
import { FiArrowRight, FiMessageCircle } from "react-icons/fi";
import { LuShieldCheck} from "react-icons/lu";


const features = [
  {
    icon: <IoWatch />,
    text: "Quick answers to your questions",
  },
  {
    icon: <MdCheckBox />,
    text: "Accurate and reliable information",
  },
  {
    icon: <MdOutlineWatchLater />,
    text: "Available 24/7 to serve you",
  },
];

const Home = () => {
    const navigate = useNavigate();

  return (
    <div className="bg-gray-100 flex flex-col justify-between px-2 sm:px-4 py-2 h-dvh">
        {/* Header */}
      <div className="flex items-center justify-between gap-8 w-full px-4">
        <img src="/OIRS LOGO.png" alt="Oirs logo" className="w-20"/>
        <div className="flex flex-col items-center justify-center font-primary text-center">
          <h1 className="text-primary font-extrabold text-base sm:text-lg [text-shadow:0_2px_3px_rgba(0,0,0,0.3),0_6px_10px_rgba(0,0,0,0.2)]">OIRS</h1>
          <p className="font-medium text-primary text-xs sm:text-sm tracking-tight leading-tight [text-shadow:0_4px_6px_rgba(0,0,0,0.2)]">OSUN INTERNAL REVENUE SERVICE</p>
        </div>
      </div>

      {/* Middle */}
      <div className="flex flex-col items-center justify-center font-primary mt-4">
        <img src="/illustration.png" alt="OIRS Assistant" className="w-30"/>
        <p className="font-semibold text-primary text-base sm:text-lg">Welcome to OIRS Assistant</p>
        <p className="text-sm sm:text-base w-full max-w-[350px] text-center text-gray-800">
          Your official AI assistant for all your tax-related informations and
          services
        </p>
      </div>
      {/* Features */}
      <div className="flex flex-col gap-3 my-4 px-4 sm:px-3">
        {features.map((item, index) => (
            <span 
            key={index} 
            className="flex items-center gap-2 text-sm sm:text-base text-gray-800">
              {item.icon}
              <p className="text-sm sm:text-base">{item.text}</p>
            </span>
        ))}
      </div>
        {/* Footer/ Button */}
      <div className="flex flex-col items-center px-4 sm:px-3">
        <button 
        onClick={() => navigate("/chat")}
        className="flex items-center justify-center gap-2.5 text-sm sm:text-base w-full bg-primary text-gray-200 px-2 py-3 rounded-full mb-2.5">
          <FiMessageCircle className="text-base sm:text-lg"/>
          Start Chat
          <FiArrowRight className="text-base sm:text-lg" />
        </button>

        <span className="flex items-center gap-2 text-xs sm:text-sm text-gray-800">
          <LuShieldCheck className="text-base sm:text-lg" /> Your data is safe with us
        </span>
      </div>
    </div>
  );
};

export default Home;
