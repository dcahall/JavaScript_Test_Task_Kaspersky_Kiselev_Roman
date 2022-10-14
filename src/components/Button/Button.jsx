import React from "react";

import styles from "./Button.module.scss"

const Button = ({name, active, onActiveButton, faImage}) => {
	const { button } = styles;

	return (
		<button 
			className={active ? `btn btn-light ${button}` : `btn btn-outline-light ${button}`}
			type="button"
			onClick={() => onActiveButton({ name, faImage})}
		>
			{name}
		{faImage && <i className={faImage}></i>}
		</button>
	);
}

export { Button };