import { useEffect, useState } from "react";
import { getAnimeList, scrollTop, addToHistory } from "../../utilites/utilites.tools";
import AnimeVideo from "../../components/AnimeVideo/animeVideo.component";
import { Link, useParams, useNavigate } from "react-router-dom";
import NotAvailable from "../../components/NotAvailable/NotAvailable.component";
import Loader from "../../components/Loader/Loade.component";
import Recommendation from "../../components/Recommendation/Recommendation.component";
import './Anime.page.scss';
function Anime() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [anime, setAnime] = useState([]);
    const [episodesList, setEpisodesList] = useState(null);

    useEffect(() => {
        let animeName = id;
        if (id.includes("-episode-")) {
            animeName = id.split("-episode-")[0];
        }
        getAnimeList(animeName).then((data) => {
            if (data) scrollTop();
            setAnime(data);
            setEpisodesList(data.episodesList);
        });
    }, [id]);

    const renderRpisodesList = () => {
        if (episodesList?.length === 0) {
            return "empty";
        }
        return episodesList?.map((episodes, index) => {
            return (
                <div
                    key={index}
                    onClick={() => watchAnime(episodes)}
                    className={`episode ${
                        episodes.episodeId === id ? "active" : ""
                    }`}
                >
                    {episodes.episodeNum}
                </div>
            );
        });
    };

    const watchAnime = (episode = anime?.episodesList[0]) => {
        if (anime?.episodesList?.length === 0) {
            return;
        }
        addToHistory(
            anime?.animeTitle,
            anime?.animeImg,
            episode?.episodeId,
            episode?.episodeNum
        );
        navigate("/watch/" + episode?.episodeId);
    };

    const renderGenres = () => {
        return anime?.genres.map((genre, index) => {
            return (
                <Link key={index} to={`/genre/${genre}`}>
                    #{genre}
                </Link>
            );
        });
    };
    return (
        <>
            {episodesList?.length > 0 ? (
                <div className="Anime">
                    <div className="AnimeContent">
                        <div className="leftSection">
                            <div className="animePlayer">
                                <AnimeVideo episodesList={episodesList} />
                                <div className="description">
                                    <h2>
                                        {anime?.animeTitle} | (
                                        {anime?.otherNames})
                                    </h2>
                                    <div className="genres">
                                        {renderGenres()}
                                    </div>
                                </div>
                                <div className="episodesBox">
                                    <h1 className="strip">Episodes</h1>
                                    <div className="selection">
                                        {renderRpisodesList()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rightSection">
                            <div className="body">
                                <div className="detail">
                                    <div className="imageBox">
                                        <img
                                            src={anime?.animeImg}
                                            alt={anime?.animeTitle}
                                        />
                                    </div>
                                    <div className="copy">
                                        <h1>{anime?.animeTitle}</h1>
                                        <h2>Status: {anime?.status}</h2>
                                    </div>
                                </div>
                                <Recommendation genre={anime?.genres[0]} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : episodesList === null ? (
                <Loader />
            ) : (
                <NotAvailable />
            )}
        </>
    );
}

export default Anime;
