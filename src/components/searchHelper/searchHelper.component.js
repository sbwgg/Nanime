import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { genres, alphabets, suggestions } from "../../utilites/utilites.tools";
import './searchHelper.component.scss';
function SearchHelper({ openHelper, setOpenHelper, scrolled }) {
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState("Suggestion");
    const tabs = ["Suggestion", "Genre", "Alphabet"];

    const search = (path) => {
        let route = "";
        if (currentTab === "Genre") {
            route = "/genre/" + path;
        } else if (currentTab === "Suggestion") {
            route = "/search/" + path;
        } else {
            route = "/movies/" + path + "/1";
        }
        navigate(route);
        setOpenHelper(false);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    const tabClickHandler = (tab) => {
        setCurrentTab(tab);
        setOpenHelper(true);
    };

    const renderTabs = () => {
        return tabs.map((tab, index) => {
            return (
                <div
                    onClick={() => tabClickHandler(tab)}
                    key={index}
                    className={`tab ${currentTab === tab ? "active" : null}`}
                >
                    {tab}
                </div>
            );
        });
    };

    const renderSuggestion = () => {
        let target = [];
        if (currentTab === "Genre") {
            target = genres;
        } else if (currentTab === "Suggestion") {
            target = suggestions;
        } else {
            target = alphabets;
        }
        return target.map((ele, index) => {
            return (
                <div
                    key={index}
                    className="suggestionPill"
                    onClick={() => search(ele)}
                >
                    {ele}
                </div>
            );
        });
    };

    return (
        <>
            <div
                className={`searchHelper ${openHelper ? "active" : ""} ${
                    scrolled ? "scrolled" : ""
                }`}
            >
                {openHelper ? (
                    <div className="tabs">
                        <div className="body">{renderTabs()}</div>
                    </div>
                ) : null}
                {openHelper ? renderSuggestion() : null}
            </div>
            <div
                className={`subHelper ${openHelper ? "active" : ""}`}
                onClick={() => setOpenHelper(false)}
            ></div>
        </>
    );
}

export default SearchHelper;
