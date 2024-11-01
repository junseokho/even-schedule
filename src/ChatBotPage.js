import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatBotPage.css'; // 스타일 파일

function ChatBotPage() {
    const [userInput, setUserInput] = useState(''); // 사용자 입력 상태
    const [file, setFile] = useState(null);
    const [messages, setMessages] = useState([]); // 채팅 메시지 저장

    const sendMessage = async () => {
        if (userInput.trim() !== '') {
            // 사용자 메시지를 추가
            const userMessage = { text: userInput, sender: 'user' };
            setMessages((prevMessages) => [...prevMessages, userMessage]); // 메시지 목록에 추가
            setUserInput(''); // 입력 필드 초기화

            // 백엔드에 사용자 메시지를 전송
            try {
                const response = await axios.post('http://localhost:8080/api/chatbot', { message: userInput });
                const botMessage = { text: response.data.reply, sender: 'bot' }; // 백엔드에서 챗봇 응답 가져오기
                setMessages((prevMessages) => [...prevMessages, botMessage]); // 챗봇의 응답 추가
            } catch (error) {
                console.error('Error fetching bot response:', error);
                // 오류 처리
            }
        }
    };

    useEffect(() => {
        // 예시 API 호출, 필요에 따라 수정
        axios.get('http://localhost:8080/api/users')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // 기본 동작 방지 (줄 바꿈 방지)
            sendMessage(); // 메시지 전송
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        // 파일 처리 로직 추가 가능
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
                        <div className="message" key={index}>
                            <div className={msg.sender === 'user' ? "user-message" : "bot-message"}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="input-area">
                <input type="file" id="file-input" className="file-input" onChange={handleFileChange} />
                <label htmlFor="file-input" className="file-input-label">+</label>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="메세지"
                    className="chat-input"
                    onKeyDown={handleKeyDown} // 엔터 키 감지
                />
                <button onClick={sendMessage} className="send-btn">↑</button>
            </div>
        </div>
    );
}

export default ChatBotPage;
