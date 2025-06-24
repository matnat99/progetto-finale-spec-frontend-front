import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/Homepage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import ComparePage from "./pages/ComparePage";
// import FavoritesPage from "./pages/FavoritesPage";

// Context
import { CompareProvider } from "./context/CompareContext.jsx";

export default function App() {
  return (
    <CompareProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/videogames/:id" element={<DetailPage />} />
          <Route path="/compare" element={<ComparePage />} />
          {/* <Route path="/favorites" element={<FavoritesPage />} /> */}
        </Routes>
      </BrowserRouter>
    </CompareProvider>
  );
}
