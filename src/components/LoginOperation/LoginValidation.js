
function LoginValidation(email, password) {

    // Error code - 00 - User login with null username & password

    // Error code - 01 - User login with null username & not null password

    // Error code - 02 - User login with null password & not null username

    if (email == '' && password == '') {
        return { code: '00', message: 'Please enter valid username and password'};
    }
    
    if (email == '') {
        return { code: '01', message: 'Please enter a valid username'};
    }

    if (password == '') {
        return { code: '02', message: 'Please enter a valid password'};
    }


    // Error code - 08 - User login with not null username & password

    // Error code - 09 - Other

    if (email != '' && password != '') {
        return { code: '08', message: 'not null username & password'};
    }
    
    return { code: '09', message: 'Other'};
  
}

export default LoginValidation;





