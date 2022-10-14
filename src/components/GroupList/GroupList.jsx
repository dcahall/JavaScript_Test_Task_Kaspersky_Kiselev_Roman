import styles from './GroupList.module.scss'

import React from 'react';
import { Button } from '../Button/Button';
import { dataService } from '../../services/dataService';

const Group = ({ groupList, setUsers, activeGroup, setActiveGroup}) => {
	const { groupBlock } = styles;
	const	data = new dataService();

	const onActiveGroup = ({ name }) => {

		setActiveGroup(() => name);

		try {
			async function fetchData() {
				let users;
				
				if (name === 'All employees') {
					users = await data.getAllUsers();
				} else {
					users = await data.getUsersGroup(name);
				}
				
				setUsers(() => users);
            }
            fetchData();
        } catch (error) {
            alert(`Ошибка при загрузки данных с сервера`);
            console.log(error);
        }
	}

	return (
		<aside className={groupBlock}>
			<h2>Teams</h2>
			<div className="d-grid gap-2">
				<Button name="All employees" active={activeGroup === 'All employees' ? true : false} onActiveButton={onActiveGroup}/>
				<Button name="Without team" active={activeGroup === 'Without team' ? true : false} onActiveButton={onActiveGroup}/>
				{
					groupList.map(name => <Button
											name={name}
											key={name}
											active={activeGroup === name ? true : false}
											onActiveButton={onActiveGroup}/>)
				}
			</div>
		</aside>
	);
}

export {Group};