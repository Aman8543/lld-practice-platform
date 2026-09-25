import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProblemDetails from "./pages/ProblemDetails";
import Practice from "./pages/Practice";
import Feedback from "./pages/Feedback";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/problem/:id"
          element={<ProblemDetails />}
        />

        <Route
          path="/practice/:attemptId"
          element={<Practice />}
        />

        <Route
          path="/feedback/:attemptId"
          element={<Feedback />}
        />

        <Route
          path="/history"
          element={<History />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;