import {assets} from "../assets/assets.js";
import {useContext} from "react";
import {AppContext} from "../context/AppContext.jsx";

const Header = () => {
    const {userData} = useContext(AppContext);

    return (

        <div className="text-center d-flex flex-column align-items-center justify-content-center py-5 px-3"
        style={{minHeight: '80vh'}}>
            <img className="mb-4" src={assets.logo} alt="logo"  width="120"/>
            <h5 className={"fw-semibold"}>
                Hey {userData ? userData.name : 'Developer'} <span role={"img"} aria-label={"wave"}>👋</span>
            </h5>

            <h1 className={"fw-bold display-5 mb-3"}>Welcome our website</h1>

            <p className="text-muted fs-5 mb-4" style={{maxWidth: '500px'}}>

                Let's start with a quick tour and setup up the authentication!
            </p>

            <button className="btn btn-outline-dark rounded-pill px-4 py-2">
                Get Started
            </button>


        </div>
    )
}
export default Header;