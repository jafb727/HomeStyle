/**
 * Filename: Shopping.js
 * Author: Jose A Felix
 * Description: Shopping component
 */

// ----------------------------------------------------------------

/** Components */
import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "../generic/Container";
import Popover from "../generic/FloatingBox";
import Button from "../generic/Button";

/** Images */
import ShoppingCartIcon from "../../img/shopping-cart.svg";
import HammerIcon from "../../img/hammer.svg";
import ChainSawIcon from "../../img/chain-saw.svg";

// ----------------------------------------------------------------

/** Main component */
class Shopping extends React.Component {
	/** Shopping info content */
	shoppingCartInfo = (
		<Popover>
			{/** Shopping item */}
			<Container name="hammer" class="d-flex p-1">
				<Container class="mr-4">
					<img class="xsmall-image" alt="Hammer" src={HammerIcon} />
				</Container>
				<Container>
					<strong>Hammer 14"</strong>
					<div>Dexter & Protect</div>
					<strong>$12.45</strong>
				</Container>
			</Container>

			{/** Shopping item */}
			<Container name="chain-saw" class="d-flex p-1">
				<Container class="mr-4 d-flex align-items-center">
					<img class="xsmall-image" alt="Chain Saw" src={ChainSawIcon} />
				</Container>
				<Container>
					<strong>Automatic chain saw VH8</strong>
					<div>Stanley</div>
					<strong>$230.00</strong>
				</Container>
			</Container>

			<Dropdown.Divider />

			{/** Go to cart */}
			<Button name="Go to cart" class="btn-primary container-fluid" />
		</Popover>
	);

	// Rendering component
	render() {
		return (
			/** Shopping list container  */
			<Container name="shopping-list" class="d-flex">
				{/** Shopping overlay content */}
				<OverlayTrigger
					trigger="click"
					placement="bottom"
					overlay={this.shoppingCartInfo}
				>
					{/** Shopping icon content */}
					<Container name="icon-shopping" class="d-flex">
						<Button
							type="icon"
							name="Shopping"
							imageUrl={ShoppingCartIcon}
							class="ribbon-icon"
						/>
					</Container>
				</OverlayTrigger>
			</Container>
		);
	}
}

export default Shopping;
