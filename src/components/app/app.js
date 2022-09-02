import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';


import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: [
            { id: uuidv4(), name: 'John', salary: 3500, increase: false, rise: false },
            { id: uuidv4(), name: 'Alex', salary: 900, increase: false, rise: false },
            { id: uuidv4(), name: 'Carl', salary: 2000, increase: false, rise: false },
         ],
         term: "",
         filter: "all"
      }
   }

   deleteItem = (id) => {
      this.setState(({ data }) => {
         return {
            data: data.filter(item => item.id !== id)
         }
      })
   }

   addItem = (name, salary) => {
      const newItem = {
         name,
         salary,
         increase: false,
         rise: false,
         id: uuidv4()
      }
      this.setState(({ data }) => {
         const newArr = [...data, newItem];
         return {
            data: newArr
         }
      });
   }

   onToggleProp = (id, prop) => {
      this.setState(({ data }) => ({
         data: data.map(item => {
            if (item.id === id) {
               return { ...item, [prop]: !item[prop] }
            }
            return item;
         })
      }))
   }

   searchEmp = (items, term) => {
      if (term.length === 0) {
         return items;
      }

      return items.filter(item => {
         return item.name.indexOf(term) > -1;
      })
   }

   onUpdateSearch = (term) => {
      this.setState({ term });
   }

   filterPosts = (items, filter) => {
      switch (filter) {
         case "rised":
            return items.filter(item => item.rise);
         case "hugeSalary":
            return items.filter(item => item.salary > 1000);
         default:
            return items;
      }
   }

   onFilterSelect = (filter) => {
      this.setState({ filter });
   }

   render() {
      const { data, term, filter } = this.state;
      const employees = this.state.data.length;
      const increasedEmployees = this.state.data.filter(item => item.increase).length;
      const visibleData = this.filterPosts(this.searchEmp(data, term), filter);


      return (
         <div className="app" >
            <AppInfo employees={employees} increasedEmployees={increasedEmployees} />

            <div className="search-panel">
               <SearchPanel onUpdateSearch={this.onUpdateSearch} />
               <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
            </div>

            <EmployeesList
               data={visibleData}
               onDelete={this.deleteItem}
               onToggleProp={this.onToggleProp}
            />
            <EmployeesAddForm onAdd={this.addItem} />
         </div>
      );
   }
}

export default App;
