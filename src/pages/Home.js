import { useState } from "react"
import { MainContextProvider } from "../context/MainContext";

import Landing from "../components/Landing"
import Main from "./Main"

const Home = () => {
    const [visible, setVisible] = useState(true)

    const hideLanding = () => {
        setVisible(!visible)
        console.log(visible)
    }

    return (
        <MainContextProvider>
            <div className="home">
                {visible && <Landing hideLanding={hideLanding} />}
                {!visible && <Main />}
            </div>
        </MainContextProvider>
    )
}

export default Home