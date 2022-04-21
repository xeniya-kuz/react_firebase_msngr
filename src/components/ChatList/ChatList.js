import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import './ChatList.sass'
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

import { onChildAdded, onChildRemoved, set, onChildChanged } from "firebase/database";
import { chatsRef, getChatRefById } from "../../services/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ChatList() {
    // P.S. я знаю, что логику лучше перенести в редакс

    //для отоображения модального окна
    const [modalIsShown, setModalIsShown] = useState(false);
    const [modalId, setModalId] = useState();
    const modalCkickHandler = (id) => {
        setModalIsShown((prev) => !prev);
        setModalId(id);
    }

    const [chatList, setChatList] = useState([]);

    //для отображения инпута для добавления чата
    const [addInputIsShown, setAddInputIsShown] = useState(false);


    const [value, setValue] = useState('');
    const handleChangeValue = (e) => {
        setValue(e.target.value);
    }

    useEffect(() => {
        //слушатель добавления чата
        const unsubscribe = onChildAdded(chatsRef, (chatsSnap) => {
            setChatList(prevChats => [...prevChats, chatsSnap.val()]);
        })
        return unsubscribe;
    }, []);

    //добавление чата
    const handleAddChat = (e) => {
        e.preventDefault();
        setAddInputIsShown(!addInputIsShown);
        const newId = Date.now() + Math.ceil(Math.random() * 100);
        if (value !== '') {
            set(getChatRefById(newId), { id: newId, name: value });
        }
        setValue('');
        setModalIsShown(false);
    }

    // слушатель удаления чата, само удаление в модальном окне
    useEffect(() => {
        const unsubscribe = onChildRemoved(chatsRef, (chatsSnap) => {
            setChatList(prevChats => prevChats.filter(({ id }) => id !== chatsSnap.val()?.id));
        })
        return unsubscribe;
    }, []);

    // слушатель изменения названия чата, сама функция в модальном окне
    useEffect(() => {
        const unsubscribe = onChildChanged(chatsRef, (chatsSnap) => {
            const changingChatIndex = chatList.findIndex((el) => el.id === chatsSnap.val().id);
            const copy = [...chatList];
            copy[changingChatIndex] = {
                id: chatsSnap.val().id,
                name: chatsSnap.val().name,
            };
            setChatList(copy);
            console.log('onChildChanged');
        })

        return unsubscribe;
    }, [chatList]);


    return (
        <>
            <div className="flex">
                <ul className="list">
                    <h3>Список чатов</h3>
                    {chatList.map(chat => (
                        <span key={chat.id}>
                            <li className="list__li">
                                <NavLink className="list__link"
                                    style={({ isActive }) => ({ className: isActive ? "active" : "" })}
                                    to={`/chats/${chat.id}`} >
                                    {chat.name}
                                </NavLink>
                                <div className="list__modal" >
                                    <div className="list__modal__mark"
                                        onClick={() => modalCkickHandler(chat.id)}>
                                        <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
                                    </div>
                                    {modalIsShown && modalId === chat.id && <ModalWindow active={modalIsShown} item={chat.id} setModalIsShown={setModalIsShown}></ModalWindow>}
                                </div>
                            </li>
                        </span>
                    ))}
                    <form onSubmit={handleAddChat}>
                        <Button className="button__mt20" type="submit" value={addInputIsShown && value === "" ? "Скрыть форму" : "Добавить"}></Button>
                        <div className="list__input">
                            {addInputIsShown && <Input placeholder='Впишите название чата' value={value} onChange={handleChangeValue} />}
                        </div>
                    </form>
                </ul>
                <Outlet />
            </div>
        </>
    )
}