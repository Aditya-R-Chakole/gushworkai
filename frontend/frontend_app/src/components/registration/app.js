import React, {useState} from 'react'
import axios from 'axios';

import './styles.css';

function Registration(
    props
) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCnf, setPasswordCnf] = useState("");

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleChangePassWord = (e) => {
        setPassword(e.target.value)
    }
    const handleChangePassWordCnf = (e) => {
        setPasswordCnf(e.target.value)
    }

    const handleSubmit = (e) => {
        console.log(">>>>>>> ", props)
        axios.post("http://127.0.0.1:3001/registrations", {
            user:{
                email: email,
                password: password,
                password_confirmation: passwordCnf
            }
        }, 
        {
            withCredentials: true
        })
        .then(response => {
            if(response.data.status === "created"){
                localStorage.setItem('session',response.data.user.email);
                // props.setLoginDetails(response.data.user.email);

                console.log("Registration Successful!!!");
                props.history.push("/dashboard");
                props.history.go();
            }
        })
        .catch(error => {
            console.log("Registration Error!!!");
        });

        console.log(email, password, passwordCnf)
        e.preventDefault();
    }

  return (
    <div className='loginContainer'>
        <div>
            <span className='page' onClick={()=>{props.setToggle(!props.toggle)}}>SignUp...</span>
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

                    <input
                        type='password'
                        name='passwordCnf'
                        placeholder='Re-enter your Password'
                        value={passwordCnf}
                        onChange={(e) => handleChangePassWordCnf(e)}
                        required
                    />
                </div>

                <button onChange={(e) => handleSubmit(e)}>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Registration