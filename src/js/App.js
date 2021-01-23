/**
 * Filename: App.js
 * Author: Jose A Felix
 * Description: App component
 */

// ----------------------------------------------------------------

/** Stylesheet */
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/main.css";

/** Components */
import React from "react";
import { Route, Switch } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Home from "./view/Home";
import Detail from "./view/Detail";
import Edition from "./view/Edition";
import SignUp from "./view/SignUp";
import LogIn from "./view/LogIn";
import Container from "./generic/Container";
import Ribbon from "./layout/Ribbon";

// ----------------------------------------------------------------

/** Main component */
class App extends React.Component {
	// Constructor
	constructor(props) {
		super(props);

		// Component state
		this.state = {
			currentUser: null, // Current user logged
			onUserLogIn: this.onUserLogIn, // Function to set the user logged info
			onUserLogOut: this.onUserLogOut, // Function to set the user logged info
		};
	}

	/**
	 * onUserLogIn function
	 * Sets a login state based on check result
	 * @param {object} userLogged - the user looged information
	 */
	onUserLogIn = (userLogged) => {
		this.setState({
			currentUser: userLogged,
		});
	};

	/**
	 * onUserLogOut function
	 * Helps the user to log out from application
	 */
	onUserLogOut = (history) => {
		// Routing to root using routing history
		history.push("/");

		// Logging out using the onUserLogIn event
		this.onUserLogIn(null);
	};

	// ----------------------------------------------------------------

	// Rendering component
	render() {
		return (
			/** App main container */
			<Container name="app">
				{/** Displays login in case user has not log in */}
				{!this.state.currentUser ? (
					/** Main container */
					<Container name="main">
						<Switch>
							<UserContext.Provider value={this.state}>
								{/** Log in view */}
								<Route exact path="/HomeStyle">
									<LogIn />
								</Route>

								{/** Log up view */}
								<Route path="/HomeStyle/logup">
									<SignUp />
								</Route>
							</UserContext.Provider>
						</Switch>
					</Container>
				) : (
					/** Enter application UI */
					[
						<UserContext.Provider value={this.state} key="ribbon">
							{/** Ribbon */}
							<Ribbon />
						</UserContext.Provider>,

						/** Main container */
						<Container name="main" key="main">
							<Switch>
								{/** Home view */}
								<Route exact path="/HomeStyle">
									{/*<Home />*/}
									<Home />
								</Route>

								{/** Detail product view */}
								<Route path={`/HomeStyle/product/:id`}>
									<Detail />
								</Route>

								{/** New item view */}
								<Route path="/HomeStyle/new">
									<Edition />
								</Route>
							</Switch>
						</Container>,
					]
				)}
			</Container>
		);
	}
}

export default App;
