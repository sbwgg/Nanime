import { useEffect, useState } from "react";
import { suffle } from "../../utilites/utilites.tools";
import { Link } from "react-scroll";
import animeBGs from "../../library/libaray.animeBGs";
import "./background.component.scss";
import Logo from "../logo/logo.component";
import { AiFillCaretRight } from "react-icons/ai";
function Background({ disabled = false, fixed = false }) {
    const [index, setIndex] = useState(suffle(0, animeBGs?.length));
    const time = 10000;
    useEffect(() => {
        animationEffect();
    }, [index]);

    const animationEffect = () => {
        const timer = setInterval(() => {
            let random = suffle(0, animeBGs.length);
            setIndex(random);
        }, time);
        setTimeout(() => {
            clearInterval(timer);
        }, time);
    };
    return (
        <div id="Background" className={fixed ? "fixed" : ""}>
            {!disabled ? (
                <div className="body">
                    <div className="bodyCopy">
                        <Logo />
                        <h3>Watch Animes and Movies</h3>
                        <Link
                            className="button"
                            to={"RecentRelease"}
                            smooth={true}
                            duration={350}
                            offset={-100}
                        >
                            <b>Get Started</b>
                            <AiFillCaretRight />
                        </Link>
                    </div>
                </div>
            ) : null}
            <div className="shadow"></div>
            <img src={animeBGs[index]} alt="anime background" />
        </div>
    );
}

export default Background;
