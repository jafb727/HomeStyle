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
			dataRowType: this.props.type, // the type of the data row
			isBeingEdited: false, // If the row is being edited
			dataRowFormMap: [], // Holds the updated inserted data when the data row converts into a form
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
	 * setDataRowFormMap function
	 * Sets the value for the dataRowFormMap to use it in the DataRowActions component
	 * @param {object} dataMap - the dataMap collected by the form view events
	 */
	setDataRowFormMap = (dataMap) => {
		this.setState({
			dataRowFormMap: dataMap,
		});
	};

	/**
	 * toggleActions function
	 * Helps to handle the item actions display
	 * @param {boolean} state - the state to set in displayActions flag
	 */
	toggleActions = (state) => {
		this.setState({
			displayActions: state,
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
	 * onSavingItem function
	 * Defines a custom submit function for the new item action
	 * @param {string} savingType - the saving type to apply a different saving logic
	 */
	onSavingItem = (savingType) => {
		let processedDataSource = null;
		const dataMap = this.state.dataRowFormMap;

		switch (savingType) {
			case "new":
				// Defining new random id for item
				const itemId = util.getRandomInt(20, 100);
				dataMap["productId"] = itemId;

				processedDataSource = this.props.dataSource;
				processedDataSource.push(dataMap);

				this.props.onSettingNewRowVisibility(false);
				break;

			case "edit":
			default:
				processedDataSource = this.props.dataSource.map((item) => {
					if (item.productId === dataMap.productId) {
						for (let key of Object.keys(dataMap)) {
							item[key] = dataMap[key];
						}
					}
					return item;
				});

				// Returning edit row to view mode
				this.setState({
					isBeingEdited: false,
					dataRowType: "view",
				});
				break;
		}

		// Updating datatable data source
		this.props.onUpdateDataSource(processedDataSource, false);
	};

	/**
	 * onEditingItem function
	 * Defines a custom submit function for the edit item action
	 * @param {string} dataRowType - the new data row type
	 */
	onEditingItem = (dataRowType) => {
		this.setState({
			dataRowType: dataRowType,
			isBeingEdited: dataRowType === "edit" ? true : false,
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
			case this.state.dataRowType === "new":
				dataRowContent = (
					<Row
						className={rowClass}
						onMouseEnter={() => this.toggleActions(true)}
						onMouseLeave={() => this.toggleActions(false)}
					>
						<FormView
							type="new"
							scheme={this.props.scheme}
							onSubmit={this.onSavingItem}
							inLineOrientation={true}
							setDataRowFormMap={this.setDataRowFormMap}
						/>

						{/** Item actions */}
						{this.state.displayActions ? (
							<DataRowActions
								onDeletingItem={this.onDeletingItem}
								onSavingItem={this.onSavingItem}
								type="new"
							/>
						) : null}
					</Row>
				);
				break;

			// Data row edit type
			case this.state.dataRowType === "edit" || this.state.isBeingEdited:
				dataRowContent = (
					<Row
						className={rowClass}
						onMouseEnter={() => this.toggleActions(true)}
						onMouseLeave={() => this.toggleActions(false)}
					>
						<FormView
							type="edit"
							scheme={this.props.scheme}
							onSubmit={this.onEditingItem}
							inLineOrientation={true}
							dataSource={this.state.dataRowSource}
							setDataRowFormMap={this.setDataRowFormMap}
						/>

						{/** Item actions */}
						{this.state.displayActions ? (
							<DataRowActions
								onDeletingItem={this.onDeletingItem}
								onEditingItem={this.onEditingItem}
								onSavingItem={this.onSavingItem}
								type={this.state.dataRowType}
							/>
						) : null}
					</Row>
				);
				break;

			// Data row view type
			case this.state.dataRowType === "view":
			default:
				dataRowContent = (
					<Row
						className={rowClass}
						onMouseEnter={() => this.toggleActions(true)}
						onMouseLeave={() => this.toggleActions(false)}
					>
						{/** Creating each data chunk per item row */}
						{this.setDataChunk()}

						{/** Item actions */}
						{this.state.displayActions ? (
							<DataRowActions
								onDeletingItem={this.onDeletingItem}
								onEditingItem={this.onEditingItem}
								onToggleActions={this.toggleActions}
								type={this.state.dataRowType}
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
