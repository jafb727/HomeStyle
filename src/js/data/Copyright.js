/**
 * Filename: Copyright.js
 * Author: Jose A Felix
 * Description: Copyright component
 */

// ----------------------------------------------------------------

/** Components */
import React from "react";
import Container from "../generic/Container";

// ----------------------------------------------------------------

/** Main component */
class Copyright extends React.Component {
	// Rendering component
	render() {
		return (
			/** Copyright container  */
			<Container name="copyright">
				{/** Copyright */}
				<span>Home style. Copyrigth &copy; 2020. All rights reserved.</span>
			</Container>
		);
	}
}

export default Copyright;
