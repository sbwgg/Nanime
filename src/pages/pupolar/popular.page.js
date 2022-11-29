import { useEffect, useState } from "react";
import Cards from "../../components/Cards/cards.component";
import { getPopularAnimes } from "../../utilites/utilites.tools";
import "./popular.page.scss";
import Pignator from "../../components/Pignator/Pignator.component";
function Popular() {
    const [animes, setAnimes] = useState([]);
    const [loading, setLoading] = useState();
    const [pageNum, setPageNum] = useState(1);
    useEffect(() => {
        setAnimes([]);
        setLoading(true);
        getPopularAnimes(pageNum).then((animes) => {
            setAnimes(animes);
            setLoading(animes.length > 0);
        });
    }, [pageNum]);

    const add = () => {
        const max = 504;
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
        <div id="Popular" className="layout">
            <h1 className="strip">Popular</h1>
            <div className="pager">
                <div className="sub">
                    <span className="active">Any</span>
                </div>
                <Pignator pageNum={pageNum} add={add} minus={minus} />
            </div>
            <Cards animesData={animes} loading={loading} />
        </div>
    );
}

export default Popular;
