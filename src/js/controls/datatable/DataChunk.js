/**
 * Filename: DataChunk.js
 * Author: Jose A Felix
 * Description: DataChunk component
 */

// ----------------------------------------------------------------

/** Scripts */
import util from "../../utils/util.js";

/** Components */
import React from "react";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Star from "../../other/Star";

/** Images */
import DefaultImage from "../../../img/default-image.svg";

// ----------------------------------------------------------------

/** Main component */
class DataChunk extends React.Component {
	/**
	 * setDataChunkContent function
	 * Helps to render content according to cell type
	 * @returns {object} DataChunk markup
	 */
	setDataChunkContent = () => {
		// Defining column width in case the business logic needed
		let bs4Width = util.setBS4ColWidth(this.props.bs4ColumnWidth, "horizontal");
		let dataChunkContent = null;

		// ----------------------------------------------------------------

		switch (this.props.type) {
			// DataChunk Image type
			case "image":
				// Image default value
				const imageUrl = this.props.value ? this.props.value : DefaultImage;

				dataChunkContent = (
					<Col className={bs4Width}>
						{this.props.options.displayImage ? (
							<img className="imageDataChunk" alt="Item" src={imageUrl} />
						) : null}
					</Col>
				);

				break;

			// DataChunk Link text type
			case "linkText":
				dataChunkContent = (
					<Col className={bs4Width}>
						<Link
							className="btn-link"
							to={`/HomeStyle/product/${this.props.itemId}`}
						>
							{this.props.value}
						</Link>
					</Col>
				);
				break;

			// DataChunk Star rating type
			case "rating":
				dataChunkContent = (
					<Col className={bs4Width}>
						<Star rating={this.props.value} />
					</Col>
				);
				break;

			// DataChunk Currency
			case "currency":
				dataChunkContent = (
					<Col className={bs4Width}>{`$${this.props.value}`}</Col>
				);
				break;

			// DataChunk default type
			default:
				dataChunkContent = <Col className={bs4Width}>{this.props.value}</Col>;
				break;
		}

		return dataChunkContent;
	};

	// Rendering component
	render() {
		return this.setDataChunkContent();
	}
}

export default DataChunk;
