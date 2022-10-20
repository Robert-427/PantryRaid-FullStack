const baseUrl = `api/UserProfile`

export const getAllUsersFromApi = () => {
    return fetch(baseUrl)
    .then((res) => res.json())
};

export const getUserByFirebaseFromApi = (firebaseUserId) => {
    return fetch(baseUrl+`/DoesUserExist/${firebaseUserId}`)
    .then((res) => res.json())
};

export const addNewUserToApi = (user) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};

export const updateUserInApi = (user) => {
    return fetch(baseUrl+`/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};