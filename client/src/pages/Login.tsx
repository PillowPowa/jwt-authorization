import {FormInput, FormButton} from "../components/ui";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import "./Authorization.css";

import { Context } from "../App";
import getUserAgent from "./../hooks/UserAgent";
import { ServerError } from "../types/ResponseTypes";
import { useKeySubmit } from './../hooks/KeyDownSubmit';
import type { LoginFormBody } from './../types/ResponseTypes';
import { observer } from 'mobx-react-lite';
import { PopupModal } from './../components/Popup/index';

const Login = () => {
	const [popupActive, setPopupActive] = useState(false);
	const [isLoading, setLoading] = useState(false);

	const [identifier, setIdentifier] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const { store } = useContext(Context);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<LoginFormBody>();

	const login = handleSubmit(async () => {
		setLoading(true);
		const data = await store.login(identifier, password, getUserAgent());
		const serverErr = data?.errors;
		if (serverErr) {
			serverErr.forEach((error: ServerError<LoginFormBody>) => {
				setError(error.param, {
					type: "server",
					message: error.msg + "*",
				});
			});
		} else {
			window.location.href = "/";
		}
		setTimeout(() => setLoading(false), 400);
	});

	useKeySubmit(login);

	return (
		<>
			<PopupModal active={popupActive} onClose={() => setPopupActive(false)}>
				<div></div>
			</PopupModal>
			<div className="container green">
				<div className="container-content">
					<h2 style={{ fontSize: "5vh", color: "var(--dark-green)" }}>
						Authorization
					</h2>

					<FormInput
						className="form-component"
						type="text"
						{...register("identifier")}
						errors={errors.identifier && errors.identifier.message}
						onChange={(event) => setIdentifier(event.target.value)}
					>
						Email or Username
					</FormInput>
					<FormInput
						className="form-component"
						type="password"
						{...register("password")}
						errors={errors.password && errors.password.message}
						onChange={(event) => setPassword(event.target.value)}
					>
						Password
					</FormInput>

					<div className="container-footer">
						<FormButton
							isLoading={isLoading}
							className="form-component"
							filled={true}
							onClick={login}
						>
							Sign in!
						</FormButton>
						<FormButton className="form-component" onClick={() => setPopupActive(true)}>
							Popup
						</FormButton>
						<p className="form-paragraph" style={{ marginTop: "1rem" }}>
							Don't have an account?&nbsp;
							<a href="/registration">Sign up!</a>
						</p>
					</div>
				</div>
				<div className="container-image">
					<img
						className="container-image"
						src="authorization_background.png"
						style={{ borderRadius: "0 6vh 6vh 0" }}
						alt="background"
					/>
				</div>
			</div>
			<div
				className="poster"
				style={{ animation: "right-to-left 2s normal forwards ease-in-out" }}
			>
				<h1 style={{ fontSize: "7vh" }}>Log in</h1>
				<p className="poster-paragraph">
					log in to unlock exciting experience with our services
				</p>
			</div>
		</>
	);
}

export default observer(Login);
