/**
 * Filename: LogIn.js
 * Author: Jose A Felix
 * Description: LogIn component
 */

// ----------------------------------------------------------------

/**JSON data */
import users from "../../data/users.json";

/** Components */
import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Form from "react-bootstrap/Form";
import Workspace from "../layout/Workspace";
import Container from "../generic/Container";
import FormView from "../generic/FormView";
import Button from "../generic/Button";
import AppTitle from "../data/AppTitle";
import Copyright from "../data/Copyright";

// ----------------------------------------------------------------

/** Main component */
class LogIn extends React.Component {
	// Constructor
	constructor(props) {
		super(props);

		// Component state
		this.state = {
			logInScheme: [
				{
					name: "username",
					displayName: "Account",
					placeholder: "Enter your account name",
					type: "text",
					displayEditForm: true,
					required: true,
				},
				{
					name: "password",
					displayName: "Password",
					placeholder: "Enter your password",
					type: "password",
					displayEditForm: true,
					required: true,
				},
			],
			userChecked: true,
		};
	}

	/**
	 * logInExistentUser function
	 * Defines the custom action to do when submittting a sign up form
	 * @param {object} formState - the formview state validation
	 */
	logInExistentUser = (formState, onUserLogIn) => {
		// Performs user credentials validation
		let userChecked = users.filter((user) => {
			if (
				user.username === formState.dataMap.username &&
				user.password === formState.dataMap.password
			) {
				return user;
			} else return null;
		});

		// User checking
		if (userChecked.length > 0) {
			// Changing current user in the user context
			onUserLogIn(userChecked[0]);
		} else {
			// Handles validation message
			this.setState({
				userChecked: false,
			});

			// Changing current user in the user context
			onUserLogIn(null);
		}
	};

	// ----------------------------------------------------------------

	// Rendering component
	render() {
		return (
			/** Detail page container  */
			<Container name="view" class="d-flex log-view-background">
				{/** App title */}
				<AppTitle isNavbar={true} style={{ position: "absolute" }} />

				{/** Workspace container */}
				<Workspace class=" d-flex flex-centered">
					{/** View content container  */}
					<Container class="d-flex log-box">
						{/** Log in introduction */}
						<Container name="log-intro">
							{/** Log in intro title */}
							<Container name="log-intro-title">
								{/** App title */}
								<AppTitle isNavbar={false} />

								{/** Brand legend */}
								<span>Style is not the luxury's property</span>

								<p style={{ margin: "2rem", fontWeight: "100" }}>
									Discover new promotions and articles every day. Follow us in
									our social networks.
								</p>
							</Container>

							{/** Log in intro background */}
							<Container name="log-intro-background"></Container>
						</Container>

						{/** Log in sign up */}
						<Container name="log-form">
							{/** Form title */}
							<h4 className="form-title">Log in</h4>

							<UserContext.Consumer>
								{({ onUserLogIn }) => (
									/** FormView */
									<FormView
										scheme={this.state.logInScheme}
										type="edit"
										hideControls
										onSubmit={(formState) =>
											this.logInExistentUser(formState, onUserLogIn)
										}
									>
										{/** Form controls */}
										<Form.Group className="d-flex justify-content-end">
											<Button type="submit" class="btn-primary" name="Log in" />
										</Form.Group>
									</FormView>
								)}
							</UserContext.Consumer>

							{/** Validation message */}
							{!this.state.userChecked ? (
								<div class="alert alert-danger" role="alert">
									Username or password are incorrect.
								</div>
							) : null}

							{/** Navigation to logup view */}
							<p
								style={{
									fontWeight: "100",
									position: "absolute",
									bottom: "1rem",
								}}
							>
								If you are new, please{" "}
								<Link to="/HomeStyle/logup">create an account</Link>
							</p>
						</Container>
					</Container>
				</Workspace>

				{/** Copyright */}
				<Copyright />
			</Container>
		);
	}
}

export default LogIn;
