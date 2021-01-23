/**
 * Filename: ViewHeader.js
 * Author: Jose A Felix
 * Description: ViewHeader component
 */

// ----------------------------------------------------------------

/** Components */
import React from "react";
import Container from "../generic/Container";

// ----------------------------------------------------------------

/** Main component */
class ViewHeader extends React.Component {
	// Rendering component
	render() {
		return (
			/** ViewHeader container */
			<Container name="view-header" class="p-2">
				<h2 className="view-title">{this.props.title}</h2>
				<hr></hr>
				{this.props.children}
			</Container>
		);
	}
}

export default ViewHeader;
