export const getCookieFromRequest = (req, cookieKey) => {
    const cookie = req.headers.cookie.split(';').find(cookie => cookie.trim().startsWith(`${cookieKey}=`));
    if(!cookie) return undefined;
    return cookie.split('=')[1];
}

export const shortenText = (text, maxLength = 64) => {
    if(text && text.length > maxLength){
        return `${text.substr(0, maxLength)}...`
    }

    return text;
}