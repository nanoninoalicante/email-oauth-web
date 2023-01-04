// Config object to be passed to MSAL on creation
export const msalConfig = {
    auth: {
        clientId: "5b2d983d-d256-4f9a-9824-7184a3989201",
        authority: "https://login.microsoftonline.com/fc9ed7be-3085-4832-a43a-a9b09096807c",
        redirectUri: "http://localhost:5173/",
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
};
export const loginRequest = {
    redirectUri: "http://localhost:5173/",
    scopes: ["User.Read", "Mail.Read", "IMAP.AccessAsUser.All"]
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};