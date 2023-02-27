import { useContext } from "react";
import { Context } from "../App";
import "./Authorization.css";

import { FormButton } from "../components/ui";
import { observer } from "mobx-react-lite";
import { Loader } from "./../components/Loader";

const Home = () => {
	const { store } = useContext(Context);

	if (store.loading) {
		return <Loader />;
	} else if (!store.user || !store.user.isActivated) {
		return (
			<div className="container blue">
				<div className="container-image">
					<FormButton
						filled={true}
						style={{
							position: "absolute",
							top: "30vh",
							left: 50,
						}}
						onClick={() => (window.location.href = "/registration")}
					>
						Sign up
					</FormButton>
					<img
						className="container-image"
						src="registration_background.png"
						style={{ borderRadius: "6vh 0 0 6vh" }}
						alt="background"
					/>
				</div>
				<div className="container-image">
					<FormButton
						filled={true}
						style={{
							position: "absolute",
							top: "30vh",
							left: 50,
						}}
						onClick={() => (window.location.href = "/login")}
					>
						Sign in
					</FormButton>
					<img
						className="container-image"
						src="authorization_background.png"
						style={{ borderRadius: "0 6vh 6vh 0" }}
						alt="background"
					/>
				</div>
			</div>
		);
	}

	return (
		<div className="container green">
			<FormButton
				className="form-component"
				filled={true}
				style={{
					position: "absolute",
					top: "30vh",
					left: "60%"
				}}
				onClick={() => store.logout()}
			>
				Log out!
			</FormButton>
		</div>
	);
};

export default observer(Home);
