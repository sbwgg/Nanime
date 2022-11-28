import { Fragment } from "react";
import Navbar from "../components/Navbar/navbar.component";
import SideHistory from "../components/SideHistory/sideHistory.component";
import { Outlet } from "react-router-dom";
const Navigator = ({
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

export default Navigator;
