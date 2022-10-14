import styles from './AddForm.module.scss'

import React from 'react';
import { dataService } from '../../services/dataService';



class AddForm extends React.Component {
	
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			email: '',
			team: '',
			group: ''
		}
	}

	onChange = (event) => {
		this.setState({[event.target.name]: event.target.value});
	}

	isValidData = (email, name) => {
		const isValidEmail =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(this.state.email.toLowerCase());
		const isValidName = this.state.name.split(' ');

		if (!isValidEmail) {
			alert('Your email is invalid');
			return false;
		} else if (isValidName.length < 2 || isValidName[0].length < 2 || isValidName[1].length < 2) {
			alert('Your name is invalid, example: "Kiselev Roman"');
			return false;
		}
		return true;
	}

	onSubmitUser = (e) => {
		e.preventDefault();

		const name = this.state.name;
		const team = this.state.team.length ? this.state.team : "Without team";
		const email = this.state.email;
		const { onAddUser, users, setUsers, activeGroup } = this.props;
		const newUser = { team, name, email, id: Date.now() };
		const data = new dataService();

		if (!this.isValidData(email, name)) {
			return ;
		}

		try {
			async function fetchData() {
				await data.addUser(newUser);

				onAddUser();
				if (activeGroup === team || activeGroup === "All employees") {
					setUsers([...users, newUser])
				}
            }
            fetchData();
        } catch (error) {
            alert(`Ошибка при загрузки данных с сервера`);
            console.log(error);
        }

		this.setState({ name: "", email: "", team: ""});
	}

	onSubmitGroup = (e) => {
		e.preventDefault();
		const data = new dataService();
		const { setGroups, groups } = this.props;
		const newGroup = {name: this.state.group, id: Date.now()}

		try {
			async function fetchData() {
				await data.addGroup(newGroup);

				setGroups([...groups, newGroup.name]);
            }
            fetchData();
        } catch (error) {
            alert(`Ошибка при загрузки данных с сервера`);
            console.log(error);
        }
		this.setState({group: ""})
	}

	render() {
		const { addForm } = styles;
		const { groups } = this.props;
		const { name, email, team, group } = this.state;

		return (
			<div className={addForm}>
				<h3>Add a new employee</h3>
				<form>
					<input
						type="text"
						className="form-control new-post-label"
						placeholder='Employee name'
						value={name}
						onChange={this.onChange}
						name="name"/>
					<input
						type="text"
						className="form-control new-post-label"
						placeholder='e-mail'
						value={email}
						onChange={this.onChange}
						name="email"/>
					<select
						className="form-select"
						aria-label="Default select example"
						value={team}
						onChange={this.onChange}
						name="team"
					>
						<option defaultValue>Select the team</option>
						{
							groups.map(group => <option key={group} value={group}>{group}</option>)
						}
					</select>
						<button type="sumbit" className="btn btn-outline-light" onClick={this.onSubmitUser}>
							Add
						</button>
				</form>
				<h3>Add a new employee group </h3>
				<form>
					<input
						type="text"
						className="form-control new-post-label"
						placeholder='Team name'
						name="group"
						onChange={this.onChange}
						value={group}
						/>
						<button onClick={this.onSubmitGroup} type="sumbit" className="btn btn-outline-light">
							Add
						</button>
				</form>
			</div>
		);
	}
};

export { AddForm };