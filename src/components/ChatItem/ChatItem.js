import { MessagesList } from '../MessageList/MessageList';
import { Form } from '../Form/Form';
import { useRef, useEffect, useState } from 'react';
import { Navigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { deleted } from "../../store/chatList/actions"
import './ChatItem.sass'
import { getDeleted } from "../../store/chatList/selectors";


export function ChatItem() {
    const { chatId } = useParams();

    const parentRef = useRef();

    //функция для изменения данных в сторе
    const dispatch = useDispatch();


    // флаг для отслеживания удаления чата, перенаправляет на список чатов при удалении чата
    const deletedFlag = useSelector(getDeleted);

    // список сообщения чата
    const [chatMessages, setChatMessages] = useState([]);

    // перенаплавление на список чатов при удалении чата
    useEffect(() => {
        if (deletedFlag) {
            dispatch(deleted(false));
        }

    }, [deletedFlag]);

    if (deletedFlag || !chatMessages) {
        return <Navigate replace to="/chats" />;
    }

    return (
        <div ref={parentRef} className='chat__form'>
            <MessagesList
                chatId={chatId}
                messages={chatMessages}
                setMessages={setChatMessages}
            ></MessagesList>
            <Form chatId={chatId} />
        </div>

    )
}