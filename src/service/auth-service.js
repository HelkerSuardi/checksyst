'use strict';

import * as jwt from 'jsonwebtoken';

const ID_KEY = process.env.ID_KEY || '_phx_id_';
const SOCKET_KEY = process.env.PUSHER_KEY || '_phx_socket_';
const TOKEN_KEY = process.env.TOKEN_KEY || '_phx_token_';
const USERNAME_KEY = process.env.USERNAME_KEY || '_phx_username_';
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;

const login = data => {
    const { token, name, _id } = data;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USERNAME_KEY, name);
    localStorage.setItem(ID_KEY, _id);
};

const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(ID_KEY);
    sessionStorage.clear();
    window.location.href = '/login';
};

const getId = () => {
    return localStorage.getItem(ID_KEY);
};

const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

const getUsername = () => {
    return localStorage.getItem(USERNAME_KEY);
};

const getSocketKey = () => {
    return sessionStorage.getItem(SOCKET_KEY);
};

const loggedIn = async () => {
    const token = getToken();

    if (!token) {
        return false;
    }

    try {
        return await jwt.verify(token, JWT_TOKEN_SECRET);
    } catch (e) {
        return false;
    }
};

export default {
    login,
    logout,
    loggedIn,
    getId,
    getToken,
    getUsername,
    getSocketKey,
};
