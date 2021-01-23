/**
 * Filename: DataRowActions.js
 * Author: Jose A Felix
 * Description: DataRowActions component
 */

// ----------------------------------------------------------------

/** Components */
import React from "react";
import Container from "../../generic/Container.js";
import Button from "../../generic/Button.js";
import Modal from "react-bootstrap/Modal";

/** Images */
import EditIcon from "../../../img/edit.svg";
import DeleteIcon from "../../../img/delete.svg";
import SaveIcon from "../../../img/save.svg";
import CancelIcon from "../../../img/cancel.svg";

// ----------------------------------------------------------------

/** Main component */
class DataRowActions extends React.Component {
	// Constructor
	constructor(props) {
		super(props);

		// Component state
		this.state = {
			actionsType: this.props.type, // the data row actions type, to display cutom actions accordingly
			displayModal: false, // handles modal displaying
		};
	}

	// ----------------------------------------------------------------

	/** Lifecycle methods */

	// getDerivedStateFromProps
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.type) {
			return {
				actionsType: nextProps.type,
			};
		} else return null;
	}

	// ----------------------------------------------------------------
	/** Functions */

	/**
	 * onHandleModal function
	 * Helps to handle modal displaying
	 * @param {boolean} state - the state to set for modal displaying
	 */
	onHandleModal = (state) => {
		this.setState({ displayModal: state });
	};

	/**
	 * setModal function
	 * Helps to set the modal confirmation content
	 */
	setDeletingModalConfirmation = () => {
		return (
			<Modal
				show={this.state.displayModal}
				backdrop="static"
				keyboard={false}
				aria-labelledby="contained-modal-title-vcenter"
				centered
				animation={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Item deleting</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you ok deleting this item?</Modal.Body>
				<Modal.Footer>
					<Button
						class="btn-light mr-3"
						name="No"
						onClick={() => this.onHandleModal(false)}
					/>
					<Button
						class="btn-primary"
						name="Yes"
						onClick={() => this.onClickDeletingAction("deleteConfirmation")}
					/>
				</Modal.Footer>
			</Modal>
		);
	};

	/**
	 * onClickDeletingAction function
	 * Handles deleting process when clicking on delete button
	 * @param {string} actionSource - the action source where the delete button was triggered
	 */
	onClickDeletingAction = (actionSource) => {
		switch (actionSource) {
			case "new":
				this.props.onDeletingItem("new");
				break;

			case "deleteConfirmation":
				this.onHandleModal(false);
				this.props.onDeletingItem();
				break;

			default:
				this.onHandleModal(true);
				break;
		}
	};

	/**
	 * setDataRowActionsContent function
	 * Helps to set up the data row actions content type
	 */
	setDataRowActionsContent = () => {
		let dataRowActionsContent = null;

		// Create row based on type
		switch (this.state.actionsType) {
			// Data row new type
			case "new":
				dataRowActionsContent = (
					<Container class="edit-actions" name="data-row-actions">
						<Container name="save-actions">
							<img alt="Save item" src={SaveIcon} />
						</Container>
						<Container
							name="delete-actions"
							onClick={() => this.onClickDeletingAction("new")}
						>
							<img alt="Delete item" src={DeleteIcon} />
						</Container>
					</Container>
				);
				break;

			// Data row edit type
			case "edit":
				dataRowActionsContent = (
					<Container class="edit-actions" name="data-row-actions">
						<Container name="save-actions">
							<img alt="Save item" src={SaveIcon} />
						</Container>
						<Container
							name="cancel-actions"
							onClick={() => this.props.onEditingItem("view")}
						>
							<img alt="Cancel editing item" src={CancelIcon} />
						</Container>
					</Container>
				);
				break;

			// Data row view type
			case "view":
			default:
				dataRowActionsContent = [
					<Container key="data-row-actions" name="data-row-actions">
						<Container
							name="edit-actions"
							onClick={() => this.props.onEditingItem("edit")}
						>
							<img alt="Edit item" src={EditIcon} />
						</Container>
						<Container
							name="delete-actions"
							onClick={this.onClickDeletingAction}
						>
							<img alt="Delete item" src={DeleteIcon} />
						</Container>

						{/** Modal dialog when deleting */}
						{this.setDeletingModalConfirmation()}
					</Container>,
					<Container
						key="data-row-actions-background"
						name="data-row-actions-background"
					></Container>,
				];
				break;
		}

		return dataRowActionsContent;
	};

	// ----------------------------------------------------------------

	// Rendering component
	render() {
		return this.setDataRowActionsContent();
	}
}

export default DataRowActions;
