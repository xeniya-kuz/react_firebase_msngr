import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { changeName } from "../../store/profile/actions";
import { getProfileName } from "../../store/profile/selectors";
import { Button } from "../Button/Button";

import { auth, logOut, userRef } from "../../services/firebase";
import { onValue, set } from "firebase/database";
import { Input } from "../Input/Input";

export function Profile() {
    const dispatch = useDispatch();

    const name = useSelector(getProfileName);


    const [value, setValue] = useState('');
    const handleChange = (e) => {
        setValue(e.target.value);
    }

    //получает имя пользователя
    useEffect(() => {
        const unsubscribe = onValue(userRef, (chatsSnap) => {
            dispatch(changeName(chatsSnap.val()?.name));
        })
        return unsubscribe;
    }, []);

    // изменение имя пользователя
    const handleSubmit = (e) => {
        e.preventDefault();
        //set перепишет все(!) данные по указанному адресу на новые
        if (value !== '') {
            set(userRef, {
                name: value,
                id: auth.currentUser.uid,
            });
            setValue('');
        }
    };


    const [loading, setLoading] = useState(false);
    const handleLogOut = async () => {
        setLoading(true);
        try {
            await logOut();
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Profile page</h1>
            <>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        value={value}
                        onChange={handleChange}
                        placeholder='Впишите новое имя'
                    />
                    <div>Username = {name}</div>
                    <div>
                        <Button type="submit" value="Change userame" />
                    </div>
                </form>
                <Button className='button__mt20' type="button" value="Sign Out" onClick={handleLogOut} />
            </>
        </div>
    )
}