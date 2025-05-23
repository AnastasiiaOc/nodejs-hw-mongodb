
export const errorHandler = (error, req, resp, next) => {
    const { status = 500, message = "Something went wrong", data = error } = error;
    resp.status(status).json({
        message,
        data,  
    })
}


