import { Routes, Route } from "react-router-dom";
import { Home, Chat } from "./pages";
import "./App.css"
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
};

export default App;
