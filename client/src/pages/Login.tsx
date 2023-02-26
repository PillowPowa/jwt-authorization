import { FormInput, FormButton } from "../components/ui";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import "./Authorization.css";

import { Context } from "../App";
import type { ServerError, LoginFormBody } from "../types/ResponseTypes";

import { useKeySubmit, getUserAgent } from "../hooks";
import { observer } from "mobx-react-lite";
import { PopupModal } from "./../components/Popup";

const Login = () => {
	const [popupText, setPopupText] = useState<string>();
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
		} else if (data && data.user && !data.user.isActivated) {
			setPopupText(`A confirmation email has been sent to '${data.user.email}'`);
		} else {
			setPopupText("Successfully login!");
		}
		setTimeout(() => setLoading(false), 400);
	});

	useKeySubmit(login);

	return (
		<>
			<div className="container green">
				<PopupModal active={!!popupText} onClose={() => setPopupText("")}>
					<>
						<p style={{ color: "black", width: "auto" }}>{popupText}</p>
						<FormButton
							onClick={() => setTimeout(() => {
								window.location.href = "/"
							}, 400)}
						>
							Home
						</FormButton>
					</>
				</PopupModal>
				<div className="container-content">
					<h2 style={{ fontSize: "5vh", color: "var(--dark-green)" }}>
						Authorization
					</h2>

					<FormInput
						type="text"
						{...register("identifier")}
						errors={errors.identifier && errors.identifier.message}
						onChange={(event) => setIdentifier(event.target.value)}
					>
						Email or Username
					</FormInput>
					<FormInput
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
							filled={true}
							onClick={login}
						>
							Sign in!
						</FormButton>
						<p className="form-component" style={{ marginTop: "1rem" }}>
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
};

export default observer(Login);
