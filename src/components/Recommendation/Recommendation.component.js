import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { searchGenre } from "../../utilites/utilites.tools";
import Loader from "../../components/Loader/Loade.component";
import { Reveal } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";

const Recommendation = ({ genre }) => {
    const [animes, setAnimes] = useState([]);
    const [loading, setLoading] = useState();
    const location = useLocation();
    const navigate = useNavigate();

    const customAnimation = keyframes`
    from {
        opacity: 0;
        transform: translate3d(0px, 50px, 0) scale(0.9);
        filter:brightness(0.6)
    }

    to {
        opacity: 1;
        transform: translate3d(0, 0, 0) scale(1);
        filter:brightness(1)
    }
`;

    useEffect(() => {
        setAnimes([]);
        setLoading(true);
        searchGenre(genre).then((data) => {
            setAnimes(data);
            setLoading(data.length > 0);
        });
    }, [genre]);

    const renderRecommendation = () => {
        return animes?.map((anime, index) => {
            return (
                <div
                    key={index}
                    className="anime"
                    style={{ backgroundImage: `url(${anime?.animeImg})` }}
                    onClick={() =>
                        navigate("/detail/" + anime?.animeId, {
                            state: location.pathname,
                        })
                    }
                >
                    <div className="overlay"></div>
                    <h2>{anime.animeTitle}</h2>
                </div>
            );
        });
    };

    return (
        <React.Fragment>
            {animes.length > 0 ? (
                <div className="recommendation">
                    <div className="strip">Recommendation</div>
                    <div className="animes">
                        <Reveal
                            keyframes={customAnimation}
                            duration={250}
                            cascade
                            damping={0.1}
                            triggerOnce="true"
                        >
                            {renderRecommendation()}
                        </Reveal>
                    </div>
                </div>
            ) : loading ? (
                <Loader />
            ) : null}
        </React.Fragment>
    );
};

export default Recommendation;
