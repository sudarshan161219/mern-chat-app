import { Routes, Route, Link } from "react-router-dom";
import { Home, Chat } from "./pages";
const App = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="/">home </Link>
        </li>
        <li>
          <Link to="/chat">chat</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
};

export default App;
