/*
In general, we know that middleware is only an asynchronous method 
that gets the req, the res, and the next arguments, so, if we want this 
middleware to get an additional argument, we'll do it this way
 (we'll use this in the auth middleware as well in the next step).

This function will get a callback, run the middleware script, and 
will attempt to trigger this callback in the try block.
If something goes wrong here, it will catch the error and we'll use 
the next(err) (which will transfer it to the next middleware => error.middleware.js).
*/

const awaitHandlerFactory = (middleware) => {
    return async (req, res, next) => {
        try {
            await middleware(req, res, next)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = awaitHandlerFactory;