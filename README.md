# Authenticated Dashboard


# Objectives
- Part I
    - Set up the folder structure
    - Install needed packages
        - `express`
        - `mongoose`
        - `ejs`
        - `body-parser`
        - `passport`
        - `passport-local`
        - `passport-local-mongoose`
        - `express-session`
    - Add root route and template
    - Add dashboard(secret) route and template

- Part II
    - Create User Model
    - Configure Passport

- Part III
    - Add Register routes
    - Add Register form

- Part IV
    - Add Login route
    - Add Login form

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
    - Serializations: `UserSchema.plugin(passportLocalMongoose);` adds the methods `.deserializeUser()` and `.serializeUser()` to the `UserSchema` which is then exported.
        - `passport.deserializeUser(User.deserializeUser());`: Reading the encoded data from the session, un-encoding it
        - `passport.serializeUser(User.serializeUser());`: Encoding Data and putting it back to the session

- Middleware: 
    - Some code which runs before the final route callback
    - Multiple middlewares can be stacked up
    - They sit between the starting of the route and ending of the route (hence the name middleware)