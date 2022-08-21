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
         ]
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

   onToggleIncrease = (id) => {
      this.setState(({ data }) => ({
         data: data.map(item => {
            if (item.id === id) {
               return { ...item, increase: !item.increase }
            }
            return item;
         })
      }))
   }

   onToggleRise = (id) => {
      this.setState(({ data }) => ({
         data: data.map(item => {
            if (item.id === id) {
               return { ...item, rise: !item.rise }
            }
            return item;
         })
      }))
   }

   render() {
      const employees = this.state.data.length;
      const increasedEmployees = this.state.data.filter(item => item.increase).length;

      return (
         <div className="app" >
            <AppInfo employees={employees} increasedEmployees={increasedEmployees} />

            <div className="search-panel">
               <SearchPanel />
               <AppFilter />
            </div>

            <EmployeesList
               data={this.state.data}
               onDelete={this.deleteItem}
               onToggleIncrease={this.onToggleIncrease}
               onToggleRise={this.onToggleRise} />
            <EmployeesAddForm onAdd={this.addItem} />
         </div>
      );
   }
}

export default App;
