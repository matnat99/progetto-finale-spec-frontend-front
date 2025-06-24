import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
// import ComparePage from "./pages/ComparePage";
// import FavoritesPage from "./pages/FavoritesPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/videogames/:id" element={<DetailPage />} />
        {/* <Route path="/compare" element={<ComparePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />  */}
      </Routes>
    </BrowserRouter>
  );
}
