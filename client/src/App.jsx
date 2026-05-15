import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { useIsMobile } from "./hook/useIsMobile";
import Home from "../pages/Home";
import Chat from "../pages/Chat";

const App = () => {
  const isMobile = useIsMobile();

  // Wait until screen size is detected
  if (isMobile === null) {
    return null;
  }
  return (
    <BrowserRouter>
      <Routes>
         {/* Mobile users see Home */}
        <Route path="/" element={isMobile ? <Home /> : <Navigate to="/chat" replace />} />

        {/* Chat always accessible */}
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;