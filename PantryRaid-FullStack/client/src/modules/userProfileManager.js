import { getToken } from "./authManager";

const baseUrl = `/api/UserProfile`

export const getAllUsersFromApi = () => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((resp) => {
          if (resp.ok) {
            return resp.json();
          } else {
            throw new Error(
              "An unknown error occurred while trying to get quotes.",
            );
          }
        });
    });
};

export const getUserByFirebaseFromApi = () => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((resp) => {
          if (resp.ok) {
            return resp.json();
          } else {
            throw new Error(
              "An unknown error occurred.",
            );
          }
        });
    });
};

export const addNewUserToApi = (user) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }).then((resp) => {
          if (resp.ok) {
            return resp.json();
          } else if (resp.status === 401) {
            throw new Error("Unauthorized");
          } else {
            throw new Error(
              "An unknown error occurred while trying to save a new user.",
            );
          }
        });
    });
};

export const updateUserInApi = (user) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }).then((resp) => {
          if (resp.ok) {
            return resp.json();
          } else if (resp.status === 401) {
            throw new Error("Unauthorized");
          } else {
            throw new Error(
              "An unknown error occurred while trying to update a user.",
            );
          }
        });
    });
};