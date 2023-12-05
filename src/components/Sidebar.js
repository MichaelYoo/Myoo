import { useMainContext } from "../hooks/useMainContext";
import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap'

import * as pageContents from "./helperFile/pageContents"
import SidebarItem from './SidebarItem';
import '../styles/Sidebar.scss'

const Sidebar = () => {
    const { currentPage, setCurrentPage, lastPortfolio, setLastPortfolio } = useMainContext()
    const [ sideBarItems, setSideBarItems ] = useState(null)
    const [ windowHeight, setWindowHeight ] = useState()
    const [ windowScroll, setWindowScroll ] = useState()
    const [ itemIndex, setItemIndex ] = useState(0)
    const [ offset, setOffset ] = useState(9)

    const sidebar = useRef()
    const tl = useRef();
    const t2 = useRef();

    useLayoutEffect(() => {
        const switchPage = () => {
            switch ( currentPage ) {
                case "AboutMe":
                    setSideBarItems(pageContents.aboutMeItems)
                    break;
                case "PortfolioWeb":
                    setSideBarItems(pageContents.portfolioWebItems)
                    break;
                case "PortfolioGraphic":
                    setSideBarItems(pageContents.portfolioGraphicItems)
                    break;
                case "Hobbies":
                    setSideBarItems(pageContents.hobbiesItems)
                    break;
                default:
                    setSideBarItems(null)
                    break;
            }       
            
        }
        console.log("sideBarItems: " + sideBarItems)
        if(!sideBarItems){
            return;
        }
        else if(currentPage === sideBarItems[0]){
            return;
        } else {
            let ctx = gsap.context(() => {
                t2.current = gsap.timeline()
                    .fromTo(".sidebarItem",
                        {
                        opacity:"60%",
                        x: 0
                        }, 
                        {
                        opacity: "0%",
                        x: 10,
                        duration: 0.5,
                        onComplete: switchPage
                    })
            }, sidebar);
            return () => ctx.revert();
        }
    }, [currentPage])

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            t2.current = gsap.timeline()
                .fromTo(".sidebarItem",
                    {
                        opacity:"0%",
                        x: 10
                    }, 
                    {
                        opacity: "60%",
                        x: 0,
                        stagger: {
                            amount:1
                        }
                    }
                )
        }, sidebar);
        return () => ctx.revert();
    }, [sideBarItems])

    useLayoutEffect(() => {
        setSideBarItems(pageContents.aboutMeItems)

        let ctx = gsap.context(() => {
            tl.current = gsap.timeline()
                .to(".borderBase",{
                    height: "200%",
                    duration: 2,
                    ease: "power4.out"
                })
                .to(".borderOverlay",{
                    height: "calc(75% + 9px)",
                    duration: 2,
                    ease: "power4.out"
                }, "<")
        }, sidebar);
        return () => ctx.revert();
    }, [])

    useLayoutEffect(() => {
        if(!windowHeight){
            console.log("windowHeight not set yet")
            return;
        }

        const handleScroll = () => {
            const position = window.scrollY;
            setWindowScroll(position)

            const index = Math.trunc((Math.round((position/windowHeight) * 10) / 10) + 0.5)
            setItemIndex(index)
        }

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [windowHeight])

    useLayoutEffect(() => {
        setWindowHeight(window.innerHeight);
        console.log("windowHeight -- " + windowHeight);
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
            console.log(windowHeight);
        }

        window.addEventListener("resize", handleResize);
        
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    const refreshPage = () => {
        window.location.reload(false);
    }

    

    return(
        <div ref={sidebar} className="sidebarWrapper">
            <style>
            {sideBarItems && `
                #sidebarItem${itemIndex} {
                    opacity: 100% !important;
                }
                .borderOverlay {
                    height: calc(${75}% + ${(windowScroll/(document.body.scrollHeight-windowHeight))*((windowHeight/2)-18)}px + 8px) !important;
                }
            `}
            </style>
            <div className="logo" onClick={refreshPage}></div>
            <div className="sidebarNavWrapper">
                <div className="sidebarBorder">
                    <div className="borderBase"></div>
                    <div className="borderOverlay">
                        <div className="borderHighlight"></div>
                        <div className="borderSquare"></div>
                    </div>
                </div>
                <div className="sidebar">
                    {sideBarItems && sideBarItems[1].map((sideBarItem, i) => (
                        <SidebarItem key={i} index={i} itemName={sideBarItem}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar;