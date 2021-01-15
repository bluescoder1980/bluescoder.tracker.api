/*
Let’s try to break it down into pieces:

You can create a router using express.Router(). Each route can load 
a middleware function that handles the business logic. UserController, 
for example carries all the main middlewares. To use the router, 
the router should be exported as a module and used in the main app 
using app.use(router_module).
We used auth middleware for user authentication and authorization, 
for checking user token or user role for the route. In our example, 
some of the routes use the auth middleware for checking user authentication 
and authorization. This middleware will be triggered before the main 
middleware (the one that holds the business logic). The next callback 
must be called to pass control to the next middleware method. Otherwise, 
the request will be left hanging.
awaitHandlerFactory (try-catch middleware) is used to wrap all the 
asynchronous middleware. This way, if one of the middleware throws an error, awaitHandlerFactory will catch that error. You can see that all of our middleware functions are wrapped with awaitHandlerFactory middleware, which helps us to handle our errors by using try-catch in one place.
In addition, we have the createUserSchema, updateUserSchema and validateLogin schema to validate the body before we start the next middleware.
*/

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');


router.get('/', auth(), awaitHandlerFactory(userController.getAllUsers)); // localhost:3000/api/v1/users
router.get('/id/:id', auth(), awaitHandlerFactory(userController.getUserById)); // localhost:3000/api/v1/users/id/1
router.get('/username/:username', auth(), awaitHandlerFactory(userController.getUserByuserName)); // localhost:3000/api/v1/users/usersname/julia
router.get('/whoami', auth(), awaitHandlerFactory(userController.getCurrentUser)); // localhost:3000/api/v1/users/whoami
router.post('/', createUserSchema, awaitHandlerFactory(userController.createUser)); // localhost:3000/api/v1/users
router.patch('/id/:id', auth(Role.Admin), updateUserSchema, awaitHandlerFactory(userController.updateUser)); // localhost:3000/api/v1/users/id/1 , using patch for partial update
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(userController.deleteUser)); // localhost:3000/api/v1/users/id/1


router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin)); // localhost:3000/api/v1/users/login

module.exports = router;