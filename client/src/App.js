import './App.css';
import AuthForm from './pages/authForm';
import LoginForm from './pages/loginForm';
import Nav from './components/nav';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="">
      <Nav />
      <Routes>
        <Route path="/register" element={<AuthForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  );
}

export default App;
