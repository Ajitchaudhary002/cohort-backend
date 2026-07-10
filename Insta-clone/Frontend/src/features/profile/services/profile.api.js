import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
})

export const getFollowers = async () => {
    const response = await api.get('/users/followers');
    return response.data;
}

export const getFollowing = async () => {
    const response = await api.get('/users/following');
    return response.data;
}

export const doFollow = async (userId) => {
    const response = await api.post('/users/follow/' + userId)
    console.log(userId)
    console.log(response.data)
    return response.data
}

export const getFollowRequests = async () => {
    const response = await api.get('/users/follow-requests');
    return response.data;
}

export const updateFollowStatus = async (followId, status) => {
    const response = await api.patch(`/users/follow/${followId}`, { status });
    return response.data;
}