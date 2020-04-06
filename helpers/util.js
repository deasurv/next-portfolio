export const getCookieFromRequest = (req, cookieKey) => {
    const cookie = req.headers.cookie.split(';').find(cookie => cookie.trim().startsWith(`${cookieKey}=`));
    if(!cookie) return undefined;
    return cookie.split('=')[1];
}