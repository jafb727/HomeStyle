/**
 * Filename: DataTable.js
 * Author: Jose A Felix
 * Description: DataTable component.
 */

// ----------------------------------------------------------------

/** Scripts */
import util from "../../utils/util.js";

/** Components */
import React from "react";
import Row from "react-bootstrap/Row";
import DataRow from "./DataRow";
import Container from "../../generic/Container";
import ViewControls from "../../layout/ViewControls";
import Button from "../../generic/Button";
import Search from "../Search";

// ----------------------------------------------------------------

/** Main component */
class DataTable extends React.Component {
	// Constructor
	constructor(props) {
		super(props);

		// Component state
		this.state = {
			origin: this.props.data, // Original data source
			dataSource: this.props.data, // Data processed in the app
			scheme: this.props.scheme.sort(util.sortByDataChunk("viewOrder")),
			// Ordering scheme according to order property
			allowSearching: this.props.allowSearching || false,
			edition: {
				allowEdition: this.props.allowEdition || false,
				displayNewRow: false, // Handles a new row displaying when clicking in add new item button
				disableAddButton: false, // Handles the new button enabling,
			},
			imageToggling: {
				allowImageToggling: this.props.allowImageToggling || false,
				displayImage: true, // Flag to display or not DataRow image. By default displays
			},
			anItemWasDeleted: false,
		};
	}


	// ----------------------------------------------------------------

	/** Lifecycle methods */

	// componentDidMount
	componentDidMount(){
		this.setState({
			anItemWasDeleted: false,
		});
	};

	// ----------------------------------------------------------------

	/**
	 * onToggleImage function
	 * Helps to toggle the image inside image column
	 */
	onToggleImage = () => {
		this.setState((prevState) => ({
			...prevState,
			imageToggling: {
				...prevState.imageToggling,
				displayImage: !this.state.imageToggling.displayImage,
			},
		}));
	};

	/**
	 * onSettingNewRowVisibility function
	 * Helps to toggle the image inside image column
	 * @param {state} state - the true/false  state to set
	 */
	onSettingNewRowVisibility = (state) => {
		this.setState((prevState) => ({
			...prevState,
			edition: {
				...prevState.edition,
				displayNewRow: state,
				disableAddButton: state,
			},
		}));
	};

	/**
	 * onUpdateDataSource function
	 * Helps to update the data source once invoked
	 * @param {object} filteredData - the filtered data to present in app
	 * @param {boolean} anItemWasDeleted - indicates if the data source updating was performed by a deletion action
	 *
	 */
	onUpdateDataSource = (filteredData, anItemWasDeleted) => {
		this.setState({
			dataSource: filteredData,
			anItemWasDeleted: anItemWasDeleted,
		});
	};

	/**
	 * buildDataTableHeader function
	 * Creates a table header with its content based on a scheme
	 * @returns {object} Header markup
	 */
	buildDataTableHeader = () => {
		return util.buildDataChunkContent(this.state.scheme, null, true, "head");
	};

	/**
	 * updateAppData function
	 * Helps to update the data source once invoked
	 */
	updateAppData = () => {
		// Getting local storage entry that where supposedly updated
		const updatedStorage = util.getLocalStorageEntry("items");

		// Updating global data used in app
		this.setState((prevState) => ({
			...prevState,
			dataSource: updatedStorage,
		}));
	};

	/**
	 * setUpNewItemRow function
	 * Sets up a new editable row in the table to enable user to create a new item
	 * @returns {object} Header markup
	 */
	setUpNewItemRow = () => {
		return (
			<DataRow
				type="new"
				scheme={this.state.scheme}
				updateAppData={this.updateAppData}
				onSettingNewRowVisibility={this.onSettingNewRowVisibility}
			/>
		);
	};

	/**
	 * onDeletingRow function
	 * Sets up a new editable row in the table to enable user to create a new item
	 * @returns {object} Header markup
	 */
	onDeletingRow = () => {};

	// ----------------------------------------------------------------

	// Rendering component
	render() {
		return (
			<Container>
				{/** Table controls container  */}
				<ViewControls>
					{/** Add new item button  */}
					{this.state.edition.allowEdition ? (
						<Button
							class="btn-primary mr-3"
							name="+ Add new"
							onClick={() => this.onSettingNewRowVisibility(true)}
							disabled={this.state.edition.disableAddButton}
						/>
					) : null}

					{/** Toggle image button  */}
					{this.state.imageToggling.allowImageToggling ? (
						<Button
							class="btn-outline-secondary"
							name="Toggle image"
							onClick={this.onToggleImage}
						/>
					) : null}

					{/** Search control  */}
					{this.state.allowSearching ? (
						<Search
							onUpdateDataSource={this.onUpdateDataSource}
							dataToFilter={this.state.dataSource}
							anItemWasDeleted={this.state.anItemWasDeleted}
						/>
					) : null}
				</ViewControls>

				{/** Table content */}
				<div className="p-0 container-fluid">
					{/** DataTable header*/}
					<div className="table-header container-fluid">
						<Row className="py-3">{this.buildDataTableHeader()}</Row>
					</div>

					{/** DataTable body */}
					<div className="table-body container-fluid">
						{this.state.dataSource.map((item, index) => (
							<DataRow
								type="view"
								key={`row-${index}`}
								item={item}
								scheme={this.state.scheme}
								displayImage={this.state.imageToggling.displayImage}
								style={{ margin: 0 }}
								onUpdateDataSource={this.onUpdateDataSource}
								dataSource={this.state.dataSource}
							/>
						))}

						{/** New editable row */}
						{this.state.edition.displayNewRow ? this.setUpNewItemRow() : null}
					</div>
				</div>
			</Container>
		);
	}
}

export default DataTable;
