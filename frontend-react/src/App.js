import Register from './components/Register';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="landingpage" element={<LandingPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="" element={<LandingPage />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;