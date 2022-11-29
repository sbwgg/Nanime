import { useEffect, useState } from "react";
import {
    getHistory,
    scrollTop,
    updateHistory,
    clearHistory,
} from "../../utilites/utilites.tools";
import { Reveal } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import './history.page.scss';
import {AiOutlineClear, AiFillCloseCircle} from 'react-icons/ai';
const History = ({ wait = 0, side = false }) => {
    const [history, setHistory] = useState();
    useEffect(() => {
        let history = getHistory();
        if (history && !side) scrollTop();
        setHistory(history);
    }, [side]);
    const customAnimation = keyframes`
        from {
            opacity: 0;
            transform: translate3d(-0px, 50px, 0);
        }

        to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }
    `;

    const handleDelete = (selectedAnime) => {
        if (history) {
            let filteredHistory = history.filter((anime) => {
                return selectedAnime.link !== anime.link;
            });
            setHistory(filteredHistory);
            updateHistory(filteredHistory);
        } else {
            return;
        }
    };

    const handleClearHistory = () => {
        clearHistory();
        setHistory([]);
    };

    const renderHistory = () => {
        if (history?.length > 0) {
            return history?.map((anime, index) => {
                return (
                    <div className="record" key={index}>
                        <div className="recordBody">
                            <AiFillCloseCircle onClick={() => handleDelete(anime)} className='delete'/>
                            <a href={"/watch/" + anime.link}>
                                <img src={anime.image} alt={anime?.name} />
                            </a>
                            <div className="body">
                                <div className="copy">
                                    <h1>{anime.name}</h1>
                                    <h2>Episode: {anime.episode}</h2>
                                    <a href={"/watch/" + anime.link}>Watch</a>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
        } else {
            return <p>Empty</p>;
        }
    };
    return (
        <div id="History" className="layout">
            <div className="header">
                <h1>History</h1>
                {history?.length > 0 ? (
                    <AiOutlineClear/>
                ) : null}
            </div>
            <div className="historyBody">
                <Reveal
                    keyframes={customAnimation}
                    duration={250}
                    cascade
                    delay={wait}
                    damping={0.1}
                    triggerOnce="true"
                >
                    {renderHistory()}
                </Reveal>
            </div>
        </div>
    );
};

export default History;
