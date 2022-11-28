import axios from "axios";
const URL = "https://gogoanime2.p.rapidapi.com";

const options = {
    url: URL,
    headers: {
        "X-RapidAPI-Key": process.env.GOGOANIME_API_KEY,
        "X-RapidAPI-Host": "gogoanime2.p.rapidapi.com",
    },
};

export const searchAnime = async (animeName, page = 1) => {
    try {
        const { data } = await axios.get(
            `${URL}/search?keyw=${animeName}&page=${page}`,
            options
        );
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const searchGenre = async (genre, page = 1) => {
    try {
        const { data } = await axios.get(
            `${URL}/genre/${genre}?page=${page}`,
            options
        );
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const searchMovies = async (letter, page) => {
    try {
        const { data } = await axios.get(
            `${URL}/anime-movies?aph=${letter}&page=${page}`,
            options
        );
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const getRecentRelease = async (type = 1, page = 1) => {
    try {
        const { data } = await axios.get(
            `${URL}/recent-release?type=${type}&page=${page}`,
            options
        );
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const getTopAiring = async (page) => {
    try {
        const { data } = await axios.get(
            `${URL}/top-airing?page=${page}`,
            options
        );
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const getStreamingURL = async (url) => {
    try {
        const { data } = await axios.get(`${URL}/vidcdn/watch/${url}`, options);
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const getAnimeList = async (animeName) => {
    try {
        const { data } = await axios.get(
            `${URL}/anime-details/${animeName}`,
            options
        );
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const getPopularAnimes = async (page = 1) => {
    try {
        const { data } = await axios.get(
            `${URL}/popular?page=${page}`,
            options
        );
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const scrollTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};

export const suffle = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

export const addToHistory = (name, img, link, episode) => {
    const history = localStorage.getItem("history");
    let newAnime = {
        name: name,
        image: img,
        episode: episode,
        link: link,
    };
    if (!history) {
        localStorage.setItem("history", JSON.stringify([]));
    } else {
        let historyObj = JSON.parse(history);
        let found = historyObj.find((anime) => {
            return anime.name === newAnime.name && anime.link === newAnime.link;
        });
        if (!found) {
            historyObj.unshift(newAnime);
            localStorage.setItem(
                "history",
                JSON.stringify(historyObj.slice(0, 20))
            );
        } else {
            return;
        }
    }
};

export const clearHistory = () => {
    localStorage.setItem("history", JSON.stringify([]));
};

export const getHistory = () => {
    let history = localStorage.getItem("history");
    return history ? JSON.parse(history) : [];
};

export const updateHistory = (history) => {
    const maxNumRecords = 30;
    if (history) {
        localStorage.setItem(
            "history",
            JSON.stringify(history.slice(0, maxNumRecords))
        );
    } else {
        return;
    }
};

export const freezeBody = (freeze = false) => {
    document.body.style.overflowY = !freeze ? "hidden" : "scroll";
};


export const genres = [
    "Game",
    "Parody",
    "Cars",
    "Yuri",
    "Yaoi",
    "Family",
    "Gourmet",
    "Suspense",
    "Isekai",
    "Romance",
    "Action",
    "Drama",
    "Ecchi",
    "Historical",
    "Shounen",
    "Adventure",
    "Fantasy",
    "Sci-Fi",
    "Magic",
    "School",
    "Military",
    "Horror",
    "Shoujo",
    "Mystery",
    "Kids",
    "Samurai",
    "Space",
    "Dementia",
    "Mecha",
    "Psychological",
    "Sports",
    "Demons",
    "Martial Arts",
    "Super Power",
];

export const alphabets = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];

export const suggestions = [
    "subarashii",
    "doraemon",
    "shin chan",
    "pokemon",
    "naruto",
    "boruto",
    "conan",
    "crown",
    "spy",
    "urusei",
    "shingeki",
    "prince",
    "tennies",
    "one piece",
    "summer",
    "Fate",
    "Inuyasha",
    "Tokyo",
    "Revengers",
    "Gintama",
    "Berserk",
    "Bleach",
    "Cowboy",
    "Academia",
    "hero",
    "Jujutsu",
    "Steins",
    "Ghoul",
    "Gundam",
    "Evergarden",
    "Titan",
    "Dragon Ball",
    "Another World",
    "zero",
    "Evangelion",
    "Alchemist",
    "Demon",
    "Kimetsu",
    "Slayer",
];