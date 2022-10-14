import styles from './EmployeeCard.module.scss';

const EmployeeCard = ({ name, email, id , onRemove, team}) => {
	const { employee__card, employee__buttonDelete} = styles;

	return (
		<li className={employee__card}>
			<span>{name}</span>
			<span>{email}</span>
			<button 
				type="button"
				onClick={() => onRemove(id, team)}
				className={`${employee__buttonDelete} btn-sm`}>
				<i className="fas fa-trash"></i>
			</button>
		</li>
	);
}

export { EmployeeCard };