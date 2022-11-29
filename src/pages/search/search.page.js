import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cards from "../../components/Cards/cards.component";
import { searchAnime, scrollTop } from "../../utilites/utilites.tools";
import './search.page.scss';
import Pignator from "../../components/Pignator/Pignator.component";
function Search() {
    const { term } = useParams();
    const [animes, setAnimes] = useState([]);
    const [loading, setLoading] = useState();
    const [pageNum, setPageNum] = useState(1);

    useEffect(() => {
        setPageNum(1);
    }, [term]);
    useEffect(() => {
        setAnimes([]);
        setLoading(true);
        searchAnime(term, pageNum).then((data) => {
            if (data) scrollTop();
            setAnimes(data);
            setLoading(data.length > 0);
        });
    }, [term, pageNum]);
    const add = () => {
        const max = 26;
        if ((pageNum < max) & loading) {
            setPageNum(pageNum + 1);
        }
    };

    const minus = () => {
        if (pageNum > 1) {
            setPageNum(pageNum - 1);
        }
    };
    return (
        <div className="Search layout">
            <h1 className="strip">{term}</h1>
            <div className="pager">
                <div className="sub">
                    <span className="active">Any</span>
                </div>
                <Pignator pageNum={pageNum} add={add} minus={minus}/>
            </div>
            <Cards animesData={animes} loading={loading} />
        </div>
    );
}

export default Search;
