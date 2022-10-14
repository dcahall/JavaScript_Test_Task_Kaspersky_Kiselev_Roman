import { Group } from '../../components/GroupList/GroupList';
import { Info } from '../../components/Info/Info';
import { SearchPanel } from '../../components/SearchPanel/SearchPanel';
import { Filter } from '../../components/Filter/Filter';
import { EmployeesList } from '../../components/EmployeesList/EmployeesList';
import { AddForm } from '../../components/AddForm/AddForm';
import { dataService} from '../../services/dataService';

import React from 'react';

import styles from './Employees.module.scss'

const Employees = () => {
	const data = new dataService()
	const {employees, employees__menu, employees__search} = styles;
	const [users, setUsers] = React.useState([]);
	const [groups, setGroups] = React.useState([]);
	const [totalUsers, setTotalUsers] = React.useState(0);
	const [searchValue, setSearchValue] = React.useState('');
	const [sortType, setSortType] = React.useState('');
	const [activeGroup, setActiveGroup] = React.useState('All employees');

	React.useEffect(() => {
		try {
			async function fetchData() {
            	const [users, groups] = await Promise.all([
                    data.getAllUsers(),
					data.getGroups()]);
				
				setUsers(() => users);
				setGroups(() => groups);
				setTotalUsers(() => users.length);
            }
            fetchData();
        } catch (error) {
            alert(`Ошибка при загрузки данных с сервера`);
            console.log(error);
        }
	}, []);

	const sortUser = (users) => {
		if (!sortType) {
			return users;
		}

		const copy = users.map(user => user);
		const sign = sortType === "ascending" ? 1 : -1;

		copy.sort((a, b) => {
			const secondNameA = a.name.split(' ')[1].toLowerCase();
			const secondNameB = b.name.split(' ')[1].toLowerCase();

			if (secondNameA < secondNameB) {
				return -1 * sign;
			} else if (secondNameA > secondNameB) {
				return 1 * sign;
			}
			return 0;
		});
		return copy;
	}

	const onAddUser = () => {
		setTotalUsers(totalUsers + 1);
	}
	
	const onRemoveUser = () => {
		setTotalUsers(totalUsers - 1);
	}

	return (
		<div className={employees}>
			<Group 
				groupList={groups} 
				setUsers={setUsers}
				setGroups={setGroups}
				groups={groups}
				setTotalUsers={setTotalUsers}
				totalUsers={totalUsers}
				activeGroup={activeGroup}
				setActiveGroup={setActiveGroup}
				/>
			<div className={employees__menu}>
				<Info numGroups={groups.length} numUsers={totalUsers}/>
				<div className={employees__search}>
					<SearchPanel setSearchValue={setSearchValue} searchValue={searchValue}/>
					<Filter setSortType={setSortType}/>
					<EmployeesList 
						users={users}
						searchValue={searchValue}
						sortUser={sortUser}
						setUsers={setUsers}
						setTotalUsers={onRemoveUser}
						setGroups={setGroups}/>
					<AddForm
						groups={groups}
						onAddUser={onAddUser}
						users={users}
						setUsers={setUsers}
						activeGroup={activeGroup}
						setGroups={setGroups}
						groups={groups}
					/>
				</div>
			</div>
		</div>
	);
}

export { Employees };