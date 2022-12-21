import React from "react";
import Card from '../Card/card.component'
import Loader from '../Loader/Loade.component';
import NotAvailable from "../NotAvailable/NotAvailable.component";
import { Reveal } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import './cards.component.scss';
function Cards({ animesData, loading }) {
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

    const renderAnimes = () => {
        return animesData.map((anime, index) => {
            return <Card key={index} animeData={anime} />;
        });
    };

    return (
        <React.Fragment>
            {animesData?.length > 0 ? (
                <div className="Cards">
                    <Reveal
                        keyframes={customAnimation}
                        duration={250}
                        cascade
                        damping={0.1}
                        triggerOnce="true"
                    >
                        {renderAnimes()}
                    </Reveal>
                </div>
            ) : loading ? (
                <Loader />
            ) : (
                <NotAvailable option={false} />
            )}
        </React.Fragment>
    );
}

export default Cards;
