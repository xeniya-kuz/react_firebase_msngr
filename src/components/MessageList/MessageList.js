import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { isChangingMessage } from "../../store/messages/actions"
import './MessageList.sass'
import { getMessageRefById, getMsgsRefByChatId, userRef } from '../../services/firebase';
import { onChildRemoved, onValue, remove } from 'firebase/database';
import { Message } from '../Message/Message'


export function MessagesList({ chatId, messages, setMessages }) {
    // P.S. я знаю, что логику лучше перенести в редакс

    const dispatch = useDispatch();


    // слушатель любого изменения в списке сообщений конкретного чата
    useEffect(() => {
        const unsubscribe = onValue(getMsgsRefByChatId(chatId), (snapshot) => {
            setMessages(Object.values(snapshot.val() || []));
        });
        return () => unsubscribe;
    }, [chatId]);

    const handleDeleteMessage = (id) => {
        remove(getMessageRefById(chatId, id));
    }

    const handleChangeMessage = (id) => {
        const changingMsgId = messages.findIndex(item => item.id === id)
        dispatch(isChangingMessage(true, id, messages[changingMsgId].text));
    }


    const [userName, setUserName] = useState('');
    //получает имя пользователя
    useEffect(() => {
        const unsubscribe = onValue(userRef, (chatsSnap) => {
            setUserName(chatsSnap.val()?.name);
        })
        return unsubscribe;
    }, []);


    return <div className="messageList">
        {messages.map(message =>
            // Презентационный компонент
            <Message message={message} key={message.id} handleChangeMessage={handleChangeMessage} handleDeleteMessage={handleDeleteMessage} userName={userName} />
        )
        }
    </div>
}