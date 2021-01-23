/**
 * Filename: Star.js
 * Author: Jose A Felix
 * Description: Star component
 */

// ----------------------------------------------------------------

/** Components */
import React from "react";
import Container from "../generic/Container";

/** Images */
import StarIcon from "../../img/star.svg";

// ----------------------------------------------------------------

/** Main component */
class Star extends React.Component {
	// Constructor
	constructor(props) {
		super(props);

		// Component state
		this.state = {
			minimumRating: 1, // Default rating minimum value
			maximumRating: 5, // Default rating maximum value
		};
	}

	/**
	 * estimateRating function
	 * Helps to estimate the number of stars to display according with rating
	 * @returns {Array} An array with images markup
	 */
	estimateRating = () => {
		// Default rating
		let itemRating = this.props.rating
			? this.props.rating
			: this.state.minimumRating;
		let ratingContent = [];

		// ----------------------------------------------------------------

		/** Processing rating */

		try {
			itemRating = parseInt(itemRating);
		} catch (error) {
			console.log("Rating has not a valid value.");
		} finally {
			/** Normalizing rating to a maximum */

			// Normalizing itemRating to have a maximum according to state
			// In case ratingCounting surpasses the maximum boundarie
			itemRating =
				itemRating > this.state.maximumRating
					? this.state.maximumRating
					: itemRating;
		}

		// ----------------------------------------------------------------

		// Defining star rating number displaying
		let ratingCounting = this.state.minimumRating;
		while (ratingCounting <= itemRating) {
			ratingContent.push(
				<img
					key={`star${ratingCounting + 1}`}
					className="small-icon"
					alt="Star"
					src={StarIcon}
				/>
			);

			ratingCounting++;
		}

		return ratingContent;
	};

	// Rendering component
	render() {
		return (
			<Container name="star-rating" class="form-inline">
				{this.estimateRating()}
			</Container>
		);
	}
}

export default Star;
