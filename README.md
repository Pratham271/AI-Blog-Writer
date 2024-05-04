# Setting Up Write.it Locally
This guide will walk you through setting up Write.it locally on your machine. Follow these steps to get the application up and running smoothly.

## Prerequisites
- Node.js and npm installed on your machine
- Access to a public PostgreSQL URL from neondb or aiven
- Access to a Prisma Accelerate URL

## Steps

 ### 1. Clone the repo
   ```
   https://github.com/Pratham271/AI-Blog-Writer.git
  ```
### 2. Open in VS Code
  Open the cloned repository in Visual Studio Code or your preferred code editor.
### 3. Update Environment Variables
  - Navigate to the ``backend`` folder.
  - Update the ``.env`` and ``wrangler.toml`` files with your PostgreSQL URL from neondb or aiven, and the Prisma Accelerate URL.
### 4. Install Dependencies
  - Open a terminal and navigate to the common folder:
      ```
      cd common
      npm install
      ```
### 5. Install Dependencies in Frontend and Backend
  - Open two terminals in VS Code.
  - In one terminal, navigate to the ``backend`` folder:
    ```
    cd backend
    npm install
    ```
  - In the other terminal, navigate to the frontend folder:
    ```
    cd frontend
    npm install
    ````
### 6. Run the Application
  - In the terminal where you navigated to the ``backend`` folder, run:
    ```
    npm run dev
    ```
  - In the terminal where you navigated to the ``frontend`` folder, run:
    ```
    npm run dev
    ```
### 7. Access the Application
  Once both the frontend and backend servers are running, you should be able to access the application at http://localhost:3000 in your web browser.

## Additional Notes
  - Make sure all dependencies are installed and environment variables are correctly set before running the application.
  - If you encounter any issues, refer to the project's documentation or seek help from the project's community.
