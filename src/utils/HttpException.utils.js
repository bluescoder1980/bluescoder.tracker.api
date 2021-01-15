/*
The HttpException class inherits the Error class.
The constructor will get the status, message, and data. 
We will pass the message variable to the parent constructor using 
super(message), and then we will initialize the status, message, and 
data instance variables.
*/

class HttpException extends Error {
    constructor(status, message, data) {
        super(message);
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

module.exports = HttpException;