const Qactions = ({ icon, text, prompt, setMessage, handleSend }) => {
  return (
    <div 
    onClick={()=>{
    setMessage(prompt);
    handleSend(prompt);
    }}
    className="flex justify-center items-center gap-1.5 p-4 bg-gray-100 rounded-md shadow-lg">
      <span className="text-primary text-sm">{icon}</span>
      <p className="text-xs">{text}</p>
    </div>
  );
};

export default Qactions;
