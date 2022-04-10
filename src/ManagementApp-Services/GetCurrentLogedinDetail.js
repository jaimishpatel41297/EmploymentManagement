
export async function getCurrentEmployee(token) {

    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/employee/me`,
        {
            method: 'GET',
            headers: { 'x-access-token': token },
        })
        .then(response => response.json())
}
export async function getCurrentAdmin(token) {

    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/me`,
        {
            method: 'GET',
            headers: { 'x-access-token': token },
        })
        .then(response => response.json())
}
