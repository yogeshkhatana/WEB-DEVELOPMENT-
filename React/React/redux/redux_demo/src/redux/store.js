import { applyMiddleware, createStore } from 'redux';  // here it gives capability for creating store
import { composeWithDevTools } from 'redux-devtools-extension'  //for enabling redux extension in browser
// import BallReducer from './balls/ballReducer';
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'

// const  store = createStore(BallReducer,composeWithDevTools());
const  store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));
// for getting thunk capability we use applyMiddleWare(thunk)

export default store;