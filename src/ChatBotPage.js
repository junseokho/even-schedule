import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatBotPage.css'; // 스타일 파일

function ChatBotPage() {
    const [userInput, setUserInput] = useState(''); // 사용자 입력 상태
    const [file, setFile] = useState(null);
    const [messages, setMessages] = useState([]); // 채팅 메시지 저장
    const [showFileInput, setShowFileInput] = useState(false); // 파일 입력 필드 표시 여부
    const [showButtons, setShowButtons] = useState(false); // 버튼 표시 상태

    const sendMessage = async () => {
        if (userInput.trim() !== '') {
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

    const handleChatbotTest = () => {
        const botMessage = { text: '알겠습니다. 다른 추가 정보가 있으신가요?', sender: 'bot' }; // 챗봇 테스트 메시지
        setMessages((prevMessages) => [...prevMessages, botMessage]); // 챗봇 메시지 추가
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // 기본 동작 방지 (줄 바꿈 방지)
            sendMessage(); // 메시지 전송
        }
    };

    const toggleFileInput = () => {
        setShowFileInput((prev) => !prev);
        // 파일 입력 필드가 열릴 때만 버튼을 표시하도록 조정
        if (!showFileInput) {
            setTimeout(() => setShowButtons(true), 200); // 공간이 늘어난 후 버튼 표시
        } else {
            setShowButtons(false); // 공간이 줄어들면 버튼 숨기기
        }
    };

    useEffect(() => {
        // 초기 챗봇 메시지 설정
        const initialBotMessage = { text: '안녕하세요! 시간표 작성 AI, 이븐 스케줄입니다. 어떤 시간표가 필요하신가요?', sender: 'bot' };
        setMessages([initialBotMessage]); // 초기 메시지를 메시지 상태에 추가

        // 예시 API 호출, 필요에 따라 수정
        axios.get('http://localhost:8080/api/users')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);


    return (
        <div className="chat-container">
            <div className="chat-header">
                <img src={"/white-chungbuk-mark.png"} alt="Logo" className="header-logo" />
                <h1>충북대학교 시간표 앱<br />Even Schedule</h1>
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
            <div className="input-area" style={{ position: 'relative' }}>
                <div style={{
                    marginBottom: showFileInput ? '100px' : '0',
                    transition: 'margin-bottom 0.3s ease', display: 'flex', alignItems: 'center'
                }}>
                    <button onClick={toggleFileInput} className="see-more-label">
                        {showFileInput ? '-' : '+'}
                    </button>
                    <textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="메세지"
                        className="chat-input"
                        onKeyDown={handleKeyDown}
                        onInput={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                        style={{ resize: 'none', height: 'auto', maxHeight: '90px' }}
                    />
                    <button onClick={sendMessage} className="send-btn">↑</button>
                </div>
                {showFileInput && showButtons && (
                    <div className="additional-buttons" style={{ opacity: showButtons ? 1 : 0, transition: 'opacity 0.3s ease' }}>
                        <button className="extra-btn" onClick={handleChatbotTest}>챗봇 테스트</button>
                        <button className="extra-btn">버튼 2</button>
                        <button className="extra-btn">버튼 3</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatBotPage;
