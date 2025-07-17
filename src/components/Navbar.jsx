import {assets} from "../assets/assets.js";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className="navbar bg-white
        px-5 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">

                <img src={assets.logo} alt="logo" width={32} height={32} />
                <span className={"fw-bold fs-4 text-dark"}>Autify</span>
            </div>

            <div
                className="btn btn-outline-dark rounded-pill px-3"
                onClick={() => navigate("/login")}
            >
                Login <i className="bi bi-arrow-right ms-2"></i>
            </div>

        </div>

)
}
export default Navbar;