# Regov Technologies assignment
Based on the given Question 2.Implement a user registration and login API, connect mysql database, a user should be able to register and then use the registered details to sign into the system. A signed in user should be able to log out from the system.

# Technologies Used for Back-end
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

## Commands

Running in development:

```bash
npm run dev
```

# API URL
FRONTEND_URL = # 
(https://auth-server-production-84ee.up.railway.app/)


### API Endpoints

List of available routes:

**Auth routes**:\
`POST https://auth-server-production-84ee.up.railway.app/register` - Register\
`POST https://auth-server-production-84ee.up.railway.app/login` - Login\
`POST https://auth-server-production-84ee.up.railway.app/logout` - Logout\
`POST https://auth-server-production-84ee.up.railway.app/profile` - Profile\
