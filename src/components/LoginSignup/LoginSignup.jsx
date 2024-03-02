import React, { useEffect, useState } from 'react'
import "./LoginSignup.css"

import userIcon from '/assets/person.png'
import emailIcon from '/assets/email.png'
import passwordIcon from '/assets/password.png'
import { login, register } from '../../redux/actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LoginSignup = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { isAuthenticated, user } = useSelector((state) => state.user);


    const [action, setAction] = useState('Login')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

   let SubmitHandler = (e)=>{
    e.preventDefault()
    if(action==='Sign Up'){

        dispatch(register(email, name, password))
    }

    if(action==='Login'){
        console.log(email, password);

        dispatch(login(email, password))
    }

  



   }

   useEffect(()=>{
    if(isAuthenticated){
        navigate('/admin')
    }
   },[isAuthenticated])


    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>

            </div>

            <div className='inputs'>
                {action === 'Login' ? <div></div> : <div className="input">
                    <img src={userIcon} alt="" />
                    <input type="text" placeholder='Name' required onChange={(e)=>setName(e.target.value)} />
                </div>}
                <div className="input">
                    <img src={emailIcon} alt="" />
                    <input type="email" placeholder='Email Id' required onChange={(e)=>setEmail(e.target.value)}  />
                </div>
                <div className="input">
                    <img src={passwordIcon} alt="" />
                    <input type="password" placeholder='Password' required onChange={(e)=>setPassword(e.target.value)}  />
                </div>

            </div>
            {action === 'Sign Up' ? <div></div> : <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
            }
           
            
            <div className="submit-container">
                <div className='submit' onClick={SubmitHandler}>
                    Submit
                </div>
               
            </div>

            {action === 'Sign Up' ? <div className="forgot-password">Already Have acount? <span onClick={() => { setAction('Login') }}>Click Here!</span></div>: <div className="forgot-password">Create Account? <span onClick={() => { setAction('Sign Up') }}>Click Here!</span></div>
            }

        </div>
    )
}

export default LoginSignup