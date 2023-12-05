import { useMainContext } from "../hooks/useMainContext";
import "../styles/Main.scss"

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AboutMe from "./subPages/AboutMe";
import PortfolioWeb from "./subPages/PortfolioWeb";
import PortfolioGraphic from "./subPages/PortfolioGraphic";
import Hobbies from "./subPages/Hobbies";

const Main = () => {
    const { currentPage, setCurrentPage, lastPortfolio, setLastPortfolio } = useMainContext()
    const pages = {
        "AboutMe": AboutMe,
        "PortfolioWeb": PortfolioWeb,
        "PortfolioGraphic": PortfolioGraphic,
        "Hobbies": Hobbies
    }

    const MainPage = pages[currentPage]
    
    return (
        <div className="main">
            <Header />
            <Sidebar />
            {currentPage && <MainPage />}
        </div>
    )
}

export default Main;