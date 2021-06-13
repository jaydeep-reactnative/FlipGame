import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// action types
const SAVE_GAME_DATA = 'SAVE_GAME_DATA';

// actions
export const saveGameData = ({name, score}) => {
  return {
    type: SAVE_GAME_DATA,
    payload: {name, score},
  };
};

// reducer
const initialState = [];

const scoresReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_GAME_DATA:
      return [...state, action.payload];
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  scoresReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer);
export let persistor = persistStore(store);
