/**
 * Filename: Avatar.js
 * Author: Jose A Felix
 * Description: Avatar component
 */

// ----------------------------------------------------------------

/** Components */
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "../generic/Container";
import FloatingBox from "../generic/FloatingBox";
import Button from "../generic/Button";

/** Images */
import AvatarIcon from "../../img/avatar.svg";
import ExitIcon from "../../img/exit.svg";

// ----------------------------------------------------------------

/** Main component */
class Avatar extends React.Component {
	/**
	 * setAvatarContent function
	 * Helps to set the avatar's component content
	 */
	setAvatarContent = () => {
		let avatarContent = null;

		switch (this.props.type) {
			// Avatar floating. Used in Ribbon mainly
			case "float":
				avatarContent = (
					/** React bootstrap Overlay to display floating elements */
					<OverlayTrigger
						trigger="click"
						placement="bottom"
						overlay={this.avatarFloatInfo}
					>
						{/** Avatar Ribbon button */}
						<Container name="icon-avatar" class="d-flex">
							<Button
								type="icon"
								name="Avatar"
								imageUrl={AvatarIcon}
								class="ribbon-icon"
							/>
						</Container>
					</OverlayTrigger>
				);
				break;

			default:
				break;
		}

		return avatarContent;
	};

	// ----------------------------------------------------------------

	/** Avatar info content */
	avatarFloatInfo = (
		<FloatingBox {...this.props}>
			<Container>
				{/** Avatar account */}
				<Container class="py-2 text-center">
					{/** Avatar image */}
					<Container class="floatingAvatarInfo">
						<img className="small-image" alt="Avatar" src={AvatarIcon} />
					</Container>

					{/** Avatar information */}
					<Container>
						<strong>{this.context.currentUser.displayName}</strong>
						<div>{this.context.currentUser.email}</div>
						<Link to={`/account/${this.context.currentUser.id}`}>
							View account
						</Link>
					</Container>
				</Container>

				{/** Divider */}
				<Dropdown.Divider />

				{/** Avatar options */}
				<Button name="Shopping" class="btnItemStandard" />
				<Button name="Help" class="btnItemStandard" />

				{/** Divider */}
				<Dropdown.Divider />

				<UserContext.Consumer>
					{({ onUserLogOut }) => (
						/** Avatar log out */
						<Button
							type="iconText"
							name="Log out"
							class="d-flex justify-content-between align-items-center btnItemStandard"
							imageUrl={ExitIcon}
							onClick={() => onUserLogOut(this.props.history)}
						/>
					)}
				</UserContext.Consumer>
			</Container>
		</FloatingBox>
	);

	// ----------------------------------------------------------------

	// Rendering component
	render() {
		return (
			/** Avatar container  */
			<Container name="avatar" class="d-flex">
				{/** Avatar content */}
				{this.setAvatarContent()}
			</Container>
		);
	}
}

// Component context
Avatar.contextType = UserContext;

// Component routing to use parameters
export default withRouter(Avatar);
