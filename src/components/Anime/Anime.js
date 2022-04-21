import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { animeList } from "../../store/anime/actions";
import { getAnimeFailure, getAnimeList, getAnimeLoading } from "../../store/anime/selectors";


export function Anime() {
    const dispatch = useDispatch();
    const anime = useSelector(getAnimeList);
    const isLoading = useSelector(getAnimeLoading);
    const error = useSelector(getAnimeFailure);

    const requestAnime = () => {
        dispatch(animeList());
    };

    useEffect(() => {
        requestAnime();

    }, []);
    return <>
        <h3>Anime List</h3>
        {error && <h3>{error}</h3>}
        {/* отображение загрузки */}
        {isLoading ? <CircularProgress /> :
            // инлайн стили, потому что это не так важно
            <div style={{ textAlign: 'left' }}>
                <button onClick={requestAnime}>Запрос</button>
                <ul style={{ display: 'flex', flexWrap: "wrap" }}>
                    {anime.map(item => {
                        return (
                            <li key={item.anime_id} style={{ flexGrow: 1 }} >
                                <div>{item.anime_name}</div>
                                <img style={{ width: 150 + "px" }} src={item.anime_img}></img>
                            </li>)
                    }
                    )}
                </ul>
            </div>}
    </>
}