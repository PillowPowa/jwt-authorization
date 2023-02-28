import { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import { FormInput, FormButton } from "../ui";

import "./styles.css";

import { Context } from "../../App";
import { observer } from 'mobx-react-lite';

import { useKeySubmit, getUserAgent } from "../../hooks";
import type { RegistrationFormBody, ServerError } from "../../utils/types/ResponseTypes";

export const Registration = observer(() => {
	const [isLoading, setLoading] = useState(false);

	const [username, setUserName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const { store } = useContext(Context);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<RegistrationFormBody>();

	const registrate = handleSubmit(async () => {
		setLoading(true);

		const data = await store.registration(
			username,
			email,
			password,
			getUserAgent()
		);
		const serverErr = data.errors;
		if (serverErr) {
			serverErr.forEach((error: ServerError<RegistrationFormBody>) => {
				setError(error.param, {
					type: "server",
					message: error.msg,
				});
			});
		} else {
			window.location.href = "/";
		}
		setTimeout(() => setLoading(false), 400);
	});

	useKeySubmit(registrate);

	return (
		<>
			<div className="container blue">
				<img
					className="container-image"
					src="registration_background.png"
					style={{ borderRadius: "6vh 0 0 6vh" }}
					alt="background"
				/>
				<div className="container-content">
					<h2 style={{ fontSize: "5vh" }}>Lets get started</h2>

					<FormInput
						type="text"
						{...register("username")}
						errors={errors.username && errors.username.message}
						onChange={(event) => setUserName(event.target.value)}
					>
						Username
					</FormInput>
					<FormInput
						type="text"
						{...register("email")}
						errors={errors.email && errors.email.message}
						onChange={(event) => setEmail(event.target.value)}
					>
						Email
					</FormInput>
					<FormInput
						type="password"
						{...register("password")}
						errors={errors.password && errors.password.message}
						onChange={(event) => setPassword(event.target.value)}
					>
						Password
					</FormInput>

					<p className="form-component">
						By counting you agree to <a href="/">Terms & Conditions</a> and{" "}
						<a href="/">Privacy Policy</a>
					</p>

					<div className="container-footer">
						<FormButton
							filled={true}
							type="submit"
							isLoading={isLoading}
							onClick={registrate}
						>
							Create an account!
						</FormButton>

						<p className="form-component" style={{ marginTop: "1rem" }}>
							Already have an account?&nbsp;
							<a href="/login">Login now!</a>
						</p>
					</div>
				</div>
			</div>
			<div
				className="poster"
				style={{ animation: "left-to-right 2s normal forwards ease-in-out" }}
			>
				<h1 style={{ fontSize: "7vh" }}>Sign up</h1>
				<p className="poster-paragraph">
					sign up to unlock exciting experience with our services
				</p>
			</div>
		</>
	);
});

