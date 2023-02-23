import "./FormButton.css";

type ButtonComponentProps = {
	children: string;
	filled?: boolean;
	className: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const FormButton = ({
	children,
	filled,
	className,
	...props
}: ButtonComponentProps) => {
	return (
		<div className={className}>
			<button
				className={
					"form-button " + (!filled ? "empty-button" : "filled-button")
				}
				{...props}
			>
				{children}
			</button>
		</div>
	);
};

export default FormButton;
