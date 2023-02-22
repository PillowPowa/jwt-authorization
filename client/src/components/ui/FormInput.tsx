import { useState } from "react";
import "./FormInput.css";

interface InputComponentProps {
	id: string;
	type: "password" | "text";
	children: string;
	className: string;
}

export default function FormInput({
	id,
	type,
	children,
	className,
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
				type={visiblity}
				id={id}
				placeholder=" "
				autoComplete="off"
			/>
			{type === "password" && (
				<i
					className="material-icons-round input-icon"
					onClick={passwordVisibility}
				>
					visibility
				</i>
			)}
			<label className="form-label" htmlFor={id}>
				{children}
			</label>
			<p className="form-error">Incorrect value*</p>
		</div>
	);
}
