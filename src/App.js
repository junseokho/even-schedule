import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Make sure your styles are included

function App() {
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    const [messages, setMessages] = useState([]); // Store chat messages

    useEffect(() => {
        axios.get('http://localhost:8080/api/users') // Example API call
            .then(response => {
                console.log(response.data); // Log response data
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const handleSend = () => {
        if (message) {
            setMessages([...messages, { text: message, sender: 'user' }]);
            setMessage(''); // Clear input after sending
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        // You can add additional logic here for file handling
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <img src={"/white-chungbuk-mark.png"} alt="Logo" className="header-logo" />
                <h1>충북대학교 시간표 앱<br/>Even Schedule</h1>
            </div>
            <div id="chat-window" className="chat-window">
                <div id="chat-output" className="chat-output">
                    {messages.map((msg, index) => (
                        <div key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
                            {msg.text}
                        </div>
                    ))}
                </div>
            </div>
            <div className="input-area">
                <input type="file" id="file-input" className="file-input" onChange={handleFileChange} />
                <label htmlFor="file-input" className="file-input-label">+</label> {/* 더보기 버튼 */}
                <input
                    type="text"
                    id="user-input"
                    placeholder="메세지"
                    className="chat-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} // Update message state
                />
                <button id="send-btn" className="send-btn" onClick={handleSend}>↑</button> {/* 전송 버튼 */}
            </div>
        </div>
    );
}

export default App;
