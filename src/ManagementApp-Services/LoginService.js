export async function login(employee) {

    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/employee/login`,
        {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(employee)
        })
        .then(response => response.json())
}

export async function Adminlogin(admin) {

    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/login`,
        {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(admin)
        })
        .then(response => response.json())
}