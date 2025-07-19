import {Link, useNavigate} from "react-router-dom";
import {assets} from "../assets/assets.js";
import { useRef, useState, useContext } from "react";
import {AppContext} from "../context/AppContext.jsx";
import {toast} from "react-toastify";
import axios from "axios";


const EmailVerify = () => {

    const inputsRef = useRef([]);
    const [loading, setLoading] = useState(false);
    const {getUserData, isLoggedIn, userData, backendURL} = useContext(AppContext);
    const navigate = useNavigate();

    const handleInputChange = (e, i) => {
        const value = e.target.value;
        if (!/^\d$/.test(value)) return;

        if (value && i < 5) {
            inputsRef.current[i + 1].focus();
        }
    };

    const handleKeyDown = (e, i) => {
        if (e.key === "Backspace" && !e.target.value && i > 0) {
            inputsRef.current[i - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();

        const paste = e.clipboardData.getData("text");
        const digits = paste.replace(/\D/g, "").slice(0, 6);

        digits.split("").forEach((digit, idx) => {
            if (inputsRef.current[idx]) {
                inputsRef.current[idx].value = digit;
            }
        });

        const nextIndex = digits.length >= 6 ? 5 : digits.length;
        inputsRef.current[nextIndex]?.focus();
    };

    const handleVerify = async () => {
        const otp = inputsRef.current.map(input => input.value).join("");
        if(otp.length != 6){
            toast.error("Please enter a valid email address!");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(backendURL+"/verify-otp", {otp})
            if(response.status === 200){
                toast.success("Verification Successful!");
                getUserData();

                navigate('/');
            }else {
                toast.error("Invalid Verification Code!")
            }
        }catch(error){
            toast.error(error?.response?.data?.message || "Something went wrong.");


        }finally{
            setLoading(false);
        }
    }

    return (
        <div className={"email-verify-container d-flex justify-content-center align-items-center vh-100 position-relative"}
        style={{background: "linear-gradient(90deg, #6a5af9", borderRadius:"none"}}
        >
            <Link to="/" className={"position-absolute top-0 start-0 p-4 d-flex align-items-center gap-2 text-decoration-none"}>
                <img src={assets.logo} alt="logo" height={32} width="32"/>
                <span className="fs-4 fw-semibold text-light">Autify</span>
            </Link>

            <div className="p-5 rounded-4 shadow bg-white" style={{maxWidth:"500px"}}>
                <h4 className={"text-center fw-bold mb-2"}>Email Verify One Time Password</h4>
                <p className={"text-center mb-4"}>
                    Enter the 6-digit code sent to your email
                </p>

                <div className="d-flex justify-content-between gap-2 mb-4 text-center text-white-50 mb-2">
                    {[...Array(6)].map((_, i) => (
                        <input
                            key={i}
                            type="text"
                            maxLength={1}
                            className="form-control text-center fs-4 otp-input"
                            ref={(el) => (inputsRef.current[i] = el)}
                            onChange={(e) => handleInputChange(e, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            onPaste={handlePaste}
                        />
                    ))}
                </div>


                <button className="btn btn-primary w-100 fw-semibold" disabled={loading} onClick={handleVerify}>
                    {loading ? "Verifying..." : "Verify Email"}
                </button>


            </div>

        </div>
    )
}
export default EmailVerify;