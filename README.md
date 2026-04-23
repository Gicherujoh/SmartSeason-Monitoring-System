# SmartSeason Field Monitoring System

A full-stack web application for tracking crop progress across multiple fields during a growing season.  
Built to demonstrate system design, role-based access control, and practical business logic implementation.

---

## Features

###  Admin
- Create and manage fields
- Assign fields to agents
- View all field activities
- Monitor field status overview

###  Field Agent
- View assigned fields
- Update field stage (Planted → Growing → Ready → Harvested)
- Add notes and observations

---

##  Tech Stack

- Frontend: React.js, CSS
- Backend: Node.js, Express.js
- Database: MySQL
- Authentication: JWT
- API: RESTful architecture

---

##  Setup Instructions

### 1. Clone Repository
```bash
   1 git clone https://github.com/Gicherujoh/SmartSeason-Monitoring-System

### 2. Backend Setup
     cd smartseason-backend
     npm install.   

     Create .env file: 
          PORT=5000
          DB_NAME=smartseason
          DB_USER=root
          DB_PASSWORD=yourpassword
          DB_HOST=localhost
          JWT_SECRET=secret123.  

      Run backend: npm start;

### 3.Frontend Setup
       cd smartseason-frontend
       npm install
       npm run dev

### 4.Design Decisions
   Used role-based authentication (Admin / Agent) for secure access control
  Designed a simple field lifecycle model for clarity (Planted → Growing → Ready → Harvested)
  Separated backend and frontend for scalability
  Used JWT authentication for stateless sessions
  Chose MySQL for structured relational data (users, fields, notes)

### 5. Assumptions Made
   Each field is assigned to only one agent
   Only admins can create and assign fields
   Agents can only update fields assigned to them
   Field status is derived from stage + simple business rules
   Authentication is required for all protected routes

### 6. Demo Credentials
     Admin:
       email: admin@test.com
       password: 123456
    
      Agent:
        email: agent@test.com
        password: 123456
   