import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage.jsx";
import DetailPage from "./pages/DetailPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
