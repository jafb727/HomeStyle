/**
 * Filename: util.js
 * Author: Jose A Felix
 * Description: contains useful functions
 */

// ----------------------------------------------------------------

/** Components */
import DataChunk from "../controls/datatable/DataChunk";

// ----------------------------------------------------------------

// Utilities
export default (() => {
	const util = {
		/**
		 * capitalizeFirstLetter function
		 * @param {string} text - the text string to capitalize
		 * @returns {string} A string first letter capitalized
		 */
		capitalizeFirstLetter: (text) => {
			if (typeof text !== "string") return "";
			return text.charAt(0).toUpperCase() + text.slice(1);
		},

		/**
		 * sortByDataChunk function
		 * Allows to sort an object literal array by a specific property. Only ascending
		 * @param {string} dataChunk - data chunk name to perform a comparation
		 * @returns {array} An array sorted
		 */
		sortByDataChunk: (dataChunk) => {
			return (a, b) => {
				if (a[dataChunk] > b[dataChunk]) {
					return 1;
				} else if (a[dataChunk] < b[dataChunk]) {
					return -1;
				}
				return 0;
			};
		},

		/**
		 * setBS4ColWidth function
		 * Helps to find the correct column width to apply in a table
		 * @param {string} bs4ColumnWidth - the bootstrap column width
		 * @param {boolean} inLineOrientation - the form orientation (table or default)
		 */
		setBS4ColWidth: (bs4ColumnWidth, inLineOrientation) => {
			return bs4ColumnWidth && inLineOrientation
				? `col-${bs4ColumnWidth}`
				: "";
		},

		/**
		 * back function
		 * Helps to back one step in navigation history
		 */
		back: () => {
			window.history.back();
		},

		/**
		 * mapDataForm function
		 * Helps to set only the key name for each field to be displayed in a form given a data scheme
		 * @param {object} scheme - the data scheme to extract the form data map
		 * @param {string} orientation - the form orientation
		 * @returns {object} A mapped fields scheme
		 */
		mapDataForm: (scheme, orientation) => {
			let dataForm = {};

			// Getting keynames from data scheme
			scheme.forEach((formFieldSetUp) => {
				if (
					(orientation !== "table" && formFieldSetUp.displayEditForm) ||
					(orientation === "table" && formFieldSetUp.displayViewList)
				) {
					dataForm[formFieldSetUp.name] = "";
				}
			});

			return dataForm;
		},

		/**
		 * getPivotDataChunk function
		 * Helps to get the data chunk config that serves as an identifier
		 * @param {object} scheme - An object with a data scheme
		 */
		getPivotDataChunk: (scheme) => {
			return scheme.find((dataChunkSetUp) => dataChunkSetUp.pivotDataChunk);
		},

		/**
		 * getDataChunkSetUp function
		 * Helps to get a specific data chunk set up in data scheme
		 * @param {object} scheme - An object with a data scheme
		 * @param {string} dataChunkName - the data chunk name
		 * @returns {object} An object with data chunk set up
		 */
		getDataChunkSetUp: (scheme, dataChunkName) => {
			// Getting image data chunk set up
			const dataChunkSetUp = scheme.find(
				(dataChunkSetUp) => dataChunkSetUp.name === dataChunkName
			);

			return dataChunkSetUp;
		},

		/**
		 * buildDataChunkContent function
		 * Helps to set a table cell content based on a JSON scheme data
		 * Scheme is used to define each cell value and its specifications
		 * @param {object} scheme - a JSON object specifying each data chunk configuration
		 * @param {object} item - a JSON object representing data item
		 * @param {string} displayOnlyName - if is needed to diaplsy only the data chunk display name
		 * @param {string} tag - defines a tag to distinguish each component
		 * @param {object} props - a JSON object containing parent component properties
		 * @returns {object} DataChunk markup
		 */
		buildDataChunkContent: (scheme, item, displayOnlyName, tag, props) => {
			let dataChunkContent = [];
			let keyIdentifier = null;
			let dataChunkValue = null;
			let dataChunkId = null;
			let dataChunkType = null;

			// ----------------------------------------------------------------

			// This pivot data chunk is used as identifier, so it must have a unique value for each item
			const pivotDataChunk = util.getPivotDataChunk(scheme);

			// Setting properties dinamically
			let options = {
				options: props ? props : null,
			};

			// ----------------------------------------------------------------

			scheme.forEach((dataChunkSetUp, index) => {
				/** Normalizing properties */

				// Some properties refer to a data chunk but others to table header
				if (displayOnlyName) {
					keyIdentifier = `${tag}-${index}`;
					dataChunkValue = dataChunkSetUp.displayName;
				} else {
					keyIdentifier = `${tag}-${index}-${item[pivotDataChunk.name]}`;
					dataChunkValue = item[dataChunkSetUp.name];
					dataChunkId = item[pivotDataChunk.name];
					dataChunkType = dataChunkSetUp.viewDataChunkType;
				}

				/** Creating data chunk content */

				// Structure creating based on displayable data chunks
				if (dataChunkSetUp.displayViewList) {
					dataChunkContent.push(
						// Defining specific content for each data chunk type
						<DataChunk
							{...options}
							key={keyIdentifier}
							type={dataChunkType}
							bs4ColumnWidth={dataChunkSetUp.bs4ColumnWidth}
							value={dataChunkValue}
							itemId={dataChunkId}
						/>
					);
				}
			});

			return dataChunkContent;
		},

		/**
		 * addItem function
		 * Adds an item local storage
		 * @param {string} key - key entry in local storage
		 * @param {object} data - A JSON object with all form data mapped
		 * @returns {object} A JSON object
		 */
		addItem: (key, data) => {
			// Defining new random id for item
			const itemId = util.getRandomInt(20, 100);
			data["productId"] = itemId;

			// Getting local storage to add new item
			let items = util.getLocalStorageEntry(key);
			items.push(data);

			// Adding data to local storage and returning success
			window.localStorage.setItem("items", JSON.stringify(items));
			return { status: 200, success: true };
		},

		/**
		 * initDataLocalStorage function
		 * Stores data in local storage
		 * @param {object} data - A JSON object with all form data mapped
		 * @returns {object} A JSON object
		 */
		initDataLocalStorage: (data) => {
			window.localStorage.setItem("items", JSON.stringify(data));
			return data;
		},

		/**
		 * getLocalStorageEntry function
		 * @param {string} id - the identifier of the local storage entry
		 * @returns {object} A JSON object with the entry value
		 */
		getLocalStorageEntry: (id) => {
			return JSON.parse(window.localStorage.getItem(id));
		},

		/**
		 * getRandomInt function
		 * Gets a random integer between two values
		 */
		getRandomInt: (min, max) => {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min) + min);
		},
	};

	return util;
})();
