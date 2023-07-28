
import { user } from '../config/AppConstants';

export function getToken() {
    var obj;
    var key = user.token;
    obj = (localStorage.getItem(user.user));
    if (obj != null) {
        obj = JSON.parse(obj);
        return obj[key];
    } else {
        return obj;
    }
}

export function setToken(token) {
    var obj = localStorage.getItem(user.user);
    if (obj) {
        obj = JSON.parse(obj);
    } else {
        obj = {};
    }
    // var obj={};
    var key = user.token;
    obj[key] = token;
    localStorage.setItem(user.user, JSON.stringify(obj));
}

export function removeUserToken(){
    console.log("remove auth called");
    localStorage.removeItem(user.user);
}

