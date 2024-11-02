import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatBotPage.css'; // 스타일 파일

function ChatBotPage() {
    const [userInput, setUserInput] = useState(''); // 사용자 입력 상태
    const [file, setFile] = useState(null);
    const [messages, setMessages] = useState([]); // 채팅 메시지 저장
    const [showFileInput, setShowFileInput] = useState(false); // 파일 입력 필드 표시 여부


    const sendMessage = async () => {
        if (userInput.trim() !== '') {
            // 메시지 전송 코드
            const userMessage = { text: userInput, sender: 'user' };
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            setUserInput(''); // 입력 필드 초기화

            // 높이 초기화
            const chatInput = document.querySelector('.chat-input');
            if (chatInput) {
                chatInput.style.height = '35px'; // 초기 높이로 설정
            }

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

    const toggleFileInput = () => {
        setShowFileInput((prev) => !prev); // 파일 입력 필드 표시 상태 토글
    };

    useEffect(() => {
        const textarea = document.getElementById('chat-input');
        if (textarea) {
            textarea.style.height = 'auto'; // 높이를 초기화
            textarea.style.height = `${Math.min(textarea.scrollHeight, 50)}px`; // 내용에 맞게 높이 조정 (최대 100px)
        }
    }, [userInput]); // userInput이 변경될 때마다 실행

    return (
        <div className="chat-container">
            <div className="chat-header">
                <img src={"/white-chungbuk-mark.png"} alt="Logo" className="header-logo" />
                <h1>충북대학교 시간표 앱<br/>Even Schedule</h1>
            </div>
            <div id="chat-window" className="chat-window" style={{
                height: showFileInput ? 'calc(100vh - 350px)' : 'calc(100vh - 250px)',
                transition: 'height 0.3s ease'
            }}>
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
            <div className="input-area" style={{position: 'relative'}}>
                <div style={{
                    marginBottom: showFileInput ? '100px' : '0',
                    transition: 'margin-bottom 0.3s ease', display: 'flex', alignItems: 'center'
                }}>
                    <button onClick={toggleFileInput} className="file-input-label">
                        {showFileInput ? '-' : '+'}
                    </button>
                    <textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="메세지"
                        className="chat-input"
                        onKeyDown={handleKeyDown} // 엔터 키 감지
                        onInput={(e) => {
                            e.target.style.height = 'auto'; // 높이 초기화
                            e.target.style.height = `${e.target.scrollHeight}px`; // 내용에 맞춰 높이 조정
                        }}
                        style={{resize: 'none', height: 'auto', maxHeight: '90px'}} // 높이 조절
                    />


                    <button onClick={sendMessage} className="send-btn">↑</button>
                </div>
            </div>
        </div>
    );
}

export default ChatBotPage;
