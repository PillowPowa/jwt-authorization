import { useState, forwardRef } from "react";
import styles from "./styles.module.css";

type InputComponentProps = {
	children: string;
	className?: string;
	errors?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FormInput = forwardRef(
	({
		children,
		className = "form-component",
		errors,
		type,
		...props
	}: InputComponentProps, ref: React.ForwardedRef<HTMLDivElement>) => {
		const [visiblity, setVisiblity] = useState(type);
		const passwordVisibility = (
			event: React.MouseEvent<HTMLElement> & { target: HTMLElement }
		) => {
			const isVisible = visiblity === "text";
			setVisiblity(isVisible ? "password" : "text");
			event.target.innerText = isVisible ? "visibility" : "visibility_off";
		};

		return (
			<div className={className} ref={ref}>
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
);
