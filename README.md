# auth-server

# RESTful API Node Express for user authentication

The project builds RESTful APIs using Node.js, Express

## Manual Installation

Clone the repo:

```bash
git clone https://github.com/aniqaqill/auth-server.git
or
gh repo clone aniqaqill/auth-server
cd repo
```

Install the dependencies:

```bash
npm install
```
## Table of Contents

- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)

## Commands

Running in development:

```bash
npm start
# or
npm run dev
```

Running in production:

```bash
# build
npm run build
# start
npm run prod
```

## Environment Variables

The environment variables can be found and modified in the `.env` file.

```bash
# App name
APP_NAME = # default App Name

# Host
HOST = # default 0.0.0.0
# Port
PORT = # default 666

# URL frontend
FRONTEND_URL = # [default http://localhost:777](https://auth-client-fmh5gnrek-aniqaqill.vercel.app/)
```

### API Endpoints

List of available routes:

**Auth routes**:\
`POST localhost:3000/register` - Register\
`POST localhost:3000/login` - Login\
`POST localhost:3000/logout` - Logout\
`POST localhost:3000/profile` - Profile\
