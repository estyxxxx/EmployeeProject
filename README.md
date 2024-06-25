<img width="947" alt="צילום מסך 2024-06-25 184559" src="https://github.com/estyxxxx/EmployeeProject/assets/148995898/ac094851-6fb4-4a04-b3d6-6247be77c58d"><img width="947" alt="image" src="https://github.com/estyxxxx/EmployeeProject/assets/148995898/d07996a5-b6e1-4686-b86a-73fed2335fbc"># Employee Management System

## Description

This project is an Employee Management System built with Angular, C# .NET, and SQL database. It provides functionalities for viewing, adding, editing, and deleting employees and their positions. The system has two different views: user view and admin view.

## Features

- **User View**:
  - Login functionality for users.
  - Display a table of employees with basic details (first name, last name, ID card, date of joining).
  - Search functionality to filter employees.
  - Download table as Excel functionality.

- **Admin View** (additional to User View):
  - Add Employee button to add a new employee with detailed information (first name, last name, ID card, date of joining, date of birth, gender).
  - Ability to add positions for employees with details (position name, entry date, managerial position).
  - Edit and delete functionality for employees.

## Technologies Used

- Angular
- C# .NET
- SQL Database

## External Libraries

- Swal
- LordIcon
- Angular Material

## Server Side Architecture

The server side is built using the three-layer method:
- **CORE**: Core functionality and business logic.
- **DATA**: Data access layer responsible for interacting with the database.
- **SERVICE**: Service layer to handle client requests and perform validations.

## Database Structure

The database consists of three main tables:
1. **Employee Table**: Contains employee details (first name, last name, ID card, date of joining, date of birth, gender).
2. **Position Table**: Contains position details (position name, entry date, managerial position).
3. **Job Type Table**: Contains job names.


## Usage

1. Clone the repository.
2. Set up the database and configure connection strings.
3. Run the backend server.
4. Run the Angular application.
5. Access the application through the provided URL.
6. Log in to access the user or admin view.

## Screenshots

<!--![Login Screen](login.png)
![User View](user_view.png)
![Admin View](admin_view.png)-->
![Uploading צילום מסך 2024-06-25 184559.png…]()
Will reveal soon...

## Contributors

- Esty - [GitHub: Estyxxxx](https://github.com/Estyxxxx)

## License

This project is licensed under the [MIT License](LICENSE).

