export async function getAllLeaveRquests() {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/leaveRequest`)
        .then(response => response.json())
}

export async function getLeaveRequestsByleaveID(id) {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/leaveRequest/${id}`)
        .then(response => response.json())
}

export async function getLeaveRequestByEmployeeId(empID) {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/leaveRequest/leaveByEmployee/${empID}`)
        .then(response => response.json())
}

export async function getLeaveRequestByStatus(status) {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/leaveRequest/leaveByStatus/${status}`)
        .then(response => response.json())
}

export async function addLeaveRequestData(empId, newLeaveRequest) {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/leaveRequest/${empId}`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newLeaveRequest)
    });
}

export async function updateLeaveRequestData(id, newLeaveRequest) {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/leaveRequest/${id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newLeaveRequest)
    });
}

export async function deleteLeaveRequestByID(id) {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/leaveRequest/${id}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' }
    });
}

