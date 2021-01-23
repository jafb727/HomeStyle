/**
 * Filename: FloatingBox.js
 * Author: Jose A Felix
 * Description: FloatingBox component
 */

// ----------------------------------------------------------------

/** Components */
import React from "react";
import Popover from "react-bootstrap/Popover";

// ----------------------------------------------------------------

/** Main component */
class FloatingBox extends React.Component {
	// Rendering component
	render() {
		return (
			/** Popover container  */
			<Popover {...this.props} className="floatingBox">
				<Popover.Content>{this.props.children}</Popover.Content>
			</Popover>
		);
	}
}

export default FloatingBox;
