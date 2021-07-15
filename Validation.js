function Viewself (FirstName,LastName,Date_Of_Birth,Age,Pin_Code,Address,State,City,Email_id,Country) {
    
   

    ko.validation.rules['text'] = {
        validator: function (val, params) {
            var regex = /([A-Za-z])$/;
            if (regex.test(val)) {
                return true;
            }
        },
        message: 'Only Alphabets Allowed'
    };

    
    ko.validation.rules['Age'] = {
        validator: function (val, params) {
            var regex = /([0-9])$/;
            if (regex.test(val)) {
                if(Number(val) > 0)
                    return true;
            }
        },
        message: 'Age Must be Number'
    };

    ko.validation.rules['Pin_Code'] = {
        validator: function (val, params) {
            var regex = /([0-9]{6})$/;
            if (regex.test(val)) {
                   if(val.length == 6)
                        return true;
            }
        },
        message: 'Enter Valid Pin Code'
    };

    
    ko.validation.registerExtenders();

    var self = this;
   
    self.FirstName = ko.observable(FirstName).extend({required : true , text: true});
    self.LastName = ko.observable(LastName).extend({required : true , text: true });
    self.Date_Of_Birth = ko.observable(Date_Of_Birth).extend({ required : true});
    self.Age =  ko.observable(Age).extend({required : true , Age:true});
    self.Pin_Code = ko.observable(Pin_Code).extend({required : true,Pin_Code:true});

    self.Address = ko.observable(Address).extend({required:true});

    self.State = ko.observable(State).extend({required : true , text:true});
    self.City = ko.observable(City).extend({required : true , text:true});
    self.Email_id = ko.observable(Email_id).extend({required : true , email:true});
    self.Country = ko.observable(Country).extend({ required : true , text: true });


    self.EmployeeLists = ko.observableArray([]);
    

 
   function getEmployeeLists() {
    var Employee = JSON.parse(localStorage.getItem("EmployeeList"));
        self.EmployeeLists(Employee);
    }
   
   
	self.errors = ko.validation.group(this, { deep: true, observable: false });
    
    self.addNewEmployee = function addNewEmployee() {
     
		if (self.errors().length === 0) {
            var Employee = JSON.parse(localStorage.getItem("EmployeeList"));
            if (Employee === null || Employee === undefined) {
                Employee = []
            }
    
			
            
            var EmployeeObject = {
                FirstName: self.FirstName(),
                LastName: self.LastName(),
                Date_Of_Birth: self.Date_Of_Birth(),
                
                Age: self.Age(),
                Pin_Code :self.Pin_Code(), 
                Address:self.Address(),
                State: self.State(),
                City : self.City(),
                Email_id: self.Email_id(),
                Country:self.Country()
            };

            Employee.push(EmployeeObject)
        
            localStorage.setItem("EmployeeList", JSON.stringify(Employee))
         
            alert('Employee Added Successfully !');
            
            window.location.reload(true);
            
		}
		else {
			alert('Please check your submission.');
		}
    }

    getEmployeeLists();
};

ko.applyBindings(new Viewself());