/**
 * Filename: Search.js
 * Author: Jose A Felix
 * Description: Search component
 */

// ----------------------------------------------------------------

/** Components */
import React from "react";

// ----------------------------------------------------------------

/** Main component */
class Search extends React.PureComponent {
	// Constructor
	constructor(props) {
		super(props);

		// State component
		this.state = {
			data: this.props.dataToFilter, // The data which all filtering will be done
		};
	}

	// ----------------------------------------------------------------

	/** Lifecycle methods */

	// getDerivedStateFromProps
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.anItemWasDeleted) {
			return {
				data: nextProps.dataToFilter,
			};
		} else return null;
	}

	// ----------------------------------------------------------------

	/**
	 * filterByName function
	 * Helps to filter a data source by keyword in name field
	 * @param {object} event - the DOM element that triggered the event
	 */
	filterByName = (event) => {
		const dataToFilter = this.state.data;
		const keyword = event.target.value;
		let filterResult = null;

		// ----------------------------------------------------------------

		/**
		 * Filtering data source by item name
		 */

		// If keyword is not null, filters data source by item name
		// Uses the original data source to filter data
		if (keyword) {
			filterResult = dataToFilter.filter((item) => {
				const name = item.productName.toLowerCase();
				return name.indexOf(keyword) >= 0;
			});
		} else {
			// If keyword is null, shows original data source
			filterResult = this.state.data;
		}

		// Update app data source
		this.props.onUpdateDataSource(filterResult);
	};

	// Rendering component
	render() {
		return (
			<div name="search" className="d-flex ml-auto">
				<label className="col-md-4  col-form-label" htmlFor="search-box">
					Filter by
				</label>
				<input
					id="search-box"
					className="form-control col-md-8"
					type="search"
					placeholder="Search by name"
					aria-label="Search"
					onChange={(event) => this.filterByName(event)}
				/>
			</div>
		);
	}
}

export default Search;
