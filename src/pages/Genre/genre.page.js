import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchGenre } from "../../utilites/utilites.tools";
import Cards from "../../components/Cards/cards.component";
import './genre.page.scss';
function Genres() {
    let { genre } = useParams();
    const [animes, setAnimes] = useState([]);
    const [loading, setLoading] = useState();
    const [pageNum, setPageNum] = useState(1);
    useEffect(() => {
        setPageNum(1);
    }, [genre]);

    useEffect(() => {
        setAnimes([]);
        setLoading(true);
        searchGenre(genre, pageNum).then((data) => {
            setAnimes(data);
            setLoading(data.length > 0);
        });
    }, [genre, pageNum]);

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
        <div className="Genres layout">
            <h1 className="strip">{genre}</h1>
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

export default Genres;
