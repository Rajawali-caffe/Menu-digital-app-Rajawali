import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Customer from "./Customer";
import Admin from "./Admin";

function App() {
  return (
    <Router>
      <Routes>
        {/* Root URL langsung ke Customer */}
        <Route path="/" element={<Customer />} />

        {/* Admin URL terpisah */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
