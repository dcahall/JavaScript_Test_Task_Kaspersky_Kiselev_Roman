class dataService {
	_apiBase = 'http://localhost:8000';

	getResource = async (url) => {
		let res = await fetch(this._apiBase + url);

		if (!res.ok) {
			throw new Error(`Couldn't fetch ${url}, status ${res.status}`);
		}

		return await res.json();
	}


	getAllUsers = async () => {
		return await this.getResource('/users');
	}
	
	getUsersGroup = async (groupName) => {
		return await this.getResource(`/users?team=${groupName}`);
	}
	
	getGroups = async () => {
		const response = await this.getResource('/groups');
		const allTeam = [];
		
		for (let key in response) {
			allTeam.push(response[key].name);
		}
		
		return allTeam;
	}
	
	deleteUser = async (id, group) => {
		await fetch(this._apiBase + `/users/${id}`, {method: "DELETE"});
		const groupUser = await this.getUsersGroup(group);

		if (groupUser.length === 0 && group !== "Without team") {
			await this.deleteGroup(group);
		}
	}

	deleteGroup = async (name) => {
		const group =  await this.getResource(`/groups?name=${name}`);
		const index = group[0].id;

		await fetch(`${this._apiBase}/groups/${index}`, { method: "DELETE" });
	}

	add = async (url, content) => {
		await fetch(`${this._apiBase}${url}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(content)
		})
	}

	addUser = async (user) => {
		await this.add('/users', user);
	}

	addGroup = async (group) => {
		await this.add('/groups', group);
	}
}

export { dataService };