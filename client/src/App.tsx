import { createContext, useEffect, useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import * as Pages from "./components/Content";

import Store from "./utils/store";
import { observer } from "mobx-react-lite";

import { getUserAgent } from "./hooks";
import type { StoreContext } from "./utils/types/types";

const store = new Store();
export const Context = createContext<StoreContext>({
	store,
});

const router = createBrowserRouter([
	{
		path: "/",
		element: <Pages.Home />,
	},
	{
		path: "/registration",
		element: <Pages.Registration />,
	},
	{
		path: "/login",
		element: <Pages.Login />,
	},
]);

function App() {
	const { store } = useContext(Context);

	useEffect(() => {
		if (localStorage.getItem("token")) {
			store.refresh(getUserAgent());
		}
	});

	return (
		<Context.Provider value={{ store }}>
			<RouterProvider router={router} />
		</Context.Provider>
	);
}

export default observer(App);
