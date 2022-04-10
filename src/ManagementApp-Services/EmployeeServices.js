export async function getAllEmployees() {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/employee`)
        .then(response => response.json())
}


export async function getEmployee(id) {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/employee/${id}`)
        .then(response => response.json())
}

export async function addEmployeeData(newEmployee) {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/employee/registerEmployee`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newEmployee)
    });
}

export async function updateEmployeeData(id, newEmployee) {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/employee/updateEmployee/${id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newEmployee)
    });
}

export async function deleteEmployeeByID(id) {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/employee/deleteEmployee/${id}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' }
    });
}