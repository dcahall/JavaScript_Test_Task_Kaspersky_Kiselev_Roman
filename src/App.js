import {Welcome} from './pages/Welcome/Welcome';
import {Employees} from './pages/Employees/Employees';
import {Route, Routes} from 'react-router-dom';


function App() {
  return (
    <div className="App">
		<Routes>
			<Route path="/"
				element={ <Welcome/> }
			/>
			<Route path="/employees"
				element={ <Employees/> }
			/>
		</Routes>
    </div>
  );
}

export default App;
