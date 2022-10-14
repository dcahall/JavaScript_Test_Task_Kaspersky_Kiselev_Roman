import { Link } from "react-router-dom";

import styles from './Welcome.module.scss';


const Welcome = () => {
	const {welcome__section} = styles;

	return (
		<section className={welcome__section}>
				<h1>Hey, I am Roman</h1>
				<p>This is my employee records site</p>
				<Link to="/employees">
					<h2>Continue <i className="fas fa-chevron-right"></i></h2>
				</Link>
		</section>
	);
}

export {Welcome};