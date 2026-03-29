// Creates a custom class to organize the "good news" the server sends back
class ApiResponse {
    constructor(statusCode, message="Success", data) {

        this.statusCode = statusCode   // The HTTP success code (e.g., 200 for OK, 201 for Created)
        this.message = message        // The "Great job!" message the user sees on their screen
        this.data = data               // The actual "prize" (like user profile or sensor data)
        // Automatically sets success to true if the code is a "Healthy" number (under 400)
        this.success = statusCode < 400
    }
}

// Makes this success-formatting tool available to the rest of your app
export { ApiResponse }