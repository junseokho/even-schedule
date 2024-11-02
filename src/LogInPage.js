import React, { useState } from 'react';
import './LoginPage.css'; // 스타일 파일

function LogInPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [autoLogin, setAutoLogin] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Username:', username, 'Password:', password, 'Remember Me:', rememberMe, 'Auto Login:', autoLogin);
        // 추가적인 로그인 로직은 여기에 구현
    };

    return (
        <div className="login-container">
            <img src="/default-chungbuk-mark.png" alt="Logo" className="logo" />
            <h1 className="main-title">충북대학교 시간표 앱</h1>
            <h2 className="sub-title">이븐 스케줄</h2>
            <form onSubmit={handleLogin} className="login-form">
                <input
                    type="text"
                    placeholder="아이디"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                <div className="checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={autoLogin}
                            onChange={() => setAutoLogin(!autoLogin)}
                        /> 자동 로그인
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                        /> 아이디 저장
                    </label>
                </div>
                <button type="submit" className="login-button">로그인</button>
            </form>
        </div>
    );
}

export default LogInPage;
