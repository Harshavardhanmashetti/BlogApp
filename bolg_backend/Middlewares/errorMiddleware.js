
function createResponse(ok,message,data){
    return(
        ok,
        message,
        data
    );
}function errorHandler(err,req,res,next){
    console.log(err.stack);

    if(res.headerSent){
        return next(err);
    }

    console.log("ERROR MIDDLEWARE CALLED");
    res.status(500).json(createResponse(falses,"Internal Server error",err.message));
}
module.exports=errorHandler