// Config object to be passed to MSAL on creation
export const msalConfig = {
    auth: {
        clientId: "199aeeba-957d-4dc9-9db5-8963d2d9b832",
        authority:
            "https://login.microsoftonline.com/05645730-084a-4e31-a1cc-15250092a87a",
        redirectUri:
            import.meta.env.VITE_REDIRECT_URI || "http://localhost:5174/",
    },
    cache: {
        cacheLocation: "localStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
};
export const loginRequest = {
    redirectUri: import.meta.env.VITE_REDIRECT_URI || "http://localhost:5174/",
    scopes: ["User.Read", "Mail.Read"],
};
export const tokenRequest = {
    scopes: ["User.Read", "Mail.Read"],
    forceRefresh: false, // Set this to "true" to skip a cached token and go to the server to get a new token
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
    graphMailEndpoint: "https://graph.microsoft.com/v1.0/me/messages",
    graphUserMailEndpoint: (userId) => `https://graph.microsoft.com/v1.0/users/${userId}/messages`,
    graphGeneralEndpoint: `https://graph.microsoft.com/v1.0`
};
