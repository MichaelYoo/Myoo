import { createContext, useState } from "react";

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
    const [ currentPage, setCurrentPage ] = useState()
    const [ lastPortfolio, setLastPortfolio ] = useState("PortfolioWeb")

    return (
        <MainContext.Provider value={{currentPage, setCurrentPage, lastPortfolio, setLastPortfolio}}>
            { children }
        </MainContext.Provider>
    )
}