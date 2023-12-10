import React, {useState} from 'react'
import axios from 'axios';

import './styles.css'

function Login(
    props
) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleChangePassWord = (e) => {
        setPassword(e.target.value)
    }
    const handleSubmit = (e) => {
        axios.get("http://127.0.0.1:3001/logged_in", {
            params: {
                user:{
                    email: email,
                    password: password
                }
            }
          }, 
        {
            withCredentials: true
        })
        .then(response => {
            if(response.data.logged_in){
                localStorage.setItem('session',response.data.user.email);
                props.history.push("/dashboard");
                props.history.go();
            }
        })
        .catch(error => {
            console.log("Login Error!!!");
        });

        console.log(email, password)
        e.preventDefault();
    }

    return (
        <div className='loginContainer'>
            <div>
                <span className='page' onClick={()=>{props.setToggle(!props.toggle)}}>SignIn...</span>
                <form 
                    className='loginForm'
                    onSubmit={handleSubmit}>
                    
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <input
                            type='email'
                            name='email'
                            placeholder='Email here...'
                            value={email}
                            onChange={(e) => handleChangeEmail(e)}
                            required
                        />

                        <input
                            type='password'
                            name='password'
                            placeholder='Password here...'
                            value={password}
                            onChange={(e) => handleChangePassWord(e)}
                            required
                        />
                    </div>

                    <button className='button' onChange={(e) => handleSubmit(e)}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login