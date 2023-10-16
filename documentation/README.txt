Welcome to VacServ!

Users of the System:
Admin
Customer
Functional Requirements:
Build an application that allows customers to book an appointment for servicing their vacuum cleaner.
Display the list of service centers and their availability.
Enable selection of a specific service center based on availability and enter vacuum cleaner details.
Allow users to describe the nature of the problem.
Generate the bill automatically based on the service provided.
Ensure appointment date cannot be less than the current date.
Display service center availability for the next 5 days.
Implement search functionality based on location (place, district) and sort service centers from closest to farthest.
Provide provision for generating reports.
Maintain a database for customer information, Admin information, Appointment information, and Bill information.
Allow customers to provide reviews.
Nice to Have Add-on Features:
Filters such as Low to High or based on customer's price range, specific Company, etc.
Non-Functional Requirements:
Security:
App Platform: Username/Password-Based Credentials.
Store sensitive data securely.
Ensure secure connection for data transmission.
Performance:
Handle peak load performance (during Festival days, National holidays, etc.).
Technology Stack:
Front End:

React 16+
Material Design
Server Side Database:

Spring Boot/MySQL
Platform Prerequisites (Do's and Don'ts):
Angular app or React app should run on port 8081.
Spring Boot app and .NET app should run on port 8080.
Strictly adhere to the project scaffolding, coding conventions, method definitions, and return types.
Adhere strictly to the specified endpoints.
Follow the provided screenshots for id mapping and attribute mapping.
Application Assumptions:
The login page should be the first page rendered when the application loads.
Manual routing should be restricted using Auth Guard.
User must be logged in to navigate to other pages.
Admin access can be achieved by storing a user type as admin in the database with username and password as admin.
Admin login: Username: admin, Password: admin
Project Tasks:
API Endpoints:
Admin Side:

Admin Login:

URL: /admin/login
Method: POST
Request: Sends email ID and password
Response: True/False
Admin SignUp:

URL: /admin/signup
Method: POST
Request: Sends Admin Model data
Response: Admin added
Admin Add Service Center:

URL: /admin/addServiceCenter
Method: POST
Request: Sends Service Center Data
Response: Service center added
Admin Edit Service Center:

URL: /admin/editServiceCenter/{id}
Method: PUT
Request: Sends Service center Data
Response: Service center updated
Admin Delete Service Center:

URL: /admin/deleteServiceCenter/{id}
Method: DELETE
Request: Sends Appointment ID
Response: Service center deleted
Admin Get All Service Center Details:

URL: /admin/service-center
Method: GET
Response: All service center details
Admin Get Service Center Details:

URL: /admin/service-center/id?id=1
Method: GET
Response: Service Center details
Admin Get All Appointments:

URL: /admin/appointment
Method: GET
Response: All appointments
Admin Get All Appointments by ID:

URL: /admin/appointment/id?id=1
Method: GET
Response: User appointments
User Side:

User Login:

URL: /user/login
Method: POST
Request: Sends email ID and password
Response: True/False
User SignUp:

URL: /user/signup
Method: POST
Request: Sends User Model data
Response: User added
User Get Appointments:

URL: /user/appointment
Method: GET
Request: Sends Appointment ID
Response: User appointments
User Cancel Appointment:

URL: /user/cancelappointment/{id}
Method: DELETE
Request: Sends appointment ID
Response: Appointment canceled
User Edit Appointment:

URL: /user/editappointment/{id}
Method: PUT
Request: Sends appointment Data
Response: Updated appointment data
Frontend:
Customer:

Auth:

Component: Auth
Routing URL: /user/signup
Elements: Refer to provided screenshot for IDs and design.
Signup:

Component: Signup
Routing URL: /user/signup
Elements: Refer to provided screenshot for IDs and design.
Login:

Component: Login
Routing URL: /user/login
Elements: Refer to provided screenshot for IDs and design.
Home Page:

Component: Homepage
Routing URL: /user/homepage
Elements: Refer to provided screenshot for IDs and design.
Dashboard:

Component: Dashboard
Routing URL: /user/dashboard
Elements: Refer to provided screenshot for IDs and design.
Appointment:

Component: Appointment
Routing URL: /user/appointment
Elements: Refer to provided screenshot for IDs and design.
Admin:

Add Center:

Component: Addcenter
Routing URL: /admin/addServiceCenter
Elements: Refer to provided screenshot for IDs and design.
Center Profile:

Component: Centerprofile
Routing URL: /admin/service-center/id?id=1
Elements: Refer to provided screenshot for IDs and design.
Backend:
Controller Layer:

AuthController:

Methods:
isUserPresent(LoginModel data)
isAdminPresent(LoginModel data)
saveUser(UserModel user)
saveAdmin(UserModel user)
AppointmentController:

Methods:
saveAppointment(ProductModel data)
editAppointment(ProductModel data)
deleteAppointment(String productID)
getAppointment(String productID)
getAllAppointment()
UserController:

Methods:
addUser(UserModel data)
getUser(String userID)
editUser(String userID)
deleteUser(String userID)
ServiceCenterController:

Methods:
addServiceCenter(String serviceCenterID)
viewServiceCenter(String serviceCenterID)
editServiceCenter(String serviceCenterID)
deleteServiceCenter(String serviceCenterID)
viewAllServiceCenter()

This is the Loom Link to check out the functionalities : https://www.loom.com/share/6a3885e7fc104fa0a4f0fd0570abbd70?sid=497a6936-67ce-46ff-a028-6a1bd98ff858
