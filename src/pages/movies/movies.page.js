import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchMovies, scrollTop, alphabets } from "../../utilites/utilites.tools";
import Cards from '../../components/Cards/cards.component';
import './movies.page.scss';
function Movies() {
    const [animes, setAnimes] = useState([]);
    const { letter } = useParams();
    const [loading, setLoading] = useState();
    const [pageNum, setPageNum] = useState(1);
    useEffect(() => {
        setPageNum(1);
    }, [letter]);
    useEffect(() => {
        searchMovies(letter, pageNum).then((data) => {
            if (data) scrollTop();
            setAnimes(data);
            setLoading(data.length > 0);
        });
    }, [letter, pageNum]);
    const renderAlphabet = () => {
        return alphabets.map((character, index) => {
            return (
                <Link
                    to={"/movies/" + character + "/1"}
                    key={index}
                    className={character === letter ? "active" : ""}
                >
                    {character}
                </Link>
            );
        });
    };

    const add = () => {
        const max = 26;
        if (pageNum < max && loading) {
            setPageNum(pageNum + 1);
        }
    };

    const minus = () => {
        if (pageNum > 1) {
            setPageNum(pageNum - 1);
        }
    };
    return (
        <div className="Movies">
            <div className="body">
                <div className="alphabets">{renderAlphabet()}</div>
                <div className="layout">
                    <h1 className="strip">Movies / {letter}</h1>
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
            </div>
        </div>
    );
}

export default Movies;
