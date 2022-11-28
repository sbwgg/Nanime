import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { getStreamingURL } from "../../utilites/utilites.tools";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loade.component";
import './animeVideo.component.scss';
const AnimeVideo = ({ episodesList }) => {
    const { id } = useParams();
    const [anime, setAnime] = useState();
    const latest = useState(episodesList[0]?.episodeNum);
    const navigate = useNavigate();
    useEffect(() => {
        if (id.includes("-episode-")) {
            setAnime(null);
            getStreamingURL(id).then((data) => {
                if (data?.sources) {
                    setAnime(data?.sources[0]?.file);
                }
            });
        }
    }, [id]);

    const videoEnd = () => {
        let link = id;
        if (link.includes("-episode-")) {
            let animeInfo = link.split("-episode-");
            let currentEp = animeInfo.pop();
            if (currentEp < latest) {
                navigate(
                    "/watch/" +
                        animeInfo[0] +
                        "-episode-" +
                        (parseInt(currentEp) + 1)
                );
            } else {
                return;
            }
        }
    };
    return (
        <div className="animeVideo">
            <div className="animeContent">
                {/* <h1>{anime?.animeId}</h1> */}
                {anime ? (
                    <ReactPlayer
                        url={anime}
                        playing={true}
                        controls
                        onEnded={videoEnd}
                        className="animeVideoBody"
                    />
                ) : (
                    <div className="setWidth">
                        <Loader />
                    </div>
                )}
            </div>
        </div>
    );
}

export default AnimeVideo;
