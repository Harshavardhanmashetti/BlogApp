const jwt = require('jsonwebtoken');
function createResponse(ok,message,data){
    return(
        ok,
        message,
        data
    );
}
function checkAuth(req, res, next) {
    //1.get auth and refresh token from cookies,if they don't exist return error
    //2.check expiry of authtoken, if authtoken is not expired then all is well exit function
    //3.check expiry of refreshToken ,if refreshToken is expired then ask for re login
    //4.if refresh token is not expired but auth is expired then generate the both Tokens

    const authToken = req.cookies.authToken;
    const refreshToken = req.cookies.refreshToken;
    console.log("Check Auth Token MIDDLEWARE CALLED");

    if (!authToken || !refreshToken) {
        return res.status(401).json(createResponse(false,"Authentication Failed :No authToken or Refresh Token"));
    }
    jwt.verify(authToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        //expired
        if (err) {
            console.log(err.message)
            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY, (refresherr, refreshdecoded) => {
                console.log("refreshDecoded "+refreshdecoded);
                //refresh token is expired & auth token is expired
                if (refresherr) {
                    //Both Tokens are invalid ,send an error message and prompt to login
                    return res.status(401).json(createResponse(true,"Authentication Failed : Both tokens are invalid"))
                }
                //refresh token is not expired but auth token is expired
                const newAuthToken = jwt.sign({ userId: refreshdecoded.userId }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });
                const newrefreshToken = jwt.sign({ userId: refreshdecoded.userId }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '40m' });
                res.cookie('authToken', newAuthToken, { httpOnly: true });
                res.cookie('refreshToken', newrefreshToken, { httpOnly: true });
                req.userId=refreshdecoded.userId;
                next();
            })
        }
        //not expired
        else {
            req.userId = decoded.userId;
            next();
        }
    })
}



module.exports = checkAuth;
