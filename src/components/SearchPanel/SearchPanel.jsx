import styles from './SearchPanel.module.scss'

const SearchPanel = ({ searchValue, setSearchValue }) => {
	const {searchPanel, searchPanel__clear, searchPanel__searchImg} = styles;

	return (
		<div className={searchPanel}>
			{
				searchValue && <img
					onClick={() => setSearchValue('')}
					className={searchPanel__clear}
					src="img/btn-remove.svg"
					alt="Close"/>
			}
			<img src="img/search.svg" alt="Search" className={searchPanel__searchImg}></img>
			<input
				type="text"
				className="form-control search-input"
				placeholder="Employee Search"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}/>
		</div>
	);
}

export { SearchPanel };