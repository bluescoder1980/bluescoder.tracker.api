/*
The middleware will get req, res, and next callback, 
but it will also get an additional argument, error (by using next(error) 
before we get to this middleware).

We use destructuring to get the variables from the error object and 
set the status to 500 if it has not been configured before.

After this, whether the status is 500, we'll make sure to change the 
message so the user will recieve a generic internal server error message 
without revealing the exact nature of the failure.

After that, we create an error object with the type, status, and 
message properties (data is optional).
*/

function errorMiddleware(error, req, res, next) {
    let { status = 500, message, data } = error;

    console.log(`[Error] ${error}`);

    // If status code is 500 - change the message to Intrnal server error
    message = status === 500 || !message ? 'Internal server error' : message;

    error = {
        type: 'error',
        status,
        message,
        ...(data) && data
    }

    res.status(status).send(error);
}

module.exports = errorMiddleware;
/*
{
    type: 'error',
    status: 404,
    message: 'Not Found'
    data: {...} // optional
}
*/