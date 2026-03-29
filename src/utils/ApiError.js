// Creates a custom "ApiError" class that builds on top of the default JavaScript Error
class ApiError extends Error {
    constructor(
        statusCode,                      // The HTTP code for the error (e.g., 400, 404, 500)
        message= "Something went wrong", // The main message you want the user to see
        errors= [],                      // A list of specific errors (like "Email is invalid")
        stack = ""                       // The "pathway" or history of where the error started
    ) {
        super(message);                  // Tells the built-in Error class what the message is
        this.statusCode = statusCode     // Stores the error number for the frontend to read
        this.message = message           // Sets the custom text description of the error
        this.data= null                  // Errors don't return "prizes," so this is kept empty
        this.success = false;            // A clear "No" flag so the app knows the request failed
        this.errors = errors             // Attaches the detailed list of specific mistakes

        if (stack) {
            this.stack = stack           // Use the provided history if it already exists
        } else {
            // If no history exists, create a fresh "map" to the exact line of code that broke
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

// Makes this custom Error tool available for other files in your project
export { ApiError }