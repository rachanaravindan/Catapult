# VacServ-service-provider

Built an application that allows customers to book an appointment for servicing their vacuum cleaner.

# Features
* Display the list of service centers and their availability.
* Enable selection of a specific service center based on availability and enter vacuum cleaner details.
* Allow users to describe the nature of the problem.
* Generate the bill automatically based on the service provided.
* Ensure appointment date cannot be less than the current date.
* Display service center availability for the next 5 days.
* Implement search functionality based on location (place, district) and sort service centers from closest to farthest.
* Provide provision for generating reports.
* Maintain a database for customer information, Admin information, Appointment information, and Bill information.
* Allow customers to provide reviews.
  
**Additional Features**
* Filters such as Low to High or based on customer's price range, specific Company, etc.
  
# Front End
React 16+
Material Design

# Server Side Database:
Spring Boot/MySQL

# Project Tasks
### API Endpoints:

| Admin/User | URL | Method | Request | Response |
| --- | --- | --- | --- | ---|
| Admin Login | /admin/login | POST | Sends email ID and password | True/False |
| Admin SignUp | /admin/signup | POST | Sends Admin Model data | Admin added |
| Admin Add Service Center | /admin/addServiceCenter | POST | Sends Service Center Data | Service center added |
| Admin Edit Service Center | /admin/editServiceCenter/{id} | PUT | Sends Service center Data | Service center updated |
| Admin Delete Service Center | /admin/deleteServiceCenter/{id} | DELETE | Sends Appointment ID | Service center deleted |
| Admin Get All Service Center Details | /admin/service-center | GET | All service center details |
| Admin Get Service Center Details | /admin/service-center/id?id=1 | GET | Service Center details |
| Admin Get All Appointments | /admin/appointment | GET | All appointments
| Admin Get All Appointments by ID | /admin/appointment/id?id=1 | GET | User appointments |
| User Login | /user/login | POST | Sends email ID and password | True/False |
| User SignUp | /user/signup | POST | Sends User Model data | User added | 
| User Get Appointments | /user/appointment | GET | Sends Appointment ID | User appointments |
| User Cancel Appointment | /user/cancelappointment/{id} | DELETE | Sends appointment ID | Appointment canceled |
| User Edit Appointment | /user/editappointment/{id} | PUT | Sends appointment Data | Updated appointment data |

# Frontend Routing Elements
| Admin/User | Component | Routing URL | 
| --- | --- | --- |
| User | Auth | /user/signup |
| User | Signup | /user/signup |
| user | Login | /user/login |
| User | Homepage | /user/homepage |
| User | Dashboard | /user/dashboard |
| User | Appointment | /user/appointment |
| Admin | Add Center | /admin/addServiceCenter |
| Admin | Center Profile | /admin/service-center/id?id= |

# Backend (Controller Layer)
### AuthController:
#### Methods:
* isUserPresent(LoginModel data)
* isAdminPresent(LoginModel data)
* saveUser(UserModel user)
* saveAdmin(UserModel user)

### AppointmentController:
#### Methods:
* saveAppointment(ProductModel data)
* editAppointment(ProductModel data)
* deleteAppointment(String productID)
* getAppointment(String productID)
* getAllAppointment()

### UserController:
#### Methods:
* addUser(UserModel data)
* getUser(String userID)
* editUser(String userID)
* deleteUser(String userID)

### ServiceCenterController:
#### Methods:
* addServiceCenter(String serviceCenterID)
* viewServiceCenter(String serviceCenterID)
* editServiceCenter(String serviceCenterID)
* deleteServiceCenter(String serviceCenterID)
* viewAllServiceCenter()

This is the Loom Link to check out the functionalities : https://www.loom.com/share/6a3885e7fc104fa0a4f0fd0570abbd70?sid=497a6936-67ce-46ff-a028-6a1bd98ff858
