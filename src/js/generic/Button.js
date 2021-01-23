/**
 * Filename: Button.js
 * Author: Jose A Felix
 * Description: Button component
 */

// ----------------------------------------------------------------

/** Components */
import React from "react";

/** Images */
import LeftArrowIcon from "../../img/left-arrow.svg";

// ----------------------------------------------------------------

/** Main component */
class Button extends React.PureComponent {
	/**
	 * setButtonStyle function
	 * Helps to define the button's style type content
	 * @returns {object} Button markup
	 */
	setButtonStyle = () => {
		let buttonStyle = null;

		// Setting button properties dinamically
		let options = {
			type: this.props.btnType || null,
			onClick: this.props.onClick
				? (event) => this.props.onClick(event)
				: null,
               style: this.props.style || null,
               disabled: this.props.disabled,
		};

		// ----------------------------------------------------------------

		// Deciding which button style to return
		switch (this.props.type) {
			// Icon button
			case "icon":
				buttonStyle = (
					<img
						{...options}
						className={`${this.props.class}`}
						alt={this.props.name}
						src={this.props.imageUrl}
					/>
				);
				break;

			// Icon text button
			case "iconText":
				buttonStyle = (
					<button className={`btn ${this.props.class}`} {...options}>
						<span>{this.props.name}</span>
						<img
							{...options}
							className="small-icon"
							alt={this.props.name}
							src={this.props.imageUrl}
						/>
					</button>
				);
				break;

			// Back button
			case "back":
				buttonStyle = (
					<button
						{...options}
						className={`btn ${this.props.class} btn-back`}
						type={this.props.type}
					>
						<img className="small-icon" alt="Back" src={LeftArrowIcon} />
						<span>{this.props.name}</span>
					</button>
				);
				break;

			// Generic button
			default:
				buttonStyle = (
					<button {...options} className={`btn ${this.props.class}`}>
						{this.props.name}
					</button>
				);
				break;
		}
		return buttonStyle;
	};

	// Rendering component
	render() {
		return this.setButtonStyle();
	}
}

export default Button;
