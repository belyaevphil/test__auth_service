# Test task - Auth service

## Tech stack:

- Node.js
- JWT
- MongoDB

## Todo:

To write the part of the authentication service with 2 REST endpoints:

- First endpoint should give Access and Refresh tokens to user with his own GUID. GUID should be delivered as a query parameter.
- Second endpoint should refresh tokens.

## Requirements:

- Access token should be a JWT encoded with SHA512 and shouldn't be present in the DB.
- Refresh token should be stored in the DB exclusively as a bcrypt hash, should be protected from changing on the client side and from repeatedly usage.
- Access and Refresh tokens should be coupled, i.e. refresh operation for Access token can be executed only with that Refresh token, which was given with it.
