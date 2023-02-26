import { createContext, useEffect } from "react";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Store from "./store/store";
import type { StoreContext } from "./types/types";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import Home from "./pages/Home";
import { getUserAgent } from "./hooks";

const store = new Store();
export const Context = createContext<StoreContext>({
	store,
});

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home></Home>,
	},
	{
		path: "/registration",
		element: <Registration></Registration>,
	},
	{
		path: "/login",
		element: <Login></Login>,
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
