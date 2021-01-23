/**
 * Filename: SignUp.js
 * Author: Jose A Felix
 * Description: SignUp component
 */

// ----------------------------------------------------------------

/** Scripts */
import util from "../utils/util.js";

/** Components */
import React from "react";
import { Link, withRouter } from "react-router-dom";
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
class SignUp extends React.Component {
	// Constructor
	constructor(props) {
		super(props);

		// Component state
		this.state = {
			signUpScheme: [
				{
					name: "username",
					displayName: "Account",
					placeholder: "Enter an account name",
					type: "text",
					displayEditForm: true,
					required: true,
				},
				{
					name: "email",
					displayName: "Email",
					placeholder: "Enter an email",
					type: "email",
					displayEditForm: true,
					required: true,
				},
				{
					name: "password",
					displayName: "Password",
					placeholder: "Enter a password",
					type: "password",
					displayEditForm: true,
					required: true,
				},
			],
		};
	}

	/**
	 * onUserSignUp function
	 * Defines the custom action to do when submittting a sign up form
	 * @param {object} formState - the formview state validation
	 */
	onUserSignUp = (formState, onUserLogIn) => {
		// Routing to root
          this.props.history.push("/");
          
          // Changing current user in the user context
		onUserLogIn({
			id: 3,
			username: formState.initialDataMap.username,
			password: formState.initialDataMap.password,
			email: formState.initialDataMap.email,
			displayName: util.capitalizeFirstLetter(
				formState.initialDataMap.username
			),
		});
	};

	// ----------------------------------------------------------------

	// Rendering component
	render() {
		return (
			/** Log up page container  */
			<Container name="view" class="d-flex log-view-background">
				{/** App title */}
				<AppTitle isNavbar={true} style={{ position: "absolute" }} />

				{/** Workspace container */}
				<Workspace class=" d-flex flex-centered">
					{/** View content container  */}
					<Container class="d-flex log-box">
						{/** Log up introduction */}
						<Container name="log-intro" class="signup-background-image ">
							{/** Log up intro title */}
							<Container name="log-intro-title">
								{/** App title */}
								<AppTitle isNavbar={false} />

								{/** Brand legend */}
								<span>Style is not the luxury's property</span>

								<p style={{ margin: "2rem", fontWeight: "100" }}>
									Find a wide variety in home decoration articles in the number
									one social market in the world.
								</p>
							</Container>

							{/** Log up intro background */}
							<Container name="log-intro-background"></Container>
						</Container>

						{/** Log up sign up */}
						<Container name="log-form">
							{/** Brand legend */}
							<h4 className="form-title">Sign up</h4>

							<UserContext.Consumer>
								{({ onUserLogIn }) => (
									/** FormView */
									<FormView
										scheme={this.state.signUpScheme}
										type="edit"
										hideControls
										onSubmit={(formState) => this.onUserSignUp(formState, onUserLogIn)}
									>
										{/** Form controls */}
										<Form.Group className="d-flex justify-content-end">
											<Button
												type="submit"
												class="btn-primary"
												name="Register"
											/>
										</Form.Group>
									</FormView>
								)}
							</UserContext.Consumer>

							<p
								style={{
									fontWeight: "100",
									position: "absolute",
									bottom: "1rem",
								}}
							>
								Do you already have an account? <Link to="/">Log in</Link>
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

export default withRouter(SignUp);
