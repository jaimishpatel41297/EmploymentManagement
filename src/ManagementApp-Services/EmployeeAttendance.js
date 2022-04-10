export async function getAttendanceDataByID(id) {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/attendance/attendacedataByattendanceID/${id}`)
        .then(response => response.json())
}

export async function getAttendanceDataByEmployee(id) {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/attendance/attendacedataByEmployee/${id}`)
        .then(response => response.json())
}

export async function addAttendanceData(emp, newAttendance) {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/attendance/${emp}`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newAttendance)
    });
}

export async function updateAttendanceData(id, newAttendance) {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/attendance/${id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newAttendance)
    });
}

