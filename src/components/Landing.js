import '../styles/Landing.scss';
import { useLayoutEffect, useState, useRef} from "react";
import buttonFaces from "./helperFile/buttonFaces";
import { gsap } from "gsap";

const Landing = ( {hideLanding} ) => {
    const [ growSize, setGrowSize ] = useState(1)
    const [ width, setWidth ] = useState(window.innerWidth)
    const [ height, setHeight ] = useState(window.innerHeight)
    const [ bigShake, setBigShake ] = useState(0)
    const [ smallShake, setSmallShake] = useState(0)
    const [ bigRotate, setBigRotate ] = useState(0)
    const [ smallRotate, setSmallRotate] = useState(0)
    const [ buttonFace, setButtonFace ] = useState("")
    const [ lastButtonVal, setLastButtonVal ] = useState(100)
    const [ shakingLeft, setShakingLeft ] = useState("shakingLeft")
    const [ shakingRight, setShakingRight ] = useState("shakingRight")
    const [ clicked, setClicked ] = useState(false);

    const landing = useRef();
    const tl = useRef();
    useLayoutEffect(() => {
        if (clicked) {
            const ctx = gsap.context(() => {
                tl.current = gsap.timeline()
                .to(".name", {opacity: 0, duration: 0})
                .to(".lineLeft", {rotate: Math.atan(width/height) * (180/Math.PI) + 180, duration: 1, ease: "power3.out"})
                .to(".lineRight", {rotate: Math.atan(width/height) * (180/Math.PI), duration: 1, ease: "power3.out"}, "<")
                .to(".wiperLeft", {strokeDashoffset: -(Math.PI * 50), duration: 1, ease: "power3.out"}, "<")
                .fromTo(".gradient", {background: "radial-gradient(#171717 30%, transparent 81%)"}, {background: "radial-gradient(#171717 30%, transparent 31%)", duration: 0.35, ease: "none"}, "<")
                .to(".delete", {opacity: 0, duration: 0.5, ease: "none" }, "-=0.5")
                .to(".gradient", {scale: 50, duration: 1, ease: "power3.in"}, "<")
                .to(".circle", {opacity: 0, duration: 0, onComplete: hideLanding})
            }, landing);

            return () => ctx.revert();
        }
    }, [clicked, width, height, hideLanding])
    
    const entrySequence = () => {
        const lockRatio = growSize + 0;
        setClicked(true);
        setGrowSize(lockRatio);
        setShakingLeft("");
        setShakingRight("");
    }

    const updateWindowDimensions = () => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    }

    useLayoutEffect(() => {
        function handleResize() {
            updateWindowDimensions();
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useLayoutEffect(() => {
        const handleMouseMove = (ev) => {
            
            var diagonalAngle = Math.atan(width/height);
            var distX = Math.abs(window.innerWidth/2 - ev.clientX);
            var distY = Math.abs(window.innerHeight/2 - ev.clientY);
            console.log(distX, distY);
            var distCenter = Math.sqrt(distX*distX + distY*distY);
            console.log("distCenter: " + distCenter);
            console.log("width, height: " + width + ", " + height)
            var vectorAngle = Math.atan(distX/distY);
            console.log("diagonalAngle, vectorAngle: " + diagonalAngle + ", " + vectorAngle)
            var slope = distY/distX;
            var edgeX = 0;
            var edgeY = 0;
            if (vectorAngle > diagonalAngle) {
                edgeX = width
                edgeY = slope * edgeX
            } else if (vectorAngle < diagonalAngle) {
                edgeY = height
                edgeX = edgeY/slope
            } else {
                edgeX = width
                edgeY = height
            }
            var distEdge = Math.sqrt(edgeX*edgeX + edgeY*edgeY);
            console.log("distEdge: " + distEdge);
            var ratio = distCenter/distEdge;
            console.log("ratio: " + ratio);
            setGrowSize(ratio);
            
            var shake = 1*(ratio);
            var rotate = 10*(ratio);
            setBigShake(shake);
            setSmallShake(shake/2);
            setBigRotate(rotate);
            setSmallRotate(rotate/2);
            console.log("bigShake: " + shake);
            console.log("bigRotate: " + rotate);

            var buttonVal = Math.floor(ratio*20);
            if(buttonVal !== lastButtonVal){
                setButtonFace(buttonFaces[buttonVal])
                setLastButtonVal(buttonVal)
            }
        }
        if(clicked){
            return;
        }
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [height, width, lastButtonVal, clicked])

   
    return (    
        <div ref={landing} className='landing'>
            <style>
                {   
                    `
                    .grow {
                        top: calc(50vh + ${Math.sqrt(width*width + height*height)*(growSize)}px);
                        transform-origin: 6px -${Math.sqrt(width*width + height*height)*(growSize)}px;
                        border-bottom: ${Math.sqrt(width*width + height*height)*(1-growSize)}px solid #FBF5F5;
                    }

                    .wiper {
                        rotate: ${Math.atan(width/height) * (180/Math.PI)+90}deg;
                    }
                    .wiperLeft {
                        stroke-dasharray: ${2 * Math.PI * 50 + 0.5};
                        stroke-dashoffset: 0;
                    }

                    .spinningCircle{
                        height:calc(40vmin + ${300*(growSize)}vmax);
                        width:calc(40vmin + ${300*(growSize)}vmax);
                        top: calc(50vh - 20vmin - ${150*(growSize)}vmax);
                        left: calc(50vw - 20vmin - ${150*(growSize)}vmax);
                        background: linear-gradient(transparent ${100*growSize-10}%, #FBF5F5 ${200*growSize}% ${100-200*growSize}%, transparent ${110-100*growSize}%);
                        animation: spin 400ms linear infinite;
                    }
                    .circleMask{
                        height:calc(40vmin + ${200*(growSize)}vmax - 4px);
                        width:calc(40vmin + ${200*(growSize)}vmax - 4px);
                        top: calc(50vh - 20vmin - ${100*(growSize)}vmax + 2px);
                        left: calc(50vw - 20vmin - ${100*(growSize)}vmax + 2px);
                    }
                    .name{
                        opacity:${200 * (growSize-0.04)}%;
                    }
                    .lineLeft{
                        transform: rotate(calc( atan(${width/height})));
                    }
                    .lineRight{
                        transform: rotate(calc(180deg + atan(${width/height})));
                    }

                    @keyframes spin {
                        0% {transform:rotate(0deg)}
                        100% {transform:rotate(360deg)}
                    }
                    @keyframes shake1 {
                        0% { transform: translate(0, 0) rotate(calc(atan(${width/height})))}
                        10% { transform: translate(${((Math.random()*smallShake)-smallShake/2)}px, ${((Math.random()*smallShake)-smallShake/2)}px) rotate(calc(${((Math.random()*smallRotate)-smallRotate/2)}deg + atan(${width/height})))}
                        20% { transform: translate(${((Math.random()*smallShake)-smallShake/2)}px, ${((Math.random()*smallShake)-smallShake/2)}px) rotate(calc(${((Math.random()*smallRotate)-smallRotate/2)}deg +  atan(${width/height})))}
                        30% { transform: translate(${((Math.random()*bigShake)-bigShake/2)}px, ${((Math.random()*bigShake)-bigShake/2)}px) rotate(calc(${((Math.random()*bigRotate)-bigRotate/2)}deg +  atan(${width/height})))}30% { transform: translate(${((Math.random()*smallShake)-smallShake/2)}px, ${((Math.random()*smallShake)-smallShake/2)}px) rotate(calc(${((Math.random()*smallRotate)-smallRotate/2)}deg +  atan(${width/height})))}
                        40% { transform: translate(${((Math.random()*smallShake)-smallShake/2)}px, ${((Math.random()*smallShake)-smallShake/2)}px) rotate(calc(${((Math.random()*smallRotate)-smallRotate/2)}deg +  atan(${width/height})))}
                        50% { transform: translate(${((Math.random()*smallShake)-smallShake/2)}px, ${((Math.random()*smallShake)-smallShake/2)}px) rotate(calc(${((Math.random()*smallRotate)-smallRotate/2)}deg +  atan(${width/height})))}
                        60% { transform: translate(${((Math.random()*bigShake)-bigShake/2)}px, ${((Math.random()*bigShake)-bigShake/2)}px) rotate(calc(${((Math.random()*bigRotate)-bigRotate/2)}deg +  atan(${width/height})))}
                        70% { transform: translate(${((Math.random()*smallShake)-smallShake/2)}px, ${((Math.random()*smallShake)-smallShake/2)}px) rotate(calc(${((Math.random()*smallRotate)-smallRotate/2)}deg +  atan(${width/height})))}
                        80% { transform: translate(${((Math.random()*smallShake)-smallShake/2)}px, ${((Math.random()*smallShake)-smallShake/2)}px) rotate(calc(${((Math.random()*smallRotate)-smallRotate/2)}deg +  atan(${width/height})))}
                        90% { transform: translate(${((Math.random()*smallShake)-smallShake/2)}px, ${((Math.random()*smallShake)-smallShake/2)}px) rotate(calc(${((Math.random()*smallRotate)-smallRotate/2)}deg +  atan(${width/height})))}
                        100% { transform: translate(0, 0) rotate(atan(${width/height}))}
                    }
                    @keyframes shake2 {
                        0% { transform: translate(0, 0) rotate(calc(180deg + atan(${width/height})))}
                        10% { transform: translate(${((Math.random()*smallShake)-smallShake/2)}px, ${((Math.random()*smallShake)-smallShake/2)}px) rotate(calc(${((Math.random()*smallRotate)-smallRotate/2)}deg + 180deg + atan(${width/height})))}
                        20% { transform: translate(${((Math.random()*smallShake)-smallShake/2)}px, ${((Math.random()*smallShake)-smallShake/2)}px) rotate(calc(${((Math.random()*smallRotate)-smallRotate/2)}deg + 180deg + atan(${width/height})))}
                        30% { transform: translate(${((Math.random()*bigShake)-bigShake/2)}px, ${((Math.random()*bigShake)-bigShake/2)}px) rotate(calc(${((Math.random()*bigRotate)-bigRotate/2)}deg + 180deg + atan(${width/height})))}
                        40% { transform: translate(${((Math.random()*smallShake)-smallShake/2)}px, ${((Math.random()*smallShake)-smallShake/2)}px) rotate(calc(${((Math.random()*smallRotate)-smallRotate/2)}deg + 180deg + atan(${width/height})))}
                        50% { transform: translate(${((Math.random()*smallShake)-smallShake/2)}px, ${((Math.random()*smallShake)-smallShake/2)}px) rotate(calc(${((Math.random()*smallRotate)-smallRotate/2)}deg + 180deg + atan(${width/height})))}
                        60% { transform: translate(${((Math.random()*bigShake)-bigShake/2)}px, ${((Math.random()*bigShake)-bigShake/2)}px) rotate(calc(${((Math.random()*bigRotate)-bigRotate/2)}deg + 180deg + atan(${width/height})))}
                        70% { transform: translate(${((Math.random()*smallShake)-smallShake/2)}px, ${((Math.random()*smallShake)-smallShake/2)}px) rotate(calc(${((Math.random()*smallRotate)-smallRotate/2)}deg + 180deg + atan(${width/height})))}
                        80% { transform: translate(${((Math.random()*smallShake)-smallShake/2)}px, ${((Math.random()*smallShake)-smallShake/2)}px) rotate(calc(${((Math.random()*smallRotate)-smallRotate/2)}deg + 180deg + atan(${width/height})))}
                        90% { transform: translate(${((Math.random()*smallShake)-smallShake/2)}px, ${((Math.random()*smallShake)-smallShake/2)}px) rotate(calc(${((Math.random()*smallRotate)-smallRotate/2)}deg + 180deg + atan(${width/height})))}
                        100% { transform: translate(0, 0) rotate(calc(180deg + atan(${width/height})))}
                    }`
                }
            </style>
            <div className="circle spinningCircle"></div>
            <div className="circle circleMask"></div>
            <div className="name">just a personal website.</div>
            <span className={ `delete` } onClick={entrySequence} >
                { buttonFace }
            </span>
            <div className="gradient"></div>
            {/* <div className="staticGradient"></div> */}
            <svg className="wiper" viewBox="0 0 100 100">
                <circle className="wiperLeft" cx="50" cy="50" r="50" />
            </svg>
            <div className={ `line lineLeft grow ${shakingLeft}` } style={{ transform: `rotate(calc( atan(${width/height})))` }}></div>
            <div className={ `line lineRight grow ${shakingRight}` } style={{ transform: `rotate(calc(180deg + atan(${width/height})))` }}></div>
        </div>
    )
}

export default Landing