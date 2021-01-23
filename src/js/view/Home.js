/**
 * Filename: Home.js
 * Author: Jose A Felix
 * Description: Home component
 */

// ----------------------------------------------------------------

/**JSON data */
import data from "../../data/data.json";
import scheme from "../../data/scheme.json";

/** Components */
import React from "react";
import Sidebar from "../layout/Sidebar";
import Workspace from "../layout/Workspace";
import ViewHeader from "../layout/ViewHeader";
import ViewContent from "../layout/ViewContent";
import Container from "../generic/Container";
import DataTable from "../controls/datatable/DataTable";

// ----------------------------------------------------------------

/** Main component */
class Home extends React.Component {
	// Rendering component
	render() {
		return (
			/** Home page container  */
			<Container name="view" class="d-flex">
				{/** Left navigation */}
				<Sidebar />

				{/** Workspace container */}
				<Workspace>
					{/** View header container */}
					<ViewHeader title="Products" />

					{/** View content container  */}

					<ViewContent>
						<DataTable
							scheme={scheme}
							data={data}
							allowEdition
							allowImageToggling
							allowSearching
						/>
					</ViewContent>
				</Workspace>
			</Container>
		);
	}
}

export default Home;
