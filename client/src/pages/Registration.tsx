import { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import "./Authorization.css";

import FormInput from "../components/ui/FormInput";
import FormButton from "../components/ui/FormButton";

import { Context } from "./../App";
import getUserAgent from './../hooks/UserAgent';
import { RegistrationFormBody, ServerError } from "../types/ResponseTypes";

export default function Registration() {
	const [isLoading, setLoading] = useState(false);

	const [username, setUserName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const { store } = useContext(Context);

	const {
		register,
		handleSubmit,
		setError,
		formState: {errors},
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
		}
		setTimeout(() => setLoading(false), 400);
	});

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
						className="form-component"
						type="text"
						{...register("username")}
						errors={errors.username && errors.username.message}
						onChange={(event) => setUserName(event.target.value)}
					>
						Username
					</FormInput>
					<FormInput
						className="form-component"
						type="text"
						{...register("email")}
						errors={errors.email && errors.email.message}
						onChange={(event) => setEmail(event.target.value)}
					>
						Email
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

					<p className="form-component">
						By counting you agree to <a href="/">Terms & Conditions</a> and{" "}
						<a href="/">Privacy Policy</a>
					</p>

					<div className="container-footer">
						<FormButton
							className="form-component"
							filled={true}
							type="submit"
							isLoading={isLoading}
							onClick={registrate}
						>
							Create an account!
						</FormButton>
						<FormButton className="form-component">
							Sign up with Google!
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
}
