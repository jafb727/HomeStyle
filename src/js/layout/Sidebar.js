/**
 * Filename: Sidebar.js
 * Author: Jose A Felix
 * Description: Sidebar component
 */

// ----------------------------------------------------------------

/** Components */
import React from "react";
import { Link } from "react-router-dom";
import Container from "../generic/Container";
import Hamburguer from "../generic/Hamburguer";

/** Images */
//import NewItemIcon from "../../img/new-item.svg";
import MarketIcon from "../../img/market.svg";

// ----------------------------------------------------------------

/** Main component */
class Sidebar extends React.Component {
	// Constructor
	constructor(props) {
		super(props);

		// Component state
		this.state = {
			isCollapsed: false, // Handles menu collapsing behaviour
			itemSelectedId: this.props.itemSelected || "Products", // Default menu item selected on page load
		};
	}

	/**
	 * collapseMenu function
	 * Handles collapsed menu behaviuor. The menu collapses when:
	 * - Viewport is not a desktop width
	 * - User clicks the collapse button from the
	 */
	collapseMenu = () => {
		this.setState({
			isCollapsed: !this.state.isCollapsed,
		});
	};

	/**
	 * setItemSelectedClass function
	 * Sets the selection id to the item clicked
	 */
	setItemSelected = (event) => {
		this.setState({
			itemSelectedId: event.target.id,
		});
	};

	// Rendering component
	render() {
		return (
			/** Navigation container  */
			<Container
				name="sidebar-navigation"
				type="nav"
				class={!this.state.isCollapsed ? "sidebarNavSize" : ""}
			>
				{/** Navigation controls */}
				<Container
					name="navigation-controls"
					class="p-3"
					onClick={() => this.collapseMenu()}
				>
					{/** Hamburguer menu */}
					<Hamburguer
						isCollapsed={this.state.isCollapsed}
						onClick={this.collapseMenu}
					/>
				</Container>

				{/** Menu container */}
				<Container name="menu" type="ul">
					{/*<Link to="/new" className="text-dark">
						<OptionMenu
							id="NewItemIcon"
							optionText="+ Add new"
							imageUrl={NewItemIcon}
							isCollapsed={this.state.isCollapsed}
							onClick={this.setItemSelected}
							itemSelectedId={this.state.itemSelectedId}
						/>
					</Link>*/}
					<Link to="/" className="text-dark">
						<OptionMenu
							id="Products"
							optionText="Products"
							imageUrl={MarketIcon}
							isCollapsed={this.state.isCollapsed}
							onClick={this.setItemSelected}
							itemSelectedId={this.state.itemSelectedId}
						/>
					</Link>
				</Container>
			</Container>
		);
	}
}

/** OptionMenu component */
class OptionMenu extends React.Component {
	// Constructor
	constructor(props) {
		super(props);

		// Component state
		this.state = {
			selectionClass: "", // Handles the item selected class
		};
	}

	// ----------------------------------------------------------------

	/** Lifecycle methods */

	/**
	 * getDerivedStateFromProps
	 */
	static getDerivedStateFromProps(props, state) {
		// Sets the default item selection when user click a menu option
		if (props.itemSelectedId === props.id) {
			return {
				selectionClass: " item-selected",
			};
		} else {
			return {
				selectionClass: "",
			};
		}
	}

	// ----------------------------------------------------------------

	// Rendering component
	render() {
		// Setting special class when menu options are collapsed
		const itemCollpased = this.props.isCollapsed
			? " justify-content-center"
			: "";

		return (
			<li
				id={this.props.id}
				className={`py-3 px-4 d-flex${itemCollpased}${this.state.selectionClass}`}
				onClick={(event) => this.props.onClick(event)}
			>
				{this.props.isCollapsed ? (
					<img alt={this.props.optionText} src={this.props.imageUrl} />
				) : (
					<span>{this.props.optionText}</span>
				)}
			</li>
		);
	}
}

export default Sidebar;
