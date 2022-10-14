import React from 'react';

import { Button } from "../Button/Button";

const Filter = ({ setSortType }) => {
	const [activeFilter, setActiveFilter] = React.useState('');
	
	const onActiveGroup = ({ name, faImage }) => {
		if (`${name} ${faImage}` == activeFilter) {
			setActiveFilter('');
			return ;
		}

		setActiveFilter(`${name} ${faImage}`);

		if (faImage == "fas fa-angle-up") {
			setSortType("ascending");
		} else {
			setSortType("descending");
		}
	}

	return (
		<div className="btn-group">
			<Button name="Surname"
					faImage={'fas fa-angle-up'}
					onActiveButton={onActiveGroup}
					active={activeFilter === "Surname fas fa-angle-up" ? true : false}/>
			<Button name="Surname"
					faImage={'fas fa-angle-down'}
					onActiveButton={onActiveGroup}
					active={activeFilter === "Surname fas fa-angle-down" ? true : false}/>
		</div>
	);
}

export { Filter };