import FormInput from "../components/ui/FormInput";
import FormButton from "../components/ui/FormButton";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import "./Authorization.css";

import { Context } from "../App";
import getUserAgent from './../hooks/UserAgent';

export default function Login() {
	const [identifier, setIdentifier] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const { store } = useContext(Context);

	interface FormBody {
		identifier: string;
		password: string;
	}

	const {
		register,
		handleSubmit,
		setError,
		formState: {errors},
	} = useForm<FormBody>();

	const login = handleSubmit(async () => {
		const data = await store.login(identifier, password, getUserAgent());
		const serverErr = data.errors;
		if (serverErr) {
			// @ts-ignore
			serverErr.forEach((error) => {
				setError(error.param, {
					type: "server",
					message: error.msg,
				});
			});
		}
	});

	return (
		<>
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
							className="form-component"
							filled={true}
							type="submit"
							onClick={login}
						>
							Sign in!
						</FormButton>
						<FormButton className="form-component">
							Log in with Google!
						</FormButton>

						<p className="form-paragraph" style={{ marginTop: "1rem" }}>
							Don't have an account?&nbsp;
							<a href="/registration">Sign up!</a>
						</p>
					</div>
				</div>
				<img
					className="container-image"
					src="authorization_background.png"
					style={{ borderRadius: "0 6vh 6vh 0" }}
					alt="background"
				/>
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
