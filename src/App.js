import "./App.scss";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
} from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import Home from "./pages/home/home.page";
import Popular from "./pages/pupolar/popular.page";
import RecentRelease from "./pages/recentRelease/recentRelease.page";
import TopAiring from "./pages/topAiring/topAiring.page";
import AnimeDetails from "./pages/AnimeDetail/animeDetail.page";
import Anime from "./pages/Anime/Anime.page";
import Navbar from "./components/Navbar/navbar.component";
import { freezeBody } from "./utilites/utilites.tools";
import Search from "./pages/search/search.page";
import SideHistory from "./components/SideHistory/sideHistory.component";
import History from "./pages/History/history.page";
import Genres from "./pages/Genre/genre.page";
import Movies from "./pages/movies/movies.page";
const Navigation = ({
    searchHandler,
    handleSideHistory,
    setOpenHistory,
    openHistory,
    setInput,
    input,
    scrolled,
}) => {
    return (
        <Fragment>
            <Navbar
                searchHandler={searchHandler}
                handleSideHistory={handleSideHistory}
                setOpenHistory={setOpenHistory}
                setInput={setInput}
                input={input}
                scrolled={scrolled}
            />
            <SideHistory
                    openHistory={openHistory}
                    setOpenHistory={setOpenHistory}
                />
            <Outlet />
        </Fragment>
    );
};

const App = () => {
    const [input, setInput] = useState("");
    const [scrolled, setScrolled] = useState(false);
    const [openHistory, setOpenHistory] = useState(false);
    const searchHandler = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    };

    useEffect(() => {
        window.addEventListener("scroll", (_e) => {
            let currentHeight = window.scrollY;
            setScrolled(currentHeight > 10);
        });
    }, []);

    const handleSideHistory = () => {
        setOpenHistory(!openHistory);
        freezeBody(openHistory);
    };
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Navigation
                            searchHandler={searchHandler}
                            handleSideHistory={handleSideHistory}
                            setOpenHistory={setOpenHistory}
                            openHistory={openHistory}
                            setInput={setInput}
                            input={input}
                            scrolled={scrolled}
                        />
                    }
                >
                    <Route index element={<Home />} />
                    <Route path="popular" element={<Popular />} />
                    <Route path="recentrelease" element={<RecentRelease />} />
                    <Route path="topairing" element={<TopAiring />} />
                    <Route
                        path="/detail/:animeName"
                        element={<AnimeDetails />}
                    />
                    <Route path="/genre/:genre" element={<Genres />} />
                    <Route path="/watch/:id" element={<Anime />} />
                    <Route path="/search/:term" element={<Search />} />
                    <Route path="/history" element={<History />} />
                    <Route
                        path="/movies/:letter/:page"
                        element={<Movies />}
                    />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
