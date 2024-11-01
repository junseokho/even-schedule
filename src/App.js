import axios from 'axios';
import { useEffect } from 'react';

function App() {
    useEffect(() => {
        axios.get('http://localhost:8080/api/users') // 여기에 엔드포인트 사용
            .then(response => {
                console.log(response.data); // 응답 데이터 출력
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <div>
            <h1>Hello, React!</h1>
        </div>
    );
}

export default App;
