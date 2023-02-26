import styles from "./styles.module.css";

type ButtonComponentProps = {
	children: string;
	filled?: boolean;
	className: string;
	isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const FormButton = ({
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
					styles.button + " " + (!filled ? styles.empty : styles.filled)
				}
				{...props}
				disabled={props.disabled || isLoading}
			>
				{isLoading ? (<div className={styles.loader}></div>) : children}
			</button>
		</div>
	);
};
