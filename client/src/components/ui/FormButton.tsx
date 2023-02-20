import "./FormButton.css";

interface ButtonComponentProps {
	children: string;
	filled?: boolean;
}

const FormButton = ({ children, filled }: ButtonComponentProps) => {
	return (
		<div className="form-component">
			<button className="form-button" style={
        !filled ? {
          background: "none"
        } : {}
      }>
				{children}
			</button>
		</div>
	);
};

export default FormButton;
