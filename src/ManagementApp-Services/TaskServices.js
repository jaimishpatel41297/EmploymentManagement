export async function getAllTasks() {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/task`)
        .then(response => response.json())
}