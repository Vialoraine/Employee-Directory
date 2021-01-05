import React from 'react';
import Users from "./users.js";
import users from "../users.json";

class Table extends React.Component {
    state = {
        userList: users,
        sortOrder: "",
        filter: ""
    };

    handleNumSort = (whatToSort) => {
        let newSort;
        newSort = this.state.userList.sort((a, b) => {
            if (this.state.sortOrder === "des") {
                return a[whatToSort] - b[whatToSort];
            } else {
                return b[whatToSort] - a[whatToSort];
            }
        });
        console.log(newSort);
        const newSortOrder = this.state.sortOrder === "des" ? "asc" : "des";
        this.setState({ userList: newSort, sortOrder: newSortOrder })
    };

    handleStringSort = (whatToSort) => {
        const newSort = this.state.userList.sort((a, b) => {
            var stringA = a[whatToSort].toUpperCase();
            var stringB = b[whatToSort].toUpperCase();
            if (this.state.sortOrder === "des") {

                if (stringA < stringB) {
                    return -1;
                }
                if (stringA > stringB) {
                    return 1;
                }

                // strings must be equal
                return 0;
            } else {
                if (stringA < stringB) {
                    return 1;
                }
                if (stringA > stringB) {
                    return -1;
                }

                // strings must be equal
                return 0;
            }
        });
        console.log(newSort);
        const newSortOrder = this.state.sortOrder === "des" ? "asc" : "des";
        this.setState({ userList: newSort, sortOrder: newSortOrder })
    };

    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value.toLowerCase() || "";
        console.log(value);
        const name = event.target.name;
        let newFilter;
        newFilter = users.filter((filterUsers) => {
            filterUsers[name] = filterUsers[name].toLowerCase();
            console.log(filterUsers);
            return filterUsers[name].includes(value)
        })
        // Updating the input's state
        this.setState({
            filter: value,
            userList: newFilter
        });

        if (value === "") {
            this.setState({
                userList: users
            });
        }
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <table className="table">
                            <thead>
                                <tr>
                                    {/* Use these onClicks for sorting later */}
                                    <th scope="col" onClick={() => this.handleNumSort("id")}>#</th>
                                    <th scope="col" onClick={() => this.handleStringSort("firstName")}>First</th>
                                    <th scope="col" onClick={() => this.handleStringSort("lastName")}>Last</th>
                                    <th scope="col" onClick={() => this.handleStringSort("email")}>Email</th>
                                    <th scope="col" onClick={() => this.handleStringSort("phone")}>Phone</th>
                                </tr>
                            </thead>
                            {this.state.userList.map(user => (
                                <Users
                                    key={user.id}
                                    id={user.id}
                                    firstName={user.firstName}
                                    lastName={user.lastName}
                                    email={user.email}
                                    phone={user.phone} />
                            ))}
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10">
                        <form className="form" onSubmit={event => { event.preventDefault() }}>
                            <input
                                value={this.state.filter}
                                name="firstName"
                                onChange={this.handleInputChange}
                                type="text"
                                placeholder="Filter by first name..."
                            />
                            {/* <input
                                value={this.state.filter}
                                name="lastName"
                                onChange={this.handleInputChange}
                                type="text"
                                placeholder="Filter by last name..."
                            /> */}
                            {/* <button onClick={this.handleFormSubmit}>Submit</button> */}
                        </form>
                    </div>
                </div>
            </div >
        )
    }
}

export default Table;