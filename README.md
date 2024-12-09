# Banking App Test Project

## Getting Started

1. **Create a `.env` file** based on the `.env.example` file provided in the project.

2. **Install the necessary dependencies:**
   ```bash
   npm install
   ```

3. **Start Docker services:**
   ```bash
   docker-compose up
   ```

4. **Set up the database:**
   Run the following commands to create and populate your database tables:
   ```bash
   npm run migrate
   npm run seed
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **View the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

## Deploy on Vercel

This project has been deployed on Vercel. You can access the live version of the application here: [Banking App](https://banking-test-app.vercel.app/)
