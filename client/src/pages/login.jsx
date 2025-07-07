import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';

export default function Login() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginFecht = async () => {
        try {
            const response = await fetch('http://127.0.0.1:3000/customer/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // ✅ Correct way
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
            });

            const data = await response.json(); // ✅ Read the response body

            if (response.ok) {
                window.alert(data.token);
                localStorage.setItem('token', data.token);
            } 
        } catch(error) {
            console.log(error, 'Network error');
            window.alert('Could not connect to server');
        }
    };

    return (
        <>
        <div className='row'>
            <h3>Login</h3>
        </div>
        
        <div className='row'>
            <label>username</label>
            <input
            value={ username }
            onChange={ (e) => setUsername(e.target.value)}
            />

            <label>password</label>
            <input
            value={ password }
            onChange={ (e) => setPassword(e.target.value)}
            />
        </div>

        <div>
            <Button onClick={ () => loginFecht() }>Login</Button>
        </div>

        <div className='row'>
            <p>If you are new user first you need to <u onClick={ () => navigate('/register')}>register</u></p>
        </div>
        </>
    )
}