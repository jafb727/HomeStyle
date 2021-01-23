/**
 * Filename: ViewControls.js
 * Author: Jose A Felix
 * Description: ViewControls component
 */

// ----------------------------------------------------------------

/** Components */
import React from "react";
import Container from "../generic/Container";

// ----------------------------------------------------------------

/** Main component */
class ViewControls extends React.Component {
	// Rendering component
	render() {
		return (
			/** ViewControls container */
			<Container name="view-controls" class="form-inline pb-2">
                    {this.props.children}
			</Container>
		);
	}
}

export default ViewControls;
