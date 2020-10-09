# Authenticated Dashboard



# Notes on Authentication
## Introduction to Auth
- Tools
    - Passport
    - Passport Local
    - Passport Local Mongoose
    - Express Session

- Sessions
    - Basically HTTP requests are know to be "stateless" protocols. Requests are one time thing and do not contain the history of the previous requests. 
    - Sessions make HTTP not stateless. A little bit of information about the user is saved in the request - which is not the username/password. This information is decoded by the server to know whether the user is logged in or not