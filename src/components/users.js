import React from 'react';

function Users(props) {
    return (
        <tbody>
            <tr>
                <th scope="row" key={props.id}>{props.id}</th>
                <td>{props.firstName.charAt(0).toUpperCase()}{props.firstName.slice(1)}</td>
                <td>{props.lastName}</td>
                <td>{props.email}</td>
                <td>{props.phone}</td>
            </tr>
        </tbody>
    )
}

export default Users;