export interface LayoutParam {
	onClose: React.MouseEventHandler<HTMLDivElement>;
	children: JSX.Element;
	active: boolean;
}