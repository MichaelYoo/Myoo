import { useEffect, useState } from "react";

const SidebarItem = ( {index, itemName} ) => {
    const [ sideBarText, setSideBarText ] = useState()

    const executeScroll = () => {
        const element = document.getElementById(itemName);
        if (element) {
            element.scrollIntoView({behavior: "smooth"});
        }
    }

    useEffect(() => {
        switch(itemName){
            case "BackgroundWeb":
                setSideBarText("Background");
                break;
            case "PinnacleWeb":
                setSideBarText("Pinnacle");
                break;
            case "BackgroundGraphic":
                setSideBarText("Background");
                break;
            case "PinnacleGraphic":
                setSideBarText("Pinnacle");
                break;
            default:
                setSideBarText(itemName);
                return;
        }
    }, [itemName])

    return (
        <span id={"sidebarItem"+index} className="sidebarItem" onClick={() => executeScroll()}>
            {sideBarText}
        </span>
    )
}

export default SidebarItem;