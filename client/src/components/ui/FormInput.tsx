import "./FormInput.css";

interface InputComponentProps {
	id: string;
	type: "password" | "text";
	children: string;
}

export default function FormInput({ id, type, children }: InputComponentProps) {
	return (
		<div className="form-component">
			<input
				className="form-input"
				type={type}
				id={id}
        placeholder=" "
        autoComplete="off"
			/>
			<label className="form-label" htmlFor={id}>
				{children}
			</label>
		</div>
	);
}
