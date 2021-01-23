/**
 * Filename: UserContext.js
 * Author: Jose A Felix
 * Description: UserContext component
 */

// ----------------------------------------------------------------

/** Components */
import React from "react";

// ----------------------------------------------------------------

/** User context */
export const UserContext = React.createContext({
	currentUser: "", // the current user logged information
	onUserLogIn: () => {}, // the user log in function
	onUserLogOut: () => {}, // the user log out function
});
