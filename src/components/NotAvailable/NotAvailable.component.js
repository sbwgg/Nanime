import { Link, useLocation } from "react-router-dom";
// import CRY from '../../assets/icons/cry.png';

function NotAvailable({ option = true }) {
    const location = useLocation();
    return (
        <div className="notavailable">
            <div className="body">
                {/* <img src={CRY} alt="not available"/> */}
                <div>
                    <h1>No Result Found</h1>
                </div>
                {option ? (
                    <div>
                        <Link to={location.state ? location.state : "/"}>
                            <div>Go Back</div>
                        </Link>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default NotAvailable;
