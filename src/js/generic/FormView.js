/**
 * Filename: FormView.js
 * Author: Jose A Felix
 * Description: FormView component
 */

// ----------------------------------------------------------------

/** Scripts */
import util from "../utils/util.js";

/** Components */
import React from "react";
import Form from "react-bootstrap/Form";
import Container from "./Container";
import Button from "./Button";
import FormField from "./FormField";

// ----------------------------------------------------------------

/** Main component */
class FormView extends React.Component {
	// Constructor
	constructor(props) {
		super(props);

		// Component state
		this.state = {
			formValidated: false, // Form validation flag
			dataMap: util.mapDataForm(this.props.scheme, this.props.orientation), // Fields to display in form
			inLineOrientation: this.props.inLineOrientation,
			dataSource: this.props.dataSource,
		};
	}

	/**
	 * setFormContent function
	 * Helps to set the form container based on a scheme data
	 * @returns {object} Each FormField markup for scheme
	 */
	setFormContent = () => {
		// Defining some options dinamically
		let options = {
			forceDisplay: this.props.forceDisplay || null,
		};

		// ----------------------------------------------------------------

		// Creating each field in form
		return this.props.scheme.map((field, index) => {
			// Checking if form view display information from an existing item
			if (this.props.type === "view" || this.props.type === "edit") {
				options["dataSource"] =
					this.state.dataMap[field.name] ||
					(this.state.dataSource ? this.state.dataSource[field.name] : "");
			}

			return (
				<FormField
					{...options}
					key={`field-${index}`}
					formFieldSetUp={field}
					formType={this.props.type}
					onChange={this.handleChange}
					inLineOrientation={this.state.inLineOrientation}
				/>
			);
		});
	};

	/**
	 * onSubmitForm function
	 * Form submitting handler
	 * @param {object} event - the DOM element that triggered the event
	 */
	onSubmitForm = (event) => {
		// Checking form validation to use React-boostrap validation in case
		const form = event.currentTarget;
		const formValidity = form.checkValidity();

		// Disabling form default submit action
		event.preventDefault();
		event.stopPropagation();

		// Showing messaging accordingly
		if (!formValidity) {
			this.setState({
				formValidated: true,
			});
		} else {
			// Executing custom submit function
			this.props.onSubmit(this.state);
		}
	};

	/**
	 * handleChange function
	 * Event handler when input control changes
	 * @param {object} event - the DOM element that triggered the event
	 */
	handleChange = (event) => {
		this.setState((prevState) => ({
			dataMap: {
				...prevState.dataMap,
				[event.target.name]: event.target.value,
			},
		}));
	};

	// ----------------------------------------------------------------

	// Rendering component
	render() {
		return (
			<Form
				style={!this.state.inLineOrientation ? { maxWidth: "40rem" } : null}
				noValidate
				validated={this.state.formValidated}
				onSubmit={this.onSubmitForm}
				className={this.state.inLineOrientation ? "form-inline" : null}
			>
				<Container>
					{/** Form fields content */}
					{this.setFormContent()}

					{/** Showing form controls only when editing*/}
					{this.props.type !== "view" &&
					!this.props.hideControls &&
					!this.state.inLineOrientation ? (
						/** Form controls */
						<Form.Group className="d-flex justify-content-end">
							<Button
								class="btn-outline-secondary mr-4"
								name="Back"
								onClick={util.back}
							/>
							<Button type="submit" class="btn-primary" name="Save" />
						</Form.Group>
					) : (
						this.props.children
					)}
				</Container>
			</Form>
		);
	}
}

export default FormView;
