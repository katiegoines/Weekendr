import axios from 'axios'
import jwtDecode from 'jwt-decode'

const clientAuth = axios.create()
clientAuth.defaults.headers.common.token = getToken()

function getToken() {
    return localStorage.getItem('token')
}

function setToken(token) {
    localStorage.setItem('token', token)
    return token
}

function getCurrentUser() {
    const token = getToken()
    if(token) return jwtDecode(token)
    return null
}

function logIn(credentials) {
    return clientAuth({method: 'post', url: '/api/users/authenticate', data:credentials})
    .then(res => {
        const token = res.data.token
        if(token) {
            clientAuth.defaults.headers.common.token = setToken(token)
            return jwtDecode(token)
        } else {
            return false
        }
    })
}

function signUp(userInfo) {
    return clientAuth({method: 'post', url: '/api/users', data: userInfo})
    .then(res => {
        // console.log(res.data)
        const token = res.data.token
        if(token) {
            clientAuth.defaults.headers.common.token = setToken(token)
            return jwtDecode(token)
        } else {
            // return false
            alert("Email already taken. Please try again.")
        }
    })
}

function logOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('search')
    localStorage.removeItem('town')
    delete clientAuth.defaults.headers.common.token
    return true
}

export default {
    getCurrentUser,
    logIn,
    signUp,
    logOut, 
    setToken
}