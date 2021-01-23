/**
 * Filename: Workspace.js
 * Author: Jose A Felix
 * Description: Workspace component
 */

// ----------------------------------------------------------------

/** Components */
import React from "react";
import Container from "../generic/Container";

// ----------------------------------------------------------------

/** Main component */
class Workspace extends React.Component {
	// Rendering component
	render() {
		return (
			/** Workspace container */
			<Container name="workspace" class={`p-3${this.props.class || ""}`} style={{ flex: "1 1 auto" }}>
				{this.props.children}
			</Container>
		);
	}
}

export default Workspace;
