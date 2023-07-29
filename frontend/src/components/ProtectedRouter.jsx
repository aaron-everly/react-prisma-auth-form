import { BrowserRouter as Router, Routes, Navigate, Route } from "react-router-dom";
import { Home } from "./Home";
import { RegisterForm } from './RegisterForm';
import { LoginForm } from './LoginForm';

const ProtectedRouter = ({ user, setUser }) => {
  const token = user !== null ? JSON.parse(user).token : false;

  if (!token) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<RegisterForm user={user} setUser={setUser} />} />
          <Route exact path="/login" element={<LoginForm user={user} setUser={setUser} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    )
  }

  if (token) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<RegisterForm user={user} setUser={setUser} />} />
          <Route exact path="/login" element={<LoginForm user={user} setUser={setUser} />} />
          <Route exact path="/home" element={<Home user={user} setUser={setUser} />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    )
  }
};

export default ProtectedRouter;