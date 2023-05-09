import {configureStore,combineReducers} from '@reduxjs/toolkit'
import Reducer from './Reducer'
import thunk from 'redux-thunk'
import logger from 'redux-logger'


const rootreducer = combineReducers({task:Reducer});
const Store = configureStore({reducer:rootreducer, middleware:[thunk, logger]});

export default Store;