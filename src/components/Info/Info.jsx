import styles from './Info.module.scss'

const Info = ({numGroups, numUsers}) => {
	const {info} = styles;
	return (
		<header className={info}>
			<h1>Company N</h1>
			<h2>Number of employees: {numUsers}</h2>
			<h2>Number of groups: {numGroups}</h2>
		</header>
	);
}

export { Info };