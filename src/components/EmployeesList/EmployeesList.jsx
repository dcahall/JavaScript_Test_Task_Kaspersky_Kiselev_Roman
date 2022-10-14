import { dataService } from '../../services/dataService';
import { EmployeeCard } from '../EmployeeCard/EmployeeCard';

import styles from './EmployeesList.module.scss';

const EmployeesList = (
	{
		users,
		searchValue,
		sortUser,
		setUsers,
		setTotalUsers,
		setGroups
	}) => {
	const { employees__list } = styles;
	const filtredUsers = users.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));
	const sortedUsers = sortUser(filtredUsers)
	const data = new dataService;

	const deleteEmployee = (id, team) => {
		try {
			async function fetchData() {
				await data.deleteUser(id, team);
				const groups = await data.getGroups();
				const updatedUsers = users.filter(user => user.id !== id);
				
				setGroups(groups);
				setUsers(updatedUsers);
				setTotalUsers();
			}
			fetchData();
		} catch (error) {
			alert(`Ошибка при загрузки данных с сервера`);
			console.log(error);
		}
	}

	return (
		<ul className={employees__list}>
			{
				sortedUsers.map(user => <EmployeeCard
									key={user.email}
									name={user.name}
									email={user.email}
									id={user.id}
									team={user.team}
									onRemove={deleteEmployee}
									/>)
			}
		</ul>
	);
}

export { EmployeesList };