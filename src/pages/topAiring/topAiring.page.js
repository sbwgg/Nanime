import { useState, useEffect } from "react";
import { getTopAiring } from "../../utilites/utilites.tools";
import Cards from "../../components/Cards/cards.component";
function TopAiring() {
    const [animes, setAnimes] = useState([]);
    const [loading, setLoading] = useState();
    const [pageNum, setPageNum] = useState(1);
    useEffect(() => {
        setAnimes([]);
        setLoading(true);
        getTopAiring(pageNum).then((data) => {
            setAnimes(data);
            setLoading(data.length > 0);
        });
    }, [pageNum]);
    const add = () => {
        const max = 26;
        if (pageNum < max) {
            setPageNum(pageNum + 1);
        }
    };

    const minus = () => {
        if (pageNum > 1) {
            setPageNum(pageNum - 1);
        }
    };
    return (
        <div id="TopAiring" className="layout">
            <h1>Top Airing:</h1>
            <div className="pager">
                <div className="sub">
                    <span className="active">Any</span>
                </div>
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

export default TopAiring;
