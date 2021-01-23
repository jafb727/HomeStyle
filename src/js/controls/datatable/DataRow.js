/**
 * Filename: DataRow.js
 * Author: Jose A Felix
 * Description: DataRow component
 */

// ----------------------------------------------------------------

/** Scripts */
import util from "../../utils/util.js";

/** Components */
import React from "react";
import Row from "react-bootstrap/Row";
import FormView from "../../generic/FormView.js";
import DataRowActions from "./DataRowActions.js";

// ----------------------------------------------------------------

/** Main component */
class DataRow extends React.Component {
	// Constructor
	constructor(props) {
		super(props);

		// Component state
		this.state = {
			displayActions: false, // Flag to handle actions displaying
			dataRowSource: this.props.item, // The source which the data row will be filled
			dataRowtype: this.props.type, // the type of the data row
			isBeingEdited: false, // If the row is being edited
		};
	}

	// ----------------------------------------------------------------

	/** Lifecycle methods */

	// getDerivedStateFromProps
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.item) {
			return {
				dataRowSource: nextProps.item,
			};
		} else return null;
	}

	// ----------------------------------------------------------------

	/**
	 * toggleActions function
	 * Helps to handle the item actions display
	 */
	toggleActions = (event) => {
		this.setState({
			displayActions: !this.state.displayActions,
		});
	};

	/**
	 * setDataChunk function
	 * Helps to set the row information. The data chunk
	 */
	setDataChunk = () => {
		return util.buildDataChunkContent(
			this.props.scheme,
			this.state.dataRowSource,
			false,
			"col",
			{
				displayImage: this.props.displayImage,
			}
		);
	};

	/**
	 * onAddingNewItem function
	 * Defines a custom submit function for the new item action
	 * @param {object} formState - the form state containing all data and properties
	 */
	onAddingNewItem = (formState) => {
		// Adding item to local storage
		const result = util.addItem("items", formState.initialDataMap);

		if (result.success) {
			// Updates global app data
			this.props.updateAppData();
		}
	};

	/**
	 * onEditingItem function
	 * Defines a custom submit function for the edit item action
	 * @param {string} dataRowType - the new data row type
	 */
	onEditingItem = (dataRowType) => {
		this.setState({
			dataRowtype: dataRowType,
			isBeingEdited: "edit" ? true : false,
		});
	};

	/**
	 * onEditingItem function
	 * Defines a custom submit function for the edit item action
	 * @param {string} actionSource - the action source where the delete button was triggered
	 */
	onDeletingItem = (actionSource) => {
		switch (actionSource) {
			case "new":
				this.props.onSettingNewRowVisibility(false);
				break;

			default:
				const filterResult = this.props.dataSource.filter(
					(item) => item.productId !== this.state.dataRowSource.productId
				);
				this.props.onUpdateDataSource(filterResult, true);
				break;
		}
	};

	/**
	 * setDataRowContent function
	 * Helps to set up the data row content type
	 */
	setDataRowContent = () => {
		let dataRowContent = null;
		const rowClass = "data-row py-2";

		// Create row based on type
		switch (true) {
			// Data row new type
			case this.state.dataRowtype === "new":
				dataRowContent = (
					<Row
						className={rowClass}
						onMouseEnter={(event) => this.toggleActions(event)}
						onMouseLeave={(event) => this.toggleActions(event)}
					>
						<FormView
							type="new"
							scheme={this.props.scheme}
							onSubmit={this.onAddingNewItem}
							inLineOrientation={true}
						/>

						{/** Item actions */}
						{this.state.displayActions ? (
							<DataRowActions onDeletingItem={this.onDeletingItem} type="new" />
						) : null}
					</Row>
				);
				break;

			// Data row edit type
			case this.state.dataRowtype === "edit" || this.state.isBeingEdited:
				dataRowContent = (
					<Row
						className={rowClass}
						onMouseEnter={(event) => this.toggleActions(event)}
						onMouseLeave={(event) => this.toggleActions(event)}
					>
						<FormView
							type="edit"
							scheme={this.props.scheme}
							onSubmit={this.onEditingItem}
							inLineOrientation={true}
							dataSource={this.state.dataRowSource}
						/>

						{/** Item actions */}
						{this.state.displayActions ? (
							<DataRowActions
								onDeletingItem={this.onDeletingItem}
								onEditingItem={this.onEditingItem}
								type={this.state.dataRowtype}
							/>
						) : null}
					</Row>
				);
				break;

			// Data row view type
			case this.state.dataRowtype === "view":
			default:
				dataRowContent = (
					<Row
						className={rowClass}
						onMouseEnter={(event) => this.toggleActions(event)}
						onMouseLeave={(event) => this.toggleActions(event)}
					>
						{/** Creating each data chunk per item row */}
						{this.setDataChunk()}

						{/** Item actions */}
						{this.state.displayActions ? (
							<DataRowActions
								onDeletingItem={this.onDeletingItem}
								onEditingItem={this.onEditingItem}
								type={this.state.dataRowtype}
							/>
						) : null}
					</Row>
				);
				break;
		}

		return dataRowContent;
	};

	// ----------------------------------------------------------------

	// Rendering component
	render() {
		return this.setDataRowContent();
	}
}

export default DataRow;
