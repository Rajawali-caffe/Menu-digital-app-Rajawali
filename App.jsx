import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Customer from "./Customer";
import Admin from "./Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Customer />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
import AdminPanel from "./Admin"

function App() {
  return (
    <div>
      <h1 className="text-2xl font-bold p-4">Panel Admin</h1>
      <AdminPanel />
    </div>
  )
}

export default App
