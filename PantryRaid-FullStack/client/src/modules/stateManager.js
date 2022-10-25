const baseUrl = '/api/State'

export const getAllStatesFromApi = () => {
    return fetch(baseUrl)
    .then((res) => res.json())
}