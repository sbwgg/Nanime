import './card.component.scss';
import { useNavigate, useLocation } from "react-router-dom";
const Card = ({ animeData }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const viewAnime = () => {
        navigate("/detail/" + animeData.animeId, { state: location.pathname });
    };
    return (
        <div
            className="Card"
            style={{ backgroundImage: `url(${animeData.animeImg})` }}
            onClick={viewAnime}
        >
            <div className="animeContent">
                <div>
                    <h1>{animeData.animeTitle}</h1>
                </div>
            </div>
        </div>
    );
}

export default Card;
