import {useState} from "react";
import "./FormInput.css";

type InputComponentProps = {
	children: string;
	className: string;
	errors?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function FormInput({
	children,
	className,
	errors,
	type,
	...props
}: InputComponentProps) {
	const [visiblity, setVisiblity] = useState(type);
	const passwordVisibility = (
		event: React.MouseEvent<HTMLElement> & { target: HTMLElement }
	) => {
		const isVisible = visiblity === "text";
		setVisiblity(isVisible ? "password" : "text");
		event.target.innerText = isVisible ? "visibility" : "visibility_off";
	};


	return (
		<div className={className}>
			<input
				className="form-input"
				placeholder=" "
				type={visiblity}
				autoComplete="off"
				{...props}
			/>
			<label className="form-label">{children}</label>
			{type === "password" && (
				<i
					className="material-icons-round input-icon"
					onClick={passwordVisibility}
				>
					visibility
				</i>
			)}
			<p className="form-error">{errors}</p>
		</div>
	);
}
