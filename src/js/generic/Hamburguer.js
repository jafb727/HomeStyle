/**
 * Filename: Hamburguer.js
 * Author: Jose A Felix
 * Description: Hamburguer component
 */

// ----------------------------------------------------------------

/** Components */
import React from "react";
import Container from "./Container";

// ----------------------------------------------------------------

/** Main component */
class Hamburguer extends React.Component {
	// Rendering component
	render() {
		return (
			/** Hamburguer menu container */
			<Container
				name="hamburguer"
				class="d-flex flex-column"
				onClick={(event) => this.props.onClick(event)}
			>
				<span></span>
				<span></span>
				<span></span>
			</Container>
		);
	}
}

export default Hamburguer;
