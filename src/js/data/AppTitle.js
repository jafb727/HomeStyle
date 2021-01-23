/**
 * Filename: AppTitle.js
 * Author: Jose A Felix
 * Description: AppTitle component
 */

// ----------------------------------------------------------------

/** Components */
import React from "react";
import Container from "../generic/Container";

// ----------------------------------------------------------------

/** Main component */
class AppTitle extends React.Component {
	// App title container element options
	appTitleContainerOptions = {
		style: this.props.style || null,
	};

     // App title CSS classes
	appTitleHeaderClass = this.props.isNavbar ? `navbar-brand mb-0 h1$` : "";
	appTitleContainerClass = this.props.isNavbar ? "py-1 px-3" : "";

	// Rendering component
	render() {
		return (
			/** AppTitle container  */
			<Container
				name="app-title"
				class={`${this.appTitleContainerClass}`}
				{...this.appTitleContainerOptions}
			>
				{/** App title */}
				<h1 className={`app-title ${this.appTitleHeaderClass}`}>Home Style</h1>
			</Container>
		);
	}
}

export default AppTitle;
