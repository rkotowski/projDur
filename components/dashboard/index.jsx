import React from 'react';
import { EmployeeList } from './employees/list'

let Dashboard = React.createClass({
    render() {
        return(
            <div className="PageWrapper">
                <h3 className="pageHeading">Strona główna</h3>
                <EmployeeList />
            </div>
        )
    }
});

export default Dashboard;