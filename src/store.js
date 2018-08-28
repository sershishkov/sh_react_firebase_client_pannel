import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
//Reducers
import notifyReducer from './reducers/notifyReducer';

//Нфстройки с https://github.com/prescottprue/react-redux-firebase

const firebaseConfig = {
  //Скопировано с сайта firebase 
  //https://console.firebase.google.com/project/sh-react-client-panel/overview 
    apiKey: "AIzaSyAQwlB22t7hSorUu7HH3CZOiqKotOetWec",
    authDomain: "sh-react-client-panel.firebaseapp.com",
    databaseURL: "https://sh-react-client-panel.firebaseio.com",
    projectId: "sh-react-client-panel",
    storageBucket: "sh-react-client-panel.appspot.com",
    messagingSenderId: "149159982683"
}
//react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

//Init firebase instance
firebase.initializeApp(firebaseConfig);
//init firestore
const firestore = firebase.firestore();


  const settings = { timestampsInSnapshots: true};
  firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase  : firebaseReducer,
  firestore : firestoreReducer,
  notify    : notifyReducer
});

//Create initial state
const initialState = {};

//Create store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
  reactReduxFirebase(firebase),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;
