import "./Registration.css";
import FormInput from "../components/ui/FormInput";
import FormButton from "../components/ui/FormButton";

export default function Registration() {
	return (
		<>
			<div className="container">
				<img
					className="container-image"
					src="registration_background.png"
					alt="background"
				/>
				<form className="container-content">
					<h2 style={{ fontSize: "6vh" }}>Lets get started</h2>

					<FormInput className="form-component" type="text" id="username">
						Username
					</FormInput>
					<FormInput className="form-component" type="text" id="email">
						Email
					</FormInput>
					<FormInput className="form-component" type="password" id="password">
						Password
					</FormInput>

					<p className="form-paragraph">
						By counting you agree to <a href="/">Terms & Conditions</a> and{" "}
						<a href="/">Privacy Policy</a>
					</p>

					<FormButton className="form-component" filled={true}>
						Create an account!
					</FormButton>
					<FormButton className="form-component">
						Sign up with Google!
					</FormButton>

					<p className="form-paragraph">
						Already have an account?&nbsp;
						<a href="/">Login now!</a>
					</p>
				</form>
			</div>
			<div className="poster">
				<h1>Sign up</h1>
				<p>sign up to unlock exciting experience with our services</p>
			</div>
		</>
	);
}
