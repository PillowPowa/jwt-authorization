import {useState} from "react";
import styles from "./styles.module.css";

type InputComponentProps = {
	children: string;
	className: string;
	errors?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FormInput = ({
	children,
	className,
	errors,
	type,
	...props
}: InputComponentProps) => {
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
				className={styles.input}
				placeholder=" "
				type={visiblity}
				autoComplete="off"
				{...props}
			/>
			<label className={styles.label}>{children}</label>
			{type === "password" && (
				<i
					className={"material-icons-round " + styles.icon}
					onClick={passwordVisibility}
				>
					visibility
				</i>
			)}
			<p className={styles.error}>{errors}</p>
		</div>
	);
}
