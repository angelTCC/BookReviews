import { useState } from "react";
import Button from "react-bootstrap/esm/Button";

export default function Register () {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerFetch = async () => {
    try {
        const response = await fetch('http://127.0.0.1:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // ✅ Correct way
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
        })
        });

        const data = await response.json(); // ✅ Read the response body

        if (response.ok) {
        window.alert(data.message); // e.g., "username registered"
        } else {
        window.alert("Error: " + data.message); // e.g., "choose other username!"
        }
    } catch (error) {
        console.error('Network or server error:', error);
        window.alert('Could not connect to server');
    }
    };

    return (
        <>
            <div className="row">
                <h3>Register</h3>
            </div>

            <div className="row">
                <label>username:</label>
                <input 
                type='text'
                value={ username }
                onChange={ (e) => setUsername(e.target.value) }
                />
            </div>

            <div className="row">
                <label>email:</label>
                <input 
                type='text'
                value={ email }
                onChange={ (e) => setEmail(e.target.value)}
                />
            </div>

            <div className="row">
                <label>password:</label>
                <input 
                type='text'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
            </div>

            <div>
                <Button onClick={ () => registerFetch() }>Register</Button>
            </div>
        </>
    );
};