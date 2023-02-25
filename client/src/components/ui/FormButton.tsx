import "./FormButton.css";

type ButtonComponentProps = {
	children: string;
	filled?: boolean;
	className: string;
	isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const FormButton = ({
	children,
	filled,
	className,
	isLoading,
	...props
}: ButtonComponentProps) => {
	return (
		<div className={className}>
			<button
				className={
					"form-button " + (!filled ? "empty-button" : "filled-button")
				}
				{...props}
				disabled={props.disabled || isLoading}
			>
				{isLoading ? (<div className="button-text-loader"></div>) : children}
			</button>
		</div>
	);
};

export default FormButton;
