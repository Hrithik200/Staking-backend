# About me 
“I’m a blockchain developer who also builds production-ready backend systems to handle Web3 transaction flows, integrate smart contracts, and ensure DB consistency. I don’t just write contracts — I build the whole system around them.”

# 1️⃣ Create Project Directory
mkdir Staking-Backend && cd Staking-Backend

# 2️⃣ Initialize Node.js Project
npm init -y

# 3️⃣ Install Dependencies
npm install express mongoose dotenv web3 cors body-parser

# 4️⃣ Install Dev Dependencies
npm install --save-dev typescript ts-node @types/express @types/node @types/mongoose

# 5️⃣ Initialize TypeScript
npx tsc --init

# 6️⃣ Create Folder Structure
mkdir src src/controllers src/services src/repositories src/models src/config src/routes

# 7️⃣ Create Essential Files
touch src/server.ts src/config/db.ts .env

#  Staking-Backend project is now ready! 🎉🚀
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": " nodemon --exec ts-node src/server.ts"
    
npm install --save-dev nodemon
nodemon --exec ts-node src/server.ts
npm run dev


# To start mongo DB
# In terminal
````
brew services start mongodb-community
````
In PC--> mongo compass
````
Connect from mongoDb compass while selecting connect`
````
VS code - Project

````
check backend connection its connected
````
THIRD PARTY PROVIDER -API --->TATUM
````
Logged in Tatum
Registered
got 1lakh free calls and more 
techky 
999

To use API in project 
npm install axios  -http client
set API key in env
Created in service folder 

````

Using logger
````
npm install winston

````
For Validations
````
npm install zod 

````
````
validator,req,res


 vala 123453678

-ZOD

event emitter -done- half socket is pending

Queue 
Cron
Scheduling
Server
** Index file add in all if required

pending - DONE Pm2 in live


````
Users
````
Add button to switch user and also add a button to add a new user
Admin
User 1 
User 2 
User 3 
````

````
✅ 2xx (Success) - Request was successful
Status Code	Meaning	When to Use
200 OK	Request successful	When a request is completed successfully (e.g., fetching user data, successful transaction)
201 Created	Resource successfully created	When a new resource is created (e.g., user sign up, new record in the database)
204 No Content	Successful but no response body	When a request is successful but doesn’t need to return a response (e.g., deleting a record)
⚠️ 4xx (Client Errors) - The request is incorrect
Status Code	Meaning	When to Use
400 Bad Request	Client sent an invalid request	Missing required fields, invalid JSON, wrong query parameters
401 Unauthorized	Authentication required	When a user is not logged in or lacks a valid token
402 Payment Required	Reserved for payment-related issues	Usually used for APIs requiring a paid subscription
403 Forbidden	User authenticated but lacks permissions	When a logged-in user tries to access an admin-only resource
404 Not Found	Resource not found	When the requested URL or data doesn't exist
405 Method Not Allowed	HTTP method not supported	If a client sends a POST request to an endpoint that only allows GET
❌ 5xx (Server Errors) - Something is wrong with the backend
Status Code	Meaning	When to Use
500 Internal Server Error	Unexpected server issue	A generic error for unhandled exceptions (e.g., database crashes, unknown bugs)
502 Bad Gateway	Invalid response from an upstream server	If your backend is calling another API that fails
503 Service Unavailable	Server is overloaded or under maintenance	If your server is temporarily down
504 Gateway Timeout	Server took too long to respond	If a request takes too long (e.g., external API calls time out)
````
````
Complete Queue for transaction processing

````

````
Queue (bullmq) + Redis Installation 
npm install bullmq ioredis
npm install --save-dev @types/ioredis

````
````
IMPORTANT:
Blockchain Side apply graph and sub graph for data indexing which is going onto the blockchain
````
````
Add infura web socket free tier edition to handle transaction time from etherscan

````
# EXTENSION
````
Console log : option + shift + L
Spell check :cmd + .
````
# WORKING OF QUEUE IMPLEMENTATION
````
1. Controller mai validation check kia then Queue mai pass kr dia jo Queue mai function create kia tha 
2. 
````
# PENDING
````
1 After server crashed update the ongoing transaction and check redis to not to repeat the same transaction avoid double spending

````

````
1.change connectDB when server starts
2.Rate limiter API
3.How to use MONGO COMPASS
````
# The Graph
````
https://api.studio.thegraph.com/query/110411/staking/version/latest
````

# GNOSIS SAFE
````
Address sep:0x18F4E5E235DC89Ac33d90b37842911454322be30

user was DAF AND EBF 
2/2 required user to sign message

````