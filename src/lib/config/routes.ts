/**
 * Routes for `react-router-dom`
 */

export const ROOT_ROUTE = "/";

export const CHARACTER_LIST_ROUTE = "characters";

export const CHARACTER_SHOW_ROUTE = "characters/:id";
export const BUILD_CHARACTER_SHOW_ROUTE = (id: number) => `characters/${id}`;
