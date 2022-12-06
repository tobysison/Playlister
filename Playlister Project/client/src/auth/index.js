import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from './auth-request-api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGIN_GUEST: "LOGIN_GUEST",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    ACC_ERR_MODAL: "ACC_ERR_MODAL"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        guest: false,
        accErrModal: false,
        errMsg: ""
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    guest: false,
                    accErrModal: false,
                    errMsg: ""
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    guest: false,
                    accErrModal: false,
                    errMsg: ""
                })
            }
            case AuthActionType.LOGIN_GUEST: {
                return setAuth({
                    user: {firstName: "G", lastName: "T", email: "guest"},
                    loggedIn: true,
                    guest: true,
                    accErrModal: false,
                    errMsg: ""
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    guest: false,
                    accErrModal: false,
                    errMsg: ""
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    guest: false,
                    accErrModal: false,
                    errMsg: ""
                })
            }
            case AuthActionType.ACC_ERR_MODAL: {
                return setAuth({
                    user: auth.user,
                    loggedIn: false,
                    guest: false,
                    accErrModal: payload[0],
                    errMsg: payload[1]
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({type: AuthActionType.GET_LOGGED_IN, payload: {loggedIn: response.data.loggedIn, user: response.data.user}});
        }
    }

    auth.registerUser = async function(firstName, lastName, email, password, passwordVerify) {
        const response = await api.registerUser(firstName, lastName, email, password, passwordVerify);      
        if (response.data.success === true) {
            authReducer({
                type: AuthActionType.REGISTER_USER, payload: {user: response.data.user}
            })
            auth.loginUser(email, password);
        }
        else if(response.data.success === false) {
           auth.toggleAccErrModal(true, response.data.errorMessage);
        }
    }

    auth.loginUser = async function(email, password) {
        const response = await api.loginUser(email, password);
        if (response.data.success === true) {
            authReducer({type: AuthActionType.LOGIN_USER, payload: {user: response.data.user}})
            history.push("/");
        } 
        else if (response.data.success === false) {
            auth.toggleAccErrModal(true, response.data.errorMessage);
        }

    }

    auth.loginGuest = async function () {
        authReducer({type: AuthActionType.LOGIN_GUEST, payload: {}});
        history.push("/");
    }

    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer( {type: AuthActionType.LOGOUT_USER, payload: null})
            history.push("/");
        }
    }

    auth.getUserInitials = function() {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        console.log("user initials: " + initials);
        return initials;
    }

    auth.toggleAccErrModal = function (bool, msg) {
        authReducer({type: AuthActionType.ACC_ERR_MODAL, payload : [bool, msg]})
    }

    return (
        <AuthContext.Provider value={{auth}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };