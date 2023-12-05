import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useMainContext } from "../hooks/useMainContext"

import '../styles/Header.scss'
import HeaderItem from './HeaderItem'
import SubHeader from './SubHeader'

const Header = () => {
    const { currentPage, setCurrentPage, lastPortfolio, setLastPortfolio } = useMainContext()
    const [ focusedPage, setFocusedPage ] = useState()
    const [ showSubHeader, setShowSubHeader ] = useState(false)

    const tl = useRef();
    const header = useRef();

    useLayoutEffect(() => {
        const setInitial = ( newPage ) => {
            setFocusedPage(newPage)
            setCurrentPage(newPage)
        }

        let ctx = gsap.context(() => {
            tl.current = gsap.timeline()
                .to(".headerItem", {
                    opacity: "100%",
                    duration: "1.3",
                    stagger: "0.45"
                })
                .to(".headerBorder", {
                    width: "150%",
                    duration: "2",
                    ease: "power4.out"
                }, "<")
                .to(".header", {
                    duration: 0,
                    onComplete: () => setInitial("AboutMe") 
                }, "-=0.9")
        }, header);
        return () => ctx.revert();
    }, []);

    const pageFocus = ( newPage ) => {
        setFocusedPage( newPage )
    }

    useEffect(() => {
        const pageSelector = () => {
            console.log("selecting next page")
            switch(currentPage){
                case "PortfolioWeb":
                    setShowSubHeader(true)
                    break;
                case "PortfolioGraphic":
                    setShowSubHeader(true)
                    break;
                default:
                    setShowSubHeader(false)
                    break;
            }
        }

        console.log("currentPage: " + currentPage)
        if(currentPage !== "PortfolioWeb" && currentPage !== "PortfolioGraphic"){
            console.log(focusedPage)
            if(focusedPage === "Portfolio"){
                console.log("de-animate")
                let ctx = gsap.context(() => {
                    tl.current = gsap.timeline()
                        .fromTo(".subHeader", 
                        {
                            opacity: "100%"
                        },
                        {
                            opacity: "0%",
                            y: 5,
                            duration: "0.4"
                        })
                        .to(".subHeader", {
                            duration: 0,
                            onComplete: pageSelector
                        })
                }, header);
                return () => ctx.revert();
            } else {
                pageSelector()
            }
        } else {
            pageSelector()
        }
    }, [currentPage])

    const headerItems = ["About Me", "Portfolio", "Hobbies"]

    return (
        <div ref={header} className='headerWrapper'>
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
                    transform: translate(5px, 18.5px) rotate(45deg) !important;
                  }
                `}
            </style>
            <div className="header">
                {headerItems && headerItems.map((headerItem, i) => (
                    <HeaderItem key={i} itemName={headerItem} pageFocus={pageFocus}/>
                ))}
            </div>
            {showSubHeader && <SubHeader />}
            <div className="headerBorder"></div>
        </div>
    )
}

export default Header;