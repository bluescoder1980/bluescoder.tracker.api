+---------+------------------------------+--------------------------------+
| Methods |             Urls             |            Actions             |
+---------+------------------------------+--------------------------------+
| Get     | /api/v1/efdata                | Get all users                  |
| Get     | /api/v1/efdata/id/1           | Get user with id=1             |
| Get     | /api/v1/efdata/desc/julia     | Get user with username='julia' |
| Get     | /api/v1/efdata/whoami         | Get the current user details   |
| Post    | /api/v1/efdata                | Create new user                |
| Patch   | /api/v1/efdata/efdata/id/1    | Update user with id=1          |
| Delete  | /api/v1/efdata/id/1           | Delete user with id=1          |
| Post    | /api/v1/efdata/login          | Login with email and password  |
+---------+------------------------------+--------------------------------+