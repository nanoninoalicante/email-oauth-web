import { ref, onMounted } from "vue";
import * as msal from "@azure/msal-browser";
import {
    msalConfig,
    loginRequest,
    graphConfig,
    tokenRequest,
} from "../authConfig";
const myMSALObj = new msal.PublicClientApplication(msalConfig);
const userData = ref("");
const accessToken = ref("");
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
    if (!currentAccounts) return null;
    if (currentAccounts && currentAccounts.length > 0) {
        userData.value = currentAccounts[0];
        return currentAccounts[0];
    }
    return null;
};
const getTokenRedirect = async (request) => {
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
const getToken = async () => {
    return getTokenRedirect(tokenRequest)
        .then((response) => {
            console.log("token: ", response);
            accessToken.value = response.accessToken;
            return response.accessToken;
        })
        .catch((error) => {
            console.error(error);
        });
};
const callMSGraph = async (endpoint, token) => {
    const headers = new Headers();
    const bearer = `Bearer ${token}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers,
    };

    console.log("request made to Graph API at: " + new Date().toString());

    const response = await fetch(endpoint, options)
        .then((response) => response.json())
        .catch((error) => console.log(error));
    return { response, endpoint };
};
const callAdminApi = async (msQueryUrl = "") => {
    const headers = new Headers();
    headers.append("Authorization", "612684c4-e126-4847-ac80-7fb39b374c46");

    const queryParams = new URLSearchParams({
        url: msQueryUrl
    })

    const options = {
        method: "GET",
        headers: headers
    };

    const url = `https://sa-graph-email-api-dev-v1-us-dovueulyuq-ue.a.run.app/email?${queryParams.toString()}`

    console.log("request made to admin API at: " + new Date().toString());

    const response = await fetch(url, options)
        .then((response) => response.json())
        .catch((error) => console.log(error));
    return { response };
};

const adminListUsers = async () => {
    return await callAdminApi(`${graphConfig.graphGeneralEndpoint}/users`);
}

const readAdminMail = async (filterEmail = null, userId = null) => {
    if (!userId) return null;
    const filterString = filterEmail ? `?$filter = (from / emailAddress / address) eq '${filterEmail}'` : ""
    return await callAdminApi(`${graphConfig.graphUserMailEndpoint(userId)}${filterString}`);
}

const readMail = async (filterEmail = null, direction = "from") => {
    const token = await getToken();
    if (direction === "to") {
        const filterString = filterEmail ? `?$search="to:${filterEmail}"` : ""
        return callMSGraph(`${graphConfig.graphMeEndpoint}/mailFolders/sentItems/messages${filterString}`, token);
    }
    const filterString = filterEmail ? `?$filter = (from / emailAddress / address) eq '${filterEmail}'` : ""
    return callMSGraph(`${graphConfig.graphMailEndpoint}${filterString}`, token);
};
const seeProfile = async () => {
    const token = await getToken();
    return callMSGraph(graphConfig.graphMeEndpoint, token);
};

const signOut = (username) => {

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    const logoutRequest = {
        account: myMSALObj.getAccountByUsername(username),
        postLogoutRedirectUri: msalConfig.auth.redirectUri,
        mainWindowRedirectUri: msalConfig.auth.redirectUri
    };

    myMSALObj.logoutPopup(logoutRequest);
}
export function useLogin() {
    return {
        getToken,
        accessToken,
        userData,
        getTokenRedirect,
        checkAccounts,
        login,
        readMail,
        seeProfile,
        signOut,
        readAdminMail,
        adminListUsers
    };
}
