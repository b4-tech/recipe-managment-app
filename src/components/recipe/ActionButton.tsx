import IconButton from "@mui/material/IconButton";
import React from "react";

interface ActionButtonProps {
	color: 'primary' | 'secondary';
	handleClick: () => void;
	isActive: boolean;
	icon: React.ReactElement;
}

const ActionButton: React.FC<ActionButtonProps> = ({ color, handleClick, isActive, icon }) => (
	<IconButton color={color} onClick={handleClick}>
		{React.cloneElement(icon, { color: isActive ? color : 'disabled' })}
	</IconButton>
);

export default ActionButton