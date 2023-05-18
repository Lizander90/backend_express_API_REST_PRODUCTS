export function globalErrorHandler(error, req, resp, next) {
    console.log(`Control error Global ${error?.message}`)
    next(error)
}

export function handleBoomError(error, req, res, next) {
    if (!error.isBoom) {
        res.status(500).json(error.message)
    } else {
        const { output } = error
        // res.status(500).json('no era Boom')
        res.status(output.statusCode).json({
            statusCode: output.statusCode,
            message: output.payload,
            controller: 'boom error controller'
        })
    }
}

