
export const notFoundHandler = (req, resp) => {

    resp.status(404).json({
        status: 404,
        message: "Route not found"
    })
    
}
