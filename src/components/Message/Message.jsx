import React from "react";
import { Button } from "../Button/Button";
import './Message.sass'

// Презентационный компонент
export function Message({ message, handleChangeMessage, handleDeleteMessage, userName }) {

    return (
        <div className="message__item">
            <div className="message__author">{userName} </div>
            <div className="message__text">{message.text}</div>
            <Button value={"Удалить"} type="button" onClick={() => handleDeleteMessage(message.id)}></Button>
            <Button value={"Изменить"} type="button" onClick={() => handleChangeMessage(message.id)}></Button>
        </div>
    )
}