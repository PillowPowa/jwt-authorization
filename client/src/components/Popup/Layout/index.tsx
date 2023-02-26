import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

import { LayoutParam } from "../types";
import { ANIMATION_TIME_MS } from "./constant";

import styles from "./styles.module.css";
import animationStyles from "./animation.module.css";

const animations = {
	overlay: {
		enter: animationStyles.overlayEnter,
		enterActive: animationStyles.overlayEnterActive,
		exit: animationStyles.overlayExit,
		exitActive: animationStyles.overlayExitActive,
	},
	content: {
		enter: animationStyles.contentEnter,
		enterActive: animationStyles.contentEnterActive,
		exit: animationStyles.contentExit,
		exitActive: animationStyles.contentExitActive,
	},
} satisfies Record<string, any>;

const Layout = ({ onClose, children, active }: LayoutParam) => {
	const overlayRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	const [animationIn, setAnimationIn] = useState(false);

	useEffect(() => {
		setAnimationIn(active);
	}, [active]);

	return (
		<div ref={overlayRef} className={styles.overlay} onClick={onClose}>
			<CSSTransition
				in={animationIn}
				nodeRef={overlayRef}
				timeout={ANIMATION_TIME_MS}
				mountOnEnter
				unmountOnExit
				classNames={animations.overlay}
			>
				<div
					ref={contentRef}
					className={styles.content}
					onClick={(event) => event.preventDefault()}
				>
					<CSSTransition
						in={animationIn}
						nodeRef={contentRef}
						timeout={ANIMATION_TIME_MS}
						mountOnEnter
						unmountOnExit
						classNames={animations.content}
					>
						{children}
					</CSSTransition>
				</div>
			</CSSTransition>
		</div>
	);
};

export default Layout;
