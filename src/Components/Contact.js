import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Contact.css';

export default function App() {
    const { register, handleSubmit } = useForm();
    const [count, setCount] = useState(0);

    const onSubmit = data => {
        window.localStorage.setItem('user' + count, JSON.stringify(data));
        setCount(count + 1);
        console.log(JSON.stringify(data));
    }

    function success() {
        alert('tqveni komentari gagzavnilia');
    }
    return (
        <div className="contact">
            <h2>Contact Us</h2>
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Name" name="Name" ref={register({ required: true, maxLength: 80 })} /><br></br>
                <input type="email" placeholder="Email" name="Email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} /><br></br>
                <textarea name="Text" placeholder="Text" ref={register} /><br></br>
                <button type="submit" id="sub" onClick={success}>Send</button>
            </form><br></br>
            <p>gagzavnilia</p>
        </div>
    );
}