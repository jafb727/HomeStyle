/**
 * Filename: Help.js
 * Author: Jose A Felix
 * Description: Help component
 */

// ----------------------------------------------------------------

/** Components */
import React from "react";
import { Link } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Container from "../generic/Container";
import Popover from "../generic/FloatingBox";
import Button from "../generic/Button";

/** Images */
import HelpIcon from "../../img/help.svg";

// ----------------------------------------------------------------

/** Main component */
class Help extends React.Component {
	/** Help content */
	helpInfo = (
		<Popover>
			{/** Help item */}
			<Container class="p-1">
				<Link className="btn btnItemStandard" to="/">FAQ</Link>
			</Container>

			{/** Help item */}
			<Container class="p-1">
				<Link className="btn btnItemStandard" to="/">Send feedback</Link>
			</Container>
		</Popover>
	);

	// Rendering component
	render() {
		return (
			/** Help container  */
			<Container name="help" class="d-flex">
				{/** Help overlay content */}
				<OverlayTrigger
					trigger="click"
					placement="bottom"
					overlay={this.helpInfo}
				>
					{/** Help icon content */}
					<Container name="icon-help" class="d-flex">
						<Button
							type="icon"
							name="Help"
							imageUrl={HelpIcon}
							class="ribbon-icon"
						/>
					</Container>
				</OverlayTrigger>
			</Container>
		);
	}
}

export default Help;
