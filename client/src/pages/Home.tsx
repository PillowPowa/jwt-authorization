import { useContext } from "react";
import { Context } from "../App";
import "./Authorization.css";

import FormButton from "../components/ui/FormButton";
import { observer } from "mobx-react-lite";

const Home = () => {
	const { store } = useContext(Context);

  if (store.loading) {
    return (<div></div>)
  } else if (!store.user) {
		return (
			<div className="container blue">
				<FormButton
					className="form-component"
					filled={true}
					onClick={() => (window.location.href = "/login")}
				>
					Sign in
				</FormButton>
				<FormButton
					className="form-component"
					filled={true}
					onClick={() => (window.location.href = "/registration")}
				>
					Sign up
				</FormButton>
			</div>
		);
	} else if (!store.user.isActivated) {
		return (
			<div className="container green">
        <div className="container-content">
          <h1 style={{color: "black"}}>An activation letter has been sent to the mail {store.user.email}</h1>
        </div>
			</div>
		);
	}
	return (
		<div className="container green">
			<FormButton
				className="form-component"
				filled={true}
				onClick={() => store.logout()}
			>
				Log out!
			</FormButton>
		</div>
	);
};

export default observer(Home);
