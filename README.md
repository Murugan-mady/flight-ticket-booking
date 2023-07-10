# Flight-ticket-booking
# Database
This is a flight ticket booking application. It maintains records of past bookings and details about flight and route it takes daily.
The flights are assumed to take same routes everyday.
The user details are maintained in user table.(mail and password)
Admin table contains login details of admin.
The route of a flight is maintained using route table which contains route of each flight.
The flight details in a separate table include its code and name.
Airport details are maintained in separate table which has code and name of airport.
Bookings made are maintained in a table which includes : name & mail of booked user, source, destination, flight code, date of journey, date on which user booked and departure time.

# Features
The application can be used to perform following activities:


## a)User Cases:

   i)Login using mail id and password
   
   ii)Sign up for new user
   
   iii)Search for flights available using source, destinatin, date and time
   
   iv)Book any available Tickets
   
   v)View list of user's booking history
   
   vi) Logout


## b)Admin cases:

    i) Admin can add flight details - it require code of flight, name of flight, number of airports in the route(from initial to final point), departure time and airport name(it should be in the format of <CODE>-<AIRPORT>). 
    ii)Admin can delete flight details by using flight code.
    iii) Admin can view bookings of a flight between 2 dates using flight code, from date and to date
    iv) Logout


# Development details:

The web application was built using the following web technologies :

        i) HTML
        
        ii)CSS
        
        iii)Javascript
        
        iv)NodeJS
        
        v)EJS
        
        vi)MongoDB (queries handled by mongoose js)

# Sample credentials:
    a) User: mail->  muruganzataak@gmail.com , password-> 1234
    b) Admin: mail-> muruganzataak@gmail.com , password-> adminonly

# Hosted Live link:
https://express-airlines.onrender.com
