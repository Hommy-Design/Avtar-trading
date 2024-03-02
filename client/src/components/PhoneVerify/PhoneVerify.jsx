import React, { useState } from 'react'
import { Dialog, DialogContent, Button } from '@mui/material';
import './Phoneverify.css'
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import { auth } from "./firebase.config";
import { toast } from 'react-toastify';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../redux/slices/userSlice';
import { userloginSuccess } from '../../redux/slices/userlogin';
import { useNavigate } from 'react-router-dom';
import { register } from '../../redux/actions/userAction';

const PhoneVerify = ({ open, onClose }) => {

  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [aa, setaa] = useState(null);

  let dispatch = useDispatch()

  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.user);


  function onSignup() {
    // setLoading(true);
    // onCaptchVerify();

const userfrm = new FormData();
userfrm.append('name', name)
userfrm.append('email', email)
userfrm.append('password', password)

console.log(Object.fromEntries(userfrm));

dispatch(register(email, name, password))



      setShowOTP(true)


    // const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    // signInWithPhoneNumber(auth, formatPh, appVerifier)
    //   .then((confirmationResult) => {
    //     window.confirmationResult = confirmationResult;
    //     setLoading(false);
    //     setShowOTP(true);
    //     toast.success("OTP sended successfully!");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoading(false);
    //   });
  }


  function onOTPVerify() {
    if (otp === '123456') {
      dispatch(userloginSuccess())
    }
    // setLoading(true);

    // window.confirmationResult
    //   .confirm(otp)
    //   .then(async (res) => {
    //     console.log(res);
    //     setUser(res.user);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setLoading(false);
    //   });
  }



  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogContent style={{ height: '90vh' }}>
          <section className="bg-emerald-500 flex items-center justify-center h-screen">
            <div>
              {/* <Toaster toastOptions={{ duration: 4000 }} /> */}
              <div id="recaptcha-container"></div>
              {aa? (
                <h2 className="text-center text-white font-medium text-2xl">
                  👍Login Success
                </h2>
              ) : (
                <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
                  <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
                    Welcome to <br /> GLOBAL NEST
                  </h1>
                  {showOTP ? (
                    <>
                      <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                        <BsFillShieldLockFill size={30} />
                      </div>
                      <label
                        htmlFor="otp"
                        className="font-bold text-xl text-white text-center"
                      >
                        Enter your OTP
                      </label>
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        OTPLength={6}
                        otpType="number"
                        disabled={false}
                        autoFocus
                        className="opt-container "
                      ></OtpInput>
                      <button
                        onClick={onOTPVerify}
                        className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                      >
                        {loading && (
                          <CgSpinner size={20} className="mt-1 animate-spin" />
                        )}
                        <span>Verify OTP</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                        <BsTelephoneFill size={30} />
                      </div>
                      <input type="text" name='name' placeholder='Enter Your Name' className='h-10 rounded-sm' onChange={(e) => setName(e.target.value)} />
                      <PhoneInput country={"in"} value={email} onChange={setEmail} />
                      <input type="password" name='password' placeholder='Enter Your Password' className='h-10 rounded-sm' onChange={(e) => setPassword(e.target.value)} />

                      <button
                        onClick={onSignup}
                        className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                      >
                        {loading && (
                          <CgSpinner size={20} className="mt-1 animate-spin" />
                        )}
                        <span>Send code via SMS</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </section>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PhoneVerify