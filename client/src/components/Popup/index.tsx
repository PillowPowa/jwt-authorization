import Layout from "./Layout";
import { useMount } from "./useMount";
import { LayoutParam } from "./types";

export const PopupModal = ({ active, onClose, children }: LayoutParam) => {
	const mounted = useMount(active);
	if (!mounted) return null;

	return (
		<Layout onClose={onClose} active={active}>
			{children}
		</Layout>
	);
};
