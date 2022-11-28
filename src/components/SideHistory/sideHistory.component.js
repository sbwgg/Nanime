import React from "react";
import History from "../../pages/History/history.page";
import { useNavigate } from "react-router-dom";
import { freezeBody } from "../../utilites/utilites.tools";
import './sideHistory.component.scss';
const SideHistory = ({ openHistory, setOpenHistory }) => {
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <div className={`sideHistory ${openHistory ? "active" : ""}`}>
                {openHistory ? (
                    <>
                        <div
                            className="historyLink"
                            onClick={() => {
                                navigate("/history");
                                setOpenHistory(false);
                                freezeBody(true);
                            }}
                        >
                            Full History
                        </div>
                        <History wait={200} side={true} />
                    </>
                ) : null}
            </div>
            <div
                className={`historyOverlay ${openHistory ? "active" : ""}`}
                onClick={() => {
                    setOpenHistory(false);
                    freezeBody(true);
                }}
            ></div>
        </React.Fragment>
    );
};

export default SideHistory;
