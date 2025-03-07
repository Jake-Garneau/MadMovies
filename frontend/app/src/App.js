import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import LanguageSelect from "./pages/LanguageSelect";
import GenreSelect from "./pages/GenreSelect";
import RuntimeSelect from "./pages/RuntimeSelect";
import ReleaseDateSelect from "./pages/ReleaseDateSelect";
import BudgetSelect from "./pages/BudgetSelect";
import Result from "./pages/Result";
import { QuizProvider } from "./contexts/QuizContext";
import { useEffect } from "react";

function Reload() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  return null;
}

function App() {
  return (
    <QuizProvider>
      <BrowserRouter>
        <Reload />
        {}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/language" element={<LanguageSelect />} />
          <Route path="/genre" element={<GenreSelect />} />
          <Route path="/era" element={<ReleaseDateSelect />} />
          <Route path="/runtime" element={<RuntimeSelect />} />
          <Route path="/budget" element={<BudgetSelect />} />
          <Route path="/result" element={<Result />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </QuizProvider>
  );
}
export default App;
