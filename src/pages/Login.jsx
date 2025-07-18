import {Link, useNavigate} from "react-router-dom";
import { assets } from "../assets/assets.js";
import {useContext, useState} from "react";
import axios from "axios";
import {AppContext} from "../context/AppContext.jsx";
import {toast} from "react-toastify";

const Login = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const {backendURL, setIsLoggedIn, getUserData} = useContext(AppContext);
    const navigate = useNavigate();

    const [isCreateAccount, setIsCreateAccount] = useState(false);


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        setLoading(true);
        try {
            if(isCreateAccount){
                //register api
                const response = await axios.post(`${backendURL}/register`, {name, email, password})
                if(response.status === 201){
                    navigate("/")
                    toast.success("User registered successfully.");
                }else {
                    toast.error("Email already exists");
                }

            }else{
                const response = await axios.post(`${backendURL}/login`, {email, password})

                if (response.status === 200){
                    setIsLoggedIn(true)
                    getUserData();
                    navigate("/")
                }else {
                    toast.error("Wrong email or password");
                }
            }
        }catch(err){
            toast.error(err?.response?.data?.message || "Something went wrong");
        }finally{
        setLoading(false);}
    }



    return (
        <div
            className="position-relative min-vh-100 d-flex justify-content-center align-items-center"
            style={{
                background: "linear-gradient(90deg, #6a5af9, #8268f9)",
                border: "none",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "20px",
                    left: "30px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Link
                    to="/"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        fontWeight: "bold",
                        fontSize: "24px",
                        textDecoration: "none",
                        color: "white",
                    }}
                >
                    <img src={assets.logo} alt="logo" height={32} width={32} />
                    <span className="fw-bold fs-4 text-light">Autify</span>
                </Link>
            </div>

            {/*form*/}

            <div className="card px-4 py-4" style={{ maxWidth: "400px", width: "100%" }}>
                <div className="card-header text-center fw-bold fs-5">
                    {isCreateAccount ? "Create Account" : "Login"}
                </div>
                <form className="form-horizontal mt-3" onSubmit={onSubmitHandler}>

                    {
                        isCreateAccount && (

                            <div className="mb-3">
                                <label className="form-label" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Name"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                        )}

                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 d-flex justify-content-between">
                        <Link to="/reset-password" className={"text-decoration-none"}>Forgot your password?</Link>
                    </div>

                    {/*submit button*/}

                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Loading..." : isCreateAccount ? "Sign Up" : "Login"}
                    </button>
                </form>


                <div className="text-center mt-3">
                    <p className="mb-0">
                        {isCreateAccount ? (
                            <>
                                Already have an account?{" "}
                                <span
                                    className="text-decoration-underline"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setIsCreateAccount(false)}
                                >Log in</span>
                            </>
                        ) : (
                            <>
                                Don’t have an account?{" "}
                                <span
                                    className="text-decoration-underline"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setIsCreateAccount(true)}
                                >Sign up</span>
                            </>
                        )}

                    </p>

                </div>

            </div>
        </div>
    );
};

export default Login;
