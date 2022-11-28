import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getAnimeList, scrollTop, addToHistory } from "../../utilites/utilites.tools";
import Loader from "../../components/Loader/Loade.component";
import NotAvailable from "../../components/NotAvailable/NotAvailable.component";
import './animeDetail.page.scss';
function AnimeDetails() {
    const navigate = useNavigate();
    const { animeName } = useParams();
    const [anime, setAnime] = useState();
    const [error, setError] = useState(false);
    const [readMore, setReadMore] = useState();
    useEffect(() => {
        getAnimeList(animeName).then((data) => {
            if (data) scrollTop();
            if (data?.error) {
                if (data?.error?.status === 404) {
                    setError(true);
                }
            } else {
                setAnime(data);
            }
        });
    }, [animeName]);

    const renderGenres = () => {
        return anime?.genres?.map((genre, index) => {
            return (
                <Link key={index} to={`/genre/${genre}`}>
                    {genre}
                </Link>
            );
        });
    };

    const renderEpisodesList = () => {
        if (anime?.episodesList?.length === 0) {
            return "empty";
        }
        return anime?.episodesList?.map((episodes, index) => {
            return (
                <div key={index} onClick={() => watchAnime(episodes)}>
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

    const limitSize = (sentence) => {
        return !readMore
            ? sentence.length > 300
                ? sentence.substring(0, 300)
                : sentence
            : sentence;
    };

    return (
        <React.Fragment>
            {anime ? (
                <div className="AnimeDetails">
                    <div className="body">
                        <div className="description">
                            <div className="left">
                                <div
                                    className="image"
                                    style={{
                                        backgroundImage: `url(${anime?.animeImg})`,
                                    }}
                                    onClick={() => {
                                        watchAnime();
                                    }}
                                ></div>
                            </div>
                            <div className="right">
                                <h1>{anime?.animeTitle}</h1>
                                <h2>Other Name: {anime?.otherNames}</h2>
                                <div className="genres">{renderGenres()}</div>
                                <p onClick={() => setReadMore(!readMore)}>
                                    {limitSize(anime?.synopsis)}
                                    {anime?.synopsis?.length > 300 ? (
                                        <span
                                            onClick={() =>
                                                setReadMore(!readMore)
                                            }
                                        >
                                            {!readMore
                                                ? "......Read More"
                                                : " Less"}
                                        </span>
                                    ) : null}
                                </p>
                                <b>
                                    {anime?.type} | {anime?.status}
                                </b>
                                <div
                                    className={`watch ${
                                        anime?.episodesList?.length === 0
                                            ? "disabled"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        watchAnime();
                                    }}
                                >
                                    Watch Now
                                </div>
                            </div>
                        </div>
                        {anime?.episodesList?.length !== 0 ? (
                            <div className="episodes">
                                <h1 className="strip">Episodes:</h1>
                                {renderEpisodesList()}
                            </div>
                        ) : null}
                    </div>
                </div>
            ) : !error ? (
                <Loader />
            ) : (
                <NotAvailable />
            )}
            <div className="backgroundImage">
                <img src={anime?.animeImg} alt="background" />
            </div>
        </React.Fragment>
    );
}
export default AnimeDetails;
