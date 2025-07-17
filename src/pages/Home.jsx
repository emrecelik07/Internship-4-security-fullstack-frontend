import Navbar from "../components/Navbar.jsx";
import Header from "../components/Header.jsx";

const Home = () => {
    return (
        <div className="flex flex-col items-center min-vh-100 justify-content-center">
            <Navbar />
            <Header />
        </div>
    )
}
export default Home;