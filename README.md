# Regov Technologies assignment
Based on the given Question 2.Implement a user registration and login API, connect mysql database, a user should be able to register and then use the registered detials to sign into the system. A signed in user should be able to log out from the system.

# Technologies Used for Front-End
- NodeJS
- ExpressJS
- Prisma 
- postgresql (Supabase)
- Vercel (Deployment)

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
npm run dev
```

# URL frontend
FRONTEND_URL = # 
[(https://auth-client-fmh5gnrek-aniqaqill.vercel.app/)](https://auth-server-production-84ee.up.railway.app/)


### API Endpoints

List of available routes:

**Auth routes**:\
`POST localhost:3000/register` - Register\
`POST localhost:3000/login` - Login\
`POST localhost:3000/logout` - Logout\
`POST localhost:3000/profile` - Profile\
