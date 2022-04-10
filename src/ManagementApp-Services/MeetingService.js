export async function getAllMeetings() {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/meeting`)
        .then(response => response.json())
}

export async function getMeetingByMeetingID(id) {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/meeting/meetingId/${id}`)
        .then(response => response.json())
}

export async function getMeetingByEmployee(id) {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/meeting/${id}`)
        .then(response => response.json())
}

export async function addMeetingData(newMeeting) {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/meeting`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newMeeting)
    });
}

export async function updateMeetingData(id, newMeeting) {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/meeting/${id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newMeeting)
    });
}

export async function deleteMeetingByID(id) {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/meeting/${id}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' }
    });
}
