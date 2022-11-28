import "./App.scss";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
} from "react-router-dom";
import { Fragment } from "react";
import Home from "./pages/home/home.page";
import Popular from "./pages/pupolar/popular.page";
import RecentRelease from "./pages/recentRelease/recentRelease.page";
import TopAiring from "./pages/topAiring/topAiring.page";
import AnimeDetails from "./pages/AnimeDetail/animeDetail.page";
import Anime from "./pages/Anime/Anime.page";

const Navigation = () => {
    return (
        <Fragment>
            <div>Navbar</div>
            <Outlet />
        </Fragment>
    );
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigation />}>
                    <Route index element={<Home />} />
                    <Route path="popular" element={<Popular />} />
                    <Route path="recentrelease" element={<RecentRelease />} />
                    <Route path="topairing" element={<TopAiring />} />
                    <Route
                        path="/detail/:animeName"
                        element={<AnimeDetails/>}
                    />
                     <Route path="/watch/:id" element={<Anime />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
