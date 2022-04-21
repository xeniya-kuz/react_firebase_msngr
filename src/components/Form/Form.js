import React, { useRef, useState, useEffect } from 'react';
import { isChangingMessage } from "../../store/messages/actions"
import { useSelector, useDispatch } from "react-redux";
import { getIsChange } from '../../store/messages/selectors'
import './Form.sass';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

import { auth, getMessageRefById } from '../../services/firebase';
import { set } from "firebase/database";


export const Form = ({ chatId }) => {
    // P.S. я знаю, что логику лучше перенести в редакс

    let [value, setValue] = useState('');
    const inputRef = useRef();


    const changeMessageFlag = useSelector(getIsChange);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    // фокусировка на поле ввода
    useEffect(() => { inputRef.current?.focus() }, [])



    const handleSubmit = (e) => {
        e.preventDefault();

        if (changeMessageFlag.change) {
            handleChangeMessage();
        } else {
            handleSendMessage();
        }
    }

    // добавление нового сообщения
    const handleSendMessage = () => {

        if (value !== '') {
            const newMsg = {
                author: auth.currentUser.uid,
                text: value,
                id: Date.now() + Math.ceil(Math.random() * 100),
            };
            // добавление сообщения в firebase
            set(getMessageRefById(chatId, newMsg.id), newMsg);
        }

        inputRef.current?.focus();
        setValue('');
    }

    //отслеживание состояния изменения сообщения (true или false)
    useEffect(() => {
        if (changeMessageFlag.change) {
            setValue(changeMessageFlag.text);
        }
    }, [changeMessageFlag])


    //изменение текста сообщения
    const handleChangeMessage = () => {

        if (changeMessageFlag.change) {
            set(getMessageRefById(chatId, changeMessageFlag.changeId), { author: auth.currentUser.uid, id: changeMessageFlag.changeId, text: value });
            dispatch(isChangingMessage(false, null, ''));
            setValue('');
        }
    }


    return (
        <>
            <form className='form' onSubmit={handleSubmit}>
                <Input className='input__form' type="text" value={value}
                    inputRef={inputRef}
                    placeholder='Введите сообщение' onChange={handleChange} />
                <Button value={changeMessageFlag.change ? 'Подтвердить изменение' : 'Отправить'} type='submit' className="button__mt20 button__submit" />
            </form>
        </>
    )
}