import { ref, onMounted } from "vue";
import * as msal from "@azure/msal-browser";
import { msalConfig, loginRequest } from "../authConfig";
const myMSALObj = new msal.PublicClientApplication(msalConfig);
const userData = ref(null);
const accessToken = ref(null);
const login = async () => {
    const response = await myMSALObj
        .loginPopup(loginRequest)
        .then((r) => r)
        .catch((error) => {
            console.error(error);
        });
    console.log("response: ", response);
    userData.value = response.account;
    accessToken.value = response.accessToken;
};
const checkAccounts = () => {
    const currentAccounts = myMSALObj.getAllAccounts();
    console.log("current accounts; ", currentAccounts);
    if (currentAccounts && currentAccounts.length > 0) {
        userData.value = currentAccounts[0];
    }
};
function callMSGraph(endpoint, token, callback) {
    const headers = new Headers();
    const bearer = `Bearer ${token}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    console.log('request made to Graph API at: ' + new Date().toString());

    fetch(endpoint, options)
        .then(response => response.json())
        .then(response => callback(response, endpoint))
        .catch(error => console.log(error));
}
const getTokenRedirect = (request) => {
    /**
     * See here for more info on account retrieval:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */
    request.account = myMSALObj.getAccountByUsername(userData.value.username);

    return myMSALObj.acquireTokenSilent(request).catch((error) => {
        console.warn(
            "silent token acquisition fails. acquiring token using redirect"
        );
        if (error instanceof msal.InteractionRequiredAuthError) {
            // fallback to interaction when silent call fails
            return myMSALObj.acquireTokenPopup(request);
        } else {
            console.warn(error);
        }
    });
};
const seeProfile = () => {
    getTokenRedirect(loginRequest)
        .then((response) => {
            console.log("token: ", response);
            accessToken.value = response.accessToken;
        })
        .catch((error) => {
            console.error(error);
        });
};
export function useLogin() {
    return {
        seeProfile,
        accessToken,
        userData,
        getTokenRedirect,
        checkAccounts,
        login
    };
}