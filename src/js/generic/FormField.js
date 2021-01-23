/**
 * Filename: FormField.js
 * Author: Jose A Felix
 * Description: FormField component
 */

// ----------------------------------------------------------------

/** Scripts */
import util from "../utils/util.js";

/** Components */
import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Cleave from "cleave.js/react";
import Container from "./Container";
import Star from "../other/Star";

/** Images */
import DefaultImage from "../../img/default-image.svg";

// ----------------------------------------------------------------

/** Main component */
class FormField extends React.Component {
	// Constructor
	constructor(props) {
		super(props);

		// Component status
		this.state = {
			fieldValue: this.props.dataSource || "", // Current field value
		};
	}

	// ----------------------------------------------------------------
	/** Lifecycle methods */

	// getDerivedStateFromProps
	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			fieldValue: nextProps.dataSource,
		};
	}

	// ----------------------------------------------------------------

	/**
	 * forkBasedOnFormType function
	 * Helps to decide which kind of field to create based on form type
	 */
	forkBasedOnFormType = () => {
		let execute = null;

		// Deciding which field setting to display according to form type
		switch (this.props.formType) {
			case "edit":
			case "new":
				execute = this.setEditableFormField;
				break;

			default:
				execute = this.setViewableFormField;
				break;
		}

		// Performing field set up
		return execute(this.props.formFieldSetUp, this.props.inLineOrientation);
	};

	/**
	 * setEditableFormField function
	 * Helps to define a editable field
	 * @param {object} formFieldSetUp - a JSON object containing field configuration
	 * @param {boolean} inLineOrientation - defines if the form must shown in a simple row like a table row or not
	 */
	setEditableFormField = (formFieldSetUp, inLineOrientation) => {
		// Defining column width in case the business logic needed
		let bs4Width = util.setBS4ColWidth(
			formFieldSetUp.bs4ColumnWidth,
			inLineOrientation
		);

		/** Optional parameters */

		// Setting field properties dinamically
		let options = {
			required: formFieldSetUp.required ? "required" : null,
			onChange: this.props.onChange
				? (event) => this.props.onChange(event)
				: null,
			className: formFieldSetUp.styleFieldClass || "",
		};

		// ----------------------------------------------------------------

		/** Optional markup */

		// Additional markup for required fields
		let requiredMarkup = formFieldSetUp.required ? (
			<span className="required-field">*</span>
		) : null;

		// ----------------------------------------------------------------

		/**
		 * Deciding if displaying field in form or not depending on some conditions.
		 * When editing or creating a new item the fields to display will depend on
		 * the user action. If user is creating an item using a table as trigger or a page form
		 */

		let formFieldContent = null;

		// Displaying configured fields in data scheme
		// Some fields must be hide like Id
		if (
			(!this.props.inLineOrientation && formFieldSetUp.displayEditForm) ||
			(this.props.inLineOrientation && formFieldSetUp.displayViewList)
		) {
			switch (formFieldSetUp.type) {
				// Currency field
				case "currency":
					// Currency control Id
					const currencyCtrlId = `form${util.capitalizeFirstLetter(
						formFieldSetUp.name
					)}`;

					formFieldContent = (
						<Form.Group controlId={currencyCtrlId} className={bs4Width}>
							{/** Hiding label when orientation is table, like a table row */}
							{!this.props.inLineOrientation ? (
								<Form.Label>
									{formFieldSetUp.displayName}
									{requiredMarkup}
								</Form.Label>
							) : null}

							{/** Field control */}
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text>$</InputGroup.Text>
								</InputGroup.Prepend>
								<Cleave
									{...options}
									id={currencyCtrlId}
									name={formFieldSetUp.name}
									className="form-control"
									placeholder={formFieldSetUp.placeholder}
									options={{ numeral: true }}
									value={this.state.fieldValue}
								/>
								<Form.Control.Feedback type="invalid">
									{/** Validation label message not displaying in table orientation*/}
									{!this.props.inLineOrientation
										? `Please type any ${formFieldSetUp.displayName}.`
										: null}
								</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>
					);
					break;

				default:
					formFieldContent = (
						<Form.Group
							controlId={`form${util.capitalizeFirstLetter(
								formFieldSetUp.name
							)}`}
							className={bs4Width}
						>
							{/** Hiding label when orientation is table, like a table row */}
							{!this.props.inLineOrientation ? (
								<Form.Label>
									{formFieldSetUp.displayName}
									{requiredMarkup}
								</Form.Label>
							) : null}

							{/** Field control */}
							<Form.Control
								{...options}
								name={formFieldSetUp.name}
								type={formFieldSetUp.type}
								placeholder={formFieldSetUp.placeholder}
								className="fluid"
								value={this.state.fieldValue}
							/>
							<Form.Control.Feedback type="invalid">
								{/** Validation label message not displaying in table orientation*/}
								{!this.props.inLineOrientation
									? `Please type any ${formFieldSetUp.displayName}.`
									: null}
							</Form.Control.Feedback>
						</Form.Group>
					);
					break;
			}
		}

		return formFieldContent;
	};

	/**
	 * setViewableFormField function
	 * Helps to define a viewable field
	 * @param {object} formFieldSetUp - the field set up inside the data scheme
	 */
	setViewableFormField = (formFieldSetUp) => {
		let formFieldContent = null;

		// Check if field must be rendered
		const forceDisplay = this.props.forceDisplay ? true : false;

		// Displaying FormField if configurated as well in field set up
		if (formFieldSetUp.displayViewForm || forceDisplay) {
			// Deciding which field content return
			switch (formFieldSetUp.viewDataChunkType) {
				case "rating":
					formFieldContent = (
						<Container name="sub" class="row">
							<label className="col-4 col-form-label">
								{formFieldSetUp.displayName}
							</label>

							{/** Field control */}
							<div className="col-8 col-form-label">
								<Star rating={this.state.fieldValue} />
							</div>
						</Container>
					);
					break;

				case "image":
					let imageUrl = this.state.fieldValue;
					imageUrl = imageUrl ? imageUrl : DefaultImage;

					formFieldContent = (
						<Container name="image">
							<img className="large-image" alt="Item" src={imageUrl} />
						</Container>
					);
					break;

				default:
					formFieldContent = (
						<Container name="field" class="row">
							<label className="col-4 col-form-label">
								{formFieldSetUp.displayName}
							</label>

							{/** Field control */}
							<div className="col-8 col-form-label">
								{formFieldSetUp.viewDataChunkType === "currency"
									? `$${this.state.fieldValue}`
									: this.state.fieldValue}
							</div>
						</Container>
					);
					break;
			}
		}

		return formFieldContent;
	};

	// Rendering component
	render() {
		return this.forkBasedOnFormType();
	}
}

export default FormField;
