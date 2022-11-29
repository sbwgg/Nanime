import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import SearchHelper from "../searchHelper/searchHelper.component";
import { Link } from "react-scroll";
import "./navbar.component.scss";
import Logo from "../logo/logo.component";
import { FaSearch, FaHistory } from "react-icons/fa";
import { AiTwotoneSliders } from "react-icons/ai";
function Navbar({
    searchHandler,
    setInput,
    input,
    scrolled,
    handleSideHistory,
}) {
    const location = useLocation();
    const searchBox = useRef();
    const [openHelper, setOpenHelper] = useState(false);
    const [openSearch, setOpenSearch] = useState(false)
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        if(!input)return;
        setOpenSearch(false);
        navigate(input ? "search/" + input : "/");
        setOpenHelper(false);
        setInput("");
    };

    const searchClick = (e) => {
        setOpenSearch(!openSearch);
        searchBox.current.focus();
        if (!input) return;
        submitHandler(e);
    };
    useEffect(() => {
        window.addEventListener("scroll", (_e) => {
            setOpenHelper(false);
        });
        window.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                // setOpenHelper(true);
                searchBox.current.focus();
            }
        });
    }, []);

    const goHome = () => {
        if (location.pathname === "/") return;
        navigate("/");
        setOpenHelper(false);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    const goToHistory = () => {
        if (location.pathname !== "/history") {
            handleSideHistory();
            setOpenHelper(false);
        }
    };

    return (
        <div
            className={`Navbar ${scrolled ? "scrolled" : ""} ${
                openHelper ? "active" : ""
            }`}
        >
            <div className="tools">
                <Link
                    className="HomeIcon"
                    to={"Background"}
                    smooth={true}
                    duration={500}
                    onClick={() => {
                        goHome();
                        setOpenHelper(false);
                    }}
                >
                    <Logo />
                </Link>
                <div className={`search ${openSearch ? "active" : ""}`}>
                    <form
                        onSubmit={(e) => {
                            submitHandler(e);
                        }}
                    >
                        <input
                            type="text"
                            value={input}
                            name="searchbar"
                            placeholder="Search..."
                            autoComplete="off"
                            ref={searchBox}
                            onChange={searchHandler}
                            onClick={() => {
                                setOpenHelper(true);
                            }}
                        />
                    </form>
                    <div className="searchIcon">
                        <FaSearch
                            fill="white"
                            alt="search icon"
                            onClick={(e) => {
                                searchClick(e);
                            }}
                        />
                    </div>
                </div>

                <div className="helper">
                    <AiTwotoneSliders onClick={()=>setOpenHelper(!openHelper)}/>
                </div>

                <div className="history">
                    <FaHistory
                        fill="white"
                        alt="history icon"
                        onClick={() => {
                            goToHistory();
                        }}
                    />
                </div>
            </div>
            <SearchHelper
                openHelper={openHelper}
                scrolled={scrolled}
                input={input}
                setOpenHelper={setOpenHelper}
            />
        </div>
    );
}

export default Navbar;
