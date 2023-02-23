import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import "./Registration.css";
import FormInput from "../components/ui/FormInput";
import FormButton from "../components/ui/FormButton";

import { Context } from "./../App";
import { UserAgent } from "../types/ResponseTypes";

export default function Registration() {
	const [username, setUserName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const { store } = useContext(Context);

	const userAgent = () => {
		const [isMobile, isTablet] = [
			/iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(
				navigator.userAgent.toLowerCase()
			),
			/ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(
				navigator.userAgent.toLowerCase()
			),
		];

		if (isMobile && !isTablet) {
			return UserAgent.Mobile;
		} else if (!isMobile && isTablet) {
			return UserAgent.Tablet;
		} else {
			return UserAgent.Desktop;
		}
	};

	interface FormBody {
		username: string;
		email: string;
		password: string;
	}

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<FormBody>();

	const registrate = handleSubmit(async () => {
		const data = await store.registration(
			username,
			email,
			password,
			userAgent()
		);
		console.log(data);
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
			<div className="container">
				<img
					className="container-image"
					src="registration_background.png"
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

					<p className="form-paragraph">
						By counting you agree to <a href="/">Terms & Conditions</a> and{" "}
						<a href="/">Privacy Policy</a>
					</p>

					<div className="container-footer">
						<FormButton
							className="form-component"
							filled={true}
							type="submit"
							onClick={registrate}
						>
							Create an account!
						</FormButton>
						<FormButton className="form-component">
							Sign up with Google!
						</FormButton>

						<p className="form-paragraph" style={{width: "100%", marginTop: "1rem"}}>
							Already have an account?&nbsp;
							<a href="/">Login now!</a>
						</p>
					</div>
				</div>
			</div>
			<div className="poster">
				<h1 style={{ fontSize: "7vh" }}>Sign up</h1>
				<p>sign up to unlock exciting experience with our services</p>
			</div>
		</>
	);
}
