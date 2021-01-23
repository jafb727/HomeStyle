/**
 * Filename: ViewContent.js
 * Author: Jose A Felix
 * Description: ViewContent component
 */

// ----------------------------------------------------------------

/** Components */
import React from "react";
import Container from "../generic/Container";

// ----------------------------------------------------------------

/** Main component */
class ViewContent extends React.Component {
	// Rendering component
	render() {
		return (
			/** ViewContent container */
			<Container name="view-content" class={`p-2${this.props.class || ""}`}>
				{this.props.children}
			</Container>
		);
	}
}

export default ViewContent;
