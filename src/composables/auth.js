import { utils } from "src/utils";
import { useAuthStore } from "src/stores/auth";

const publicPages = ["/", "/index", "/error"]; //public pages which do not need authentication

export function useAuth() {
    const store = useAuthStore();

    const user = store.state.user;

    let isLoggedIn = false;
    let userName = "";
    let userId = "";
    let userPhoto = "";

    setUserData();

    function setUserData() {
        if (user) {
            isLoggedIn = true;
            userName = user.username;
            userId = user.id;
            userPhoto = user.profile_image;
        }
    }

    async function getUserData() {
        const token = store.getLoginToken();
        //Token is available, user might still be logged in
        if (token) {
            try {
                //fetch user data for the first time and saves in the store
                await store.getUserData();
            } catch (e) {
                store.logout(); //token must have expired
            }
        }
        return {
            user: store.state.user,
        };
    }

    function login(payload) {
        return store.login(payload);
    }

    function saveLoginData(loginData, rememberUser) {
        const payload = { loginData, rememberUser };
        store.saveLoginData(payload);
    }

    function logout() {
        store.logout();
    }

    const pageRequiredAuth = function (path) {
        let pagePath = utils.getPagePath(path);
        let authRequired = true;
        if (publicPages.includes(pagePath)) {
            authRequired = false;
        }
        return authRequired;
    };

    return {
        store,
        isLoggedIn,
        user,
        userName,
        userId,
        userPhoto,
        getUserData,
        login,
        logout,
        saveLoginData,
        pageRequiredAuth,
    };
}
