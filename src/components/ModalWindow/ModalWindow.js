import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { getChatRefById } from "../../services/firebase"
import { deleted } from "../../store/chatList/actions"
import { Button } from "../Button/Button"
import { Input } from "../Input/Input"
import './ModalWindow.sass'

import { remove, set } from "firebase/database"

export function ModalWindow({ item, setModalIsShown }) {
    // P.S. я знаю, что логику лучше перенести в редакс

    const dispatch = useDispatch();


    const [chatName, setChatName] = useState('');
    const handleChangeName = (e) => {
        setChatName(e.target.value);
    }


    const handleDeleteChat = (id) => {
        dispatch(deleted(true));
        remove(getChatRefById(id));
        setModalIsShown(false);
    }


    const [changeInputIsShown, setChangeInputIsShown] = useState(false);
    const [changingChatName, setChangingChatName] = useState();
    const handleChangeChatName = (id) => {
        // решает, у какого именно чата открыть модалку
        setChangingChatName(id);
        setChangeInputIsShown((prevState) => !prevState);

        if (chatName !== '') {
            // добавление чата в firebase
            set(getChatRefById(id), { id: id, name: chatName });
        }
        setChatName('');
    }

    return (
        <div className={'modalWindow'}>
            <div className="modalWindow__content" >
                <Button value={"Удалить"} type="button" onClick={() => handleDeleteChat(item)}></Button>

                <Button value={changeInputIsShown && chatName === "" ? "Скрыть форму" : "Изменить название"} type="button" onClick={() => handleChangeChatName(item)}></Button>

                {changingChatName === item && changeInputIsShown && <Input placeholder='Впишите название чата' value={chatName} onChange={handleChangeName} ></Input>}

            </div>
        </div>
    )
} 