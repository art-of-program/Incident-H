import { useState } from 'react';
import Index from './pages/Index.jsx';
import {Route, Routes, Navigate} from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage.jsx';
import RegisterPage from './pages/Auth/RegisterPage.jsx';
import ChatRoomPage from './pages/Chat/ChatRoomPage.jsx';
import MessagePage from './pages/Chat/MessagePage.jsx';
import PremiumModalPage from './pages/Payment/PremiumModalPage.jsx';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
      <div className="app">
        <Routes>
          <Route 
            path="/" 
            element={user ? <ChatRoomPage user={user} setUser={setUser} /> : <Navigate to="/login" />} 
          />
          <Route
            path="/login" 
            element={<LoginPage setUser={setUser} />} 
          />
          <Route 
            path="/register" 
            element={<RegisterPage setUser={setUser} />} 
          />
          <Route 
            path="/chat" 
            element={<ChatRoomPage setUser={setUser} />} 
          />
           <Route 
            path="/premium_account" 
            element={<PremiumModalPage setUser={setUser} />} 
          />
        </Routes>
      </div>
  )
}

export default App
