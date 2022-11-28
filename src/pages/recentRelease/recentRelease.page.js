import { getRecentRelease } from "../../utilites/utilites.tools";
import Cards from "../../components/Cards/cards.component";
import { useState, useEffect } from "react";
import './recentRelease.page.scss';
function RecentRelease() {
    const [animes, setAnimes] = useState([]);
    const [loading, setLoading] = useState();
    const [type, setType] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    useEffect(() => {
        setAnimes([]);
        setLoading(true);
        getRecentRelease(type, pageNum).then((data) => {
            setAnimes(data);
            setLoading(data.length > 0);
        });
    }, [type, pageNum]);

    const add = () => {
        const type1Max = 331;
        const type2Max = 139;
        const type3Max = 23;
        if (type === 1 && pageNum < type1Max) {
            setPageNum(pageNum + 1);
        } else if (type === 2 && pageNum < type2Max) {
            setPageNum(pageNum + 1);
        } else if (type === 3 && pageNum < type3Max) {
            setPageNum(pageNum + 1);
        }
    };

    const minus = () => {
        if (pageNum > 1) {
            setPageNum(pageNum - 1);
        }
    };

    const setAnimeType = (animeType) => {
        if (animeType !== type) {
            setType(animeType);
            setPageNum(1);
        }
    };

    const renderType = () => {
        const types = ["JP", "EN", "CH/EN"];
        return types.map((t, index) => {
            return (
                <span
                    key={index}
                    onClick={() => setAnimeType(index + 1)}
                    className={`${type === index + 1 ? "active" : ""}`}
                >
                    {t}
                </span>
            );
        });
    };
    return (
        <div id="RecentRelease" className="layout">
            <h1>Recent Released:</h1>
            <div className="pager">
                <div className="sub">{renderType()}</div>
                <div className="pignator">
                    <div className="minus" onClick={minus}>
                        -
                    </div>
                    <div className="pageNum">{pageNum}</div>
                    <div className="add" onClick={add}>
                        +
                    </div>
                </div>
            </div>
            <Cards animesData={animes} loading={loading} />
        </div>
    );
}

export default RecentRelease;
