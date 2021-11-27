

// TODO: Requests to non-existing endpoints (e.g. /some-non/existing/resource) should be handled. Return 404 status
// {
//   message: "Resource that you requested doesn't exist"
// }


// TODO: Internal server errors should be handled and processed correctly. Return 500 status
// Something went wrong

// TODO: if invalid ID passed for GET, show 400 and message
// Invalid data in request

// TODO: support path /person

// TODO: GET /person or /person/${personId} should return all persons or person with corresponding personId

// TODO: POST /person is used to create record about new person and store it in database
// 201 status Created

// TODO: PUT /person/${personId} is used to update record about existing person

// TODO: DELETE /person/${personId} is used to delete record about existing person from database
// Response 204 status, empty body