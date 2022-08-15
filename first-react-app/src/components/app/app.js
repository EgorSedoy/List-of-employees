import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

function App() {
   return (
      <div className="app">
         <WhoAmI name="Egor" surname="Smith" link="https://eu4.paradoxwikis.com/images/c/c9/Province_ID_map.png" />
         <AppInfo />

         <div className="search-panel">
            <SearchPanel />
            <AppFilter />
         </div>

         <EmployeesList />
         <EmployeesAddForm />
      </div>
   );
}

export default App;
