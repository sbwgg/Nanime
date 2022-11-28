import Background from "../../components/background/background.component";
import Popular from "../pupolar/popular.page";
import RecentRelease from "../recentRelease/recentRelease.page";
import TopAiring from "../topAiring/topAiring.page";
import './home.page.scss';
const Home = () =>{
    return(
        <div id="Home">
            <Background/>
            <RecentRelease/>
            <Popular/>
            <TopAiring/>
        </div>
    )
}

export default Home;