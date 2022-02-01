const verifyApiHeaderToken = (req, res, next) => {
    //const {apiToken} = req.headers;
    const apiToken = req.get('apiToken');
    if(apiToken){
        if(apiToken === process.env.API_TOKEN){//https://www.uuidgenerator.net/
            return next();
        }else{
            return sendUnauthorized(res);
        }
    }else{
        return sendUnauthorized(res);
    }
}

const sendUnauthorized = (res) => {
    return res.status(401).json({"Error":"Recurso no autorizado"});
}

module.exports = {
    verifyApiHeaderToken,
    sendUnauthorized
};