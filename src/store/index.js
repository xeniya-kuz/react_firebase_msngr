
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import { profileReducer } from './profile/reducer'
import { chatListReducer } from './chatList/reducer'
import { messagesReducer } from './messages/reducer'
import { persistStore, persistReducer } from 'redux-persist'
import { animeReducer } from './anime/reducer'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const config = {
    key: 'MessengerWithReact',
    storage,
    blacklist: ['anime', 'chatList', 'messages', 'profile'],
}

const persistedReducer = persistReducer(
    config,
    combineReducers({
        chatList: chatListReducer,
        profile: profileReducer,
        messages: messagesReducer,
        anime: animeReducer,
    })
)

export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
export const persistor = persistStore(store);