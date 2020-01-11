import React from 'react';
import {Provider} from "react-redux";
import {configureStore} from "../store";
import {BrowserRouter as Router} from 'react-router-dom';
import Navbar from './Navbar';
import Main from './Main';
import {setAuthorizationToken, setCurrentUser} from '../store/actions/auth';
import jwtDecode from 'jwt-decode';


const store = configureStore();
//if our server went down or if our redux store was cleared if the page refreshes we can still see if there is a token in localStorage and if so we can repopulate our state with the current usrer
if(localStorage.jwtToken) {
	setAuthorizationToken(localStorage.jwtToken);
	//prevent someone from manually tampering with the key of jwtToken in localStorage
	try{
		// this will decode the payload part of the token and decode it to the correct object we pass into setCurrentUser which is the user
		// we then dispatch what was decoded from the token to set the current user
		store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
	}catch (err){
		// if they modify the token and it is invalid we will force a logout
		store.dispatch(setCurrentUser({}));
	}
}


const App= ()=> (
  <Provider store={store}>
    <Router>
      <div className="onboarding">
      	<Navbar/>
      	<Main/>
      </div>
    </Router>
  </Provider>
);

export default App;
