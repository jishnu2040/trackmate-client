Frontend (React)
Clone the Repository:

bash
Copy code
git clone https://github.com/your-username/task-manager-frontend.git
cd task-manager-frontend
Install Dependencies:

bash
Copy code
npm install
Start the Development Server:

bash
Copy code
npm start
API Endpoints
Task Management
List All Tasks:

GET /api/tasks/
Query parameters: search, status
Returns a paginated list of tasks.
Retrieve a Single Task:

GET /api/tasks/{id}/
Returns detailed information of a specific task.
Create a New Task:

POST /api/tasks/
Body: { "title": "string", "description": "string", "status": "boolean" }
Update a Task:

PUT /api/tasks/{id}/
Body: { "title": "string", "description": "string", "status": "boolean" }
Delete a Task:

DELETE /api/tasks/{id}/
Filter Tasks by Status:

GET /api/tasks/?status={status}
status can be completed or pending.
Frontend Components
Task List Page: Displays all tasks with filters for status. Allows users to view, edit, and delete tasks.

Create Task Form: A form to create a new task with fields for title and description.

Edit Task Form: Allows users to edit existing tasks.

Task Detail View: Displays detailed information of a task when clicked.

Registration and Authentication: Pages for user registration and login, including token management.

Tech Stack
Backend:

Django
Django REST Framework (DRF)
PostgreSQL
JWT for authentication
Frontend:

React
Axios for API requests
React Router for navigation
CSS for styling
Error Handling
Backend: Handles edge cases like invalid IDs and provides appropriate error messages.
Frontend: Displays error messages for failed API requests and other issues.
Responsive Design
Ensure the UI is responsive and user-friendly across all devices and screen sizes.

