export async function getAllProjects() {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/project`)
        .then(response => response.json())
}

export async function getProjectByProjectID(id) {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/project/projectId/${id}`)
        .then(response => response.json())
}

export async function getProjectByEmployee(id) {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/project/employeeId/${id}`)
        .then(response => response.json())
}

export async function addProjectData(newProject) {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/project`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newProject)
    });
}

export async function updateProjectData(id, newProject) {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/project/${id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newProject)
    });
}

export async function deleteProjectByID(id) {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/project/${id}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' }
    });
}
