import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogInPage from './LogInPage';
import ChatBotPage from './ChatBotPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/LogIn-Page" element={<LogInPage />} />
                <Route path="/ChatBot-Page" element={<ChatBotPage />} />
            </Routes>
        </Router>
    );
}

export default App;