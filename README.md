# flight-ticket-booking
#Database
This is a flight ticket booking application. It maintains records of past bookings and details about flight and route it takes daily.
The flights are assumed to take same routes everyday.
The user details are maintained in user table.(mail and password)
Admin table contains login details of admin.
The route of a flight is maintained using route table which contains route of each flight.
The flight details in a separate table include its code and name.
Airport details are maintained in separate table which has code and name of airport.
Bookings made are maintained in a table which includes : name & mail of booked user, source, destination, flight code, date of journey, date on which user booked and departure time.

The application can be used to perform following activities:


a)User Cases=>

   i)Login using mail id and password
   
   ii)Sign up for new user
   
   iii)Search for flights available using source, destinatin, date and time
   
   iv)Book any available Tickets
   
   v)View list of user's booking history
   
   vi) Logout


b)Admin cases:

    i) Admin can add flight details - it require number of airports in the route
    ii)Admin can delete flight details


Development details:

The web application was built using the following web technologies :

        i) HTML
        
        ii)CSS
        
        iii)NodeJS
        
        iv)EJS
        
        v)MongoDB
