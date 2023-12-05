import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import "../styles/SubHeader.scss"
import { useMainContext } from "../hooks/useMainContext"

import HeaderItem from "./HeaderItem";

const SubHeader = () => {
    const { currentPage, setCurrentPage, lastPortfolio, setLastPortfolio } = useMainContext()
    const [ focusedPage, setFocusedPage ] = useState()

    const t1 = useRef();
    const subHeader = useRef();

    const pageFocus = ( newPage ) => {
        if(newPage === ""){
            return;
        }
        switch(newPage) {
            case "PortfolioWeb":
                setFocusedPage("WebDesign");
                break;
            case "PortfolioGraphic":
                setFocusedPage("GraphicDesign");
                break;
            default:
                setFocusedPage("");
                break;
        }
    }

    useLayoutEffect(() => {
        const focusPage = () => {
            if(lastPortfolio === "PortfolioGraphic"){
                setFocusedPage("GraphicDesign")
            } else if (lastPortfolio === "PortfolioWeb"){
                setFocusedPage("WebDesign")
            }
        }

        let ctx = gsap.context(() => {
            t1.current = gsap.timeline()
                .to(".headerItem", {
                    opacity: "100%",
                    duration: "1.3"
                })
                .to(".subHeader", {
                    duration: 0,
                    onComplete: () => focusPage() 
                }, "-=0.5")
        }, subHeader);
        return () => ctx.revert();
    }, []);

    return(
        <div ref={subHeader} className="subHeaderWrapper">
            <style>
                {`
                  .${focusedPage}Text {
                    opacity: 100% !important;
                  }
                  .${focusedPage}Border {
                    width: 100% !important;
                  }
                  .${focusedPage}Square {
                    opacity: 100% !important;
                    transform: translate(5px, -8px) rotate(45deg) !important;
                  }
                `}
            </style>
            <div className="subHeader">
                <HeaderItem itemName={"Web Design"} pageFocus={pageFocus}/>
                <HeaderItem itemName={"Graphic Design"} pageFocus={pageFocus}/>
            </div>
        </div>
    )
}

export default SubHeader;