/**
 * Filename: Edition.js
 * Author: Jose A Felix
 * Description: Edition component
 */

// ----------------------------------------------------------------

/** Scripts */
import util from "../utils/util.js";

/** Components */
import React from "react";
import Sidebar from "../layout/Sidebar";
import Workspace from "../layout/Workspace";
import ViewHeader from "../layout/ViewHeader";
import ViewContent from "../layout/ViewContent";
import Container from "../generic/Container";
import FormView from "../generic/FormView";

// ----------------------------------------------------------------

/** Main component */
class Edition extends React.Component {
	// Constructor
	constructor(props) {
		super(props);

		// Component state
		this.state = {
			scheme: this.props.scheme.sort(util.sortByDataChunk("formOrder")),
			// Ordering scheme according to order property
		};
	}

	/**
	 * newItemSubmit function
	 * Defines a custom submit function for this edition view
	 */
	newItemSubmit = (formState) => {
		// Adding item to local storage
		const result = util.addItem("items", formState.initialDataMap);

		if (result.success) {
			// Updates global app data
			this.props.updateAppData();
			util.back();
		}
	};

	// ----------------------------------------------------------------

	// Rendering component
	render() {
		return (
			/** Edition page container  */
			<Container name="view" class="d-flex">
				{/** Left navigation */}
				<Sidebar itemSelected="NewItemIcon" />

				{/** Workspace container */}
				<Workspace>
					{/** View header container */}
					<ViewHeader title="New item" />

					{/** View content container  */}
					<ViewContent>
						{/** Form container */}
						<Container name="form">
							{/** FormView */}
							<FormView
								type="new"
								scheme={this.state.scheme}
								onSubmit={this.newItemSubmit}
                                        inLineOrientation={false}
							/>
						</Container>
					</ViewContent>
				</Workspace>
			</Container>
		);
	}
}

export default Edition;
