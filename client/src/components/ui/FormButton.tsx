import "./FormButton.css";

interface ButtonComponentProps {
	children: string;
	className: string;
	filled?: boolean;
}

const FormButton = ({children, filled, className}: ButtonComponentProps) => {
	return (
		<div className={className}>
			<button className={"form-button " + (!filled ? "empty-button" : "filled-button")}>
				{children}
			</button>
		</div>
	);
};

export default FormButton;
