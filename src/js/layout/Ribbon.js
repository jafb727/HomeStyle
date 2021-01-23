/**
 * Filename: Ribbon.js
 * Author: Jose A Felix
 * Description: Ribbon component
 */

// ----------------------------------------------------------------

/** Components */
import React from "react";
import Container from "../generic/Container";
import AppTitle from "../data/AppTitle";
import ShoopingCart from "../business/ShoopingCart";
import Avatar from "../data/Avatar";
import Help from "../business/Help";

// ----------------------------------------------------------------

/** Main component */
class Ribbon extends React.Component {
	// Rendering component
	render() {
		return (
			/** Ribbon container  */
			<Container
				name="ribbon"
				class="navbar navbar-expand-lg sticky-top align-items-stretch justify-content-between"
			>
				{/** App title */}
				<AppTitle isNavbar={true} />

				{/** App controls */}
				<Container name="app-controls" class="d-flex">
					<ShoopingCart />
					<Help />
					<Avatar type="float" />
				</Container>
			</Container>
		);
	}
}

export default Ribbon;
