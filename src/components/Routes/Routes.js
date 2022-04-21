import { Home } from '../Home/Home';
import { ChatList } from '../ChatList/ChatList';
import { ChatItem } from '../ChatItem/ChatItem';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Profile } from '../Profile/Profile';
import { useEffect } from 'react';
import { Anime } from '../Anime/Anime';
import { useDispatch } from 'react-redux';
import { PrivateRoute } from '../PrivateRoute';
import { PublicRoute } from '../PublicRoute';
import { auth } from '../../services/firebase'
import { signIn, signOut } from '../../store/profile/actions';


export function RoutesComponent() {
    const dispatch = useDispatch();


    //подписка на изменение авторизации, диспатчит соответствующий экшн
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch(signIn());
            } else {
                dispatch(signOut());
            }
        })
        //размонтирование
        return unsubscribe;
    }, [])

    return (

        <BrowserRouter>
            <div className="App">
                <ul className="App__ul">
                    <li>
                        <Link className="App__link" to="/">Home</Link>
                    </li>
                    <li>
                        <Link className="App__link" to="/chats">Chats</Link>
                    </li>
                    <li>
                        <Link className="App__link" to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link className="App__link" to="/anime">Anime</Link>
                    </li>
                </ul>

                <Routes>
                    <Route path="/" element={<PublicRoute />} >
                        <Route path="" element={<Home />} />
                    </Route>
                    <Route path="/signup" element={<Home isSignUp />} />
                    <Route path="anime" element={<Anime />} />
                    {/* вложенные руты начинаются с react-router-dom 6 */}
                    <Route path="chats" element={<PrivateRoute />} >
                        <Route path="" element={<ChatList />} >
                            <Route path=":chatId" element={<ChatItem chatList />
                            } />
                        </Route>
                    </Route>
                    <Route path="profile" element={<PrivateRoute />} >
                        <Route path="" element={<Profile />} />
                    </Route>
                    <Route path="*" element={<h1>404</h1>} />
                </Routes>
            </div >
        </BrowserRouter >

    )
}