import { useState } from "react";
import { useMainContext } from "../hooks/useMainContext";

const HeaderItem = ( {itemName, pageFocus} ) => {
    const { currentPage, setCurrentPage, lastPortfolio, setLastPortfolio } = useMainContext()

    const [ opacity, setOpacity ] = useState("60")
    const [ width, setWidth ] = useState("0")
    const [ squareOpacity, setSquareOpacity ] = useState("0")
    const [ squarePosition, setSquarePosition ] = useState("translate(5px, 5px) rotate(45deg)")
    
    const cleanItemName = itemName.replace(" ", "")

    const highlight = ( hover ) => {
        if(hover){
          if(itemName === "Web Design" || itemName === "Graphic Design"){
            setOpacity("100")
            setWidth("100")
            setSquareOpacity("100")
            setSquarePosition("translate(5px, -8px) rotate(45deg)")
          } else {
            setOpacity("100")
            setWidth("100")
            setSquareOpacity("100")
            setSquarePosition("translate(5px, 18.5px) rotate(45deg)")
          }
        } else {
            setOpacity("60")
            setWidth("0")
            setSquareOpacity("0")
            setSquarePosition("translate(5px, 5px) rotate(45deg)")
        }
    }

    const selectPage = ( newPage ) => {
        

        switch(newPage){
            case "Portfolio":
                pageFocus("Portfolio");
                console.log(lastPortfolio + " -- lastPortfolio")
                setCurrentPage(lastPortfolio)
                break;
            case "WebDesign":
                pageFocus("PortfolioWeb");
                setCurrentPage ("PortfolioWeb")
                setLastPortfolio("PortfolioWeb")
                break;
            case "GraphicDesign":
                pageFocus("PortfolioGraphic");
                setCurrentPage("PortfolioGraphic")
                setLastPortfolio("PortfolioGraphic")
                break;
            default:
                pageFocus(newPage)
                setCurrentPage(newPage)
                break;
        }

        window.scrollTo(0, 0);
    }
    
    
    return (
        <span className="headerItem">
            <style>
                {`
                  .${cleanItemName}Text {
                    opacity: ${opacity}%;
                  }
                  .${cleanItemName}Border {
                    width: ${width}%;
                  }
                  .${cleanItemName}Square {
                    opacity: ${squareOpacity}%;
                    transform: ${squarePosition};
                  }
                `}
            </style>
            <div className={`itemText ${cleanItemName}Text`} 
              onMouseEnter={() => highlight(true)} 
              onMouseLeave={() => highlight(false)} 
              onClick={() => selectPage(cleanItemName)}>
                {itemName}
            </div>
            <div className={`itemBorder ${cleanItemName}Border`}></div>
            <div className={`accentSquare ${cleanItemName}Square`}></div>
        </span>
    )
}

export default HeaderItem