/**
 * Filename: Container.js
 * Author: Jose A Felix
 * Description: Container component
 */

// ----------------------------------------------------------------

/** Components */
import React from "react";

// ----------------------------------------------------------------

/** Main component */
class Container extends React.Component {
	// Constructor
	constructor(props) {
		super(props);

		// Component state
		this.state = {
			defaultName: "generic",
		};
	}

	/**
	 * setContainerType function
	 * Helps to define the content to render for the field according to properties
	 * @returns {oject} Container markup
	 */
	setContainerType = () => {
		let MarkupTag = null;

		// Decides if class property will be applied
		const extraClass = this.props.class ? ` ${this.props.class}` : "";

		// If a name for the container was not provided then use a generic
		const defaultName = this.props.name
			? this.props.name
			: this.state.defaultName;

		// Options
		let options = {
			className: `${defaultName}-container${extraClass}`,
			onClick: this.props.onClick ? (event) => this.props.onClick(event) : null,
			style: this.props.style || null,
		};

		// ----------------------------------------------------------------

		// Deciding which content to return
		switch (true) {
			// Generic container
			case !this.props.type:
				MarkupTag = "div";
				break;

			// Default container
			default:
				MarkupTag = this.props.type;
				break;
		}

		return <MarkupTag {...options}>{this.props.children}</MarkupTag>;
	};

	// Rendering component
	render() {
		return this.setContainerType();
	}
}

export default Container;
