/**
 * Filename: Detail.js
 * Author: Jose A Felix
 * Description: Detail component
 */

// ----------------------------------------------------------------

/** Scripts */
import util from "../utils/util.js";

/** Components */
import React from "react";
import { withRouter } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Workspace from "../layout/Workspace";
import ViewHeader from "../layout/ViewHeader";
import ViewControls from "../layout/ViewControls";
import ViewContent from "../layout/ViewContent";
import Container from "../generic/Container";
import FormView from "../generic/FormView";
import FormField from "../generic/FormField";
import Button from "../generic/Button";

// ----------------------------------------------------------------

/** Main component */
class Detail extends React.Component {
	// Constructor
	constructor(props) {
		super(props);

		// Component state
		this.state = {
			scheme: this.props.scheme.sort(util.sortByDataChunk("formOrder")),
			// Ordering scheme according to order property
			item: null, // The item picked by user from last view
		};
	}

	// ----------------------------------------------------------------

	/** Lifecycle methods */

	/**
	 * componentDidMount
	 */
	componentDidMount() {
		// Getting routing url parameters :id
		const itemId = this.props.match.params.id;

		// Getting data scheme data chunk that serves as an identifier
		const pivotDataChunk = util.getPivotDataChunk(this.state.scheme);

		// Searching item inside data by an identifier data chunk
		const item = this.props.data.find(
			(item) => item[pivotDataChunk.name] === Number(itemId)
		);

		// This helps to load the item's information
		// reading the incoming QS
		this.setState({
			item: item,
		});
	}

	// ----------------------------------------------------------------

	// Rendering component
	render() {
		return (
			/** Detail page container  */
			<Container name="view" class="d-flex">
				{/** Left navigation */}
				<Sidebar />

				{/** Workspace container */}
				<Workspace>
					{/** View header container */}
					<ViewHeader
						title={this.state.item ? this.state.item.productName : "Detalle"}
					/>

					{/** View controls container  */}
					<ViewControls>
						<Button
							type="back"
							class="btn-light"
							name="Back"
							onClick={util.back}
						/>
					</ViewControls>

					{/** Showing form container if there is a data to present */}
					{this.state.item ? (
						/** View content container  */
						<ViewContent class=" d-flex">
							{/** FormView detail container */}
							<Container name="form" class="p-2 col-8">
								{/** FormView */}
								<FormView
									type="view"
									scheme={this.state.scheme}
									dataSource={this.state.item}
                                             orientation="vertical"
								/>
							</Container>

							{/** Image detail container */}
							<Container
								name="item-image"
								class="p-2 col-4 d-flex align-items-center"
							>
								<FormField
									type="image"
									formFieldSetUp={util.getDataChunkSetUp(
										this.state.scheme,
										"imageUrl"
									)}
									formType="view"
									dataSource={this.state.item}
									forceDisplay={true}
								/>
							</Container>
						</ViewContent>
					) : null}
				</Workspace>
			</Container>
		);
	}
}

export default withRouter(Detail);
