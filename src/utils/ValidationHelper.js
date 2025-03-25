export function RoundDecimal(value, points = 2) {
  return (Math.round(value * Math.pow(10, points)) / Math.pow(10, points));
}

export function GetDecimal(value, nDefaultValue = 0) {
  let val = value * 1;
  if (isNaN(val) || isNaN(parseFloat(value))) {
    return nDefaultValue;
  }
  return parseFloat(value);
}

export function GetInteger(value, nDefaultValue = 0) {
  let val = value * 1;
  if (isNaN(val) || isNaN(parseInt(value))) {
    return nDefaultValue;
  }
  return parseInt(value);
}


export function TruncateTo2(value, nDefaultValue = 0) {
  return Math[value < 0 ? 'ceil' : 'floor'](value);
}

export function GetBoolean(value, bDefaultValue = false) {
  if (typeof value == "boolean") {
    return value;
  } else if (typeof value == "string") {
    if (value.trim().toLowerCase() === "true") {
      return true;
    } else if (value.trim().toLowerCase() === "false") {
      return false;
    } else {
      let num = GetInteger(value.trim(), -1);
      if (num === 1) {
        return true;
      } else if (num === 0) {
        return false;
      } else {
        return bDefaultValue;
      }
    }
  } else if (typeof value == "number") {
    if (value === 1) {
      return true;
    } else if (value === 0) {
      return false;
    } else {
      return bDefaultValue;
    }
  } else {
    return bDefaultValue;
  }
}



export function EmailValidation(text){
  // console.log(text);

  let trimed = text.trim()

  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(trimed) === false) {
    console.log("Email is Not Correct");
    return false;
  }
  else {
    console.log("Email is Correct");
    return true;
  }
}

export function ContactNumberValidation(contactNumber){
  let newText = '';
  let numbers = '0123456789';
  if(contactNumber.length <9 || contactNumber.length >11){
    return false;
  }

  for (var i=0; i < contactNumber.length; i++) {
      if(numbers.indexOf(contactNumber[i]) > -1 ) {
          newText = newText + contactNumber[i];
      }
      else {
          // your call back function
          return false;
      }
  }
  return true;
}

//convert date time to combination of string date and string time
//eg: 2011/12/15T15:10:51.000Z => 2011-12-15 15:10:51
export function convertDateTimeToStr(date){
  if(date.getMinutes()<=29 && date.getHours<=5){
    date.setDate(date.getDate()+1)
    date.setHours(date.getHours()+5);
    date.setMinutes(date.getMinutes()+30);
  }
  console.log('--'+date);
 // let date_ = date.toISOString().slice(0, 10);
 let date_ = date.getFullYear() + '-'+ (date.getMonth() + 1) + '-'+ date.getDate(); 
  let time_ = date.toLocaleTimeString('en-US', { hour12: true });

  console.log(date_);
  let strDT = date_+' '+ time_;

  return strDT;
}


//convert date time to  DD-MM-YYYY
//eg: 2011-12-15 : 15:10:51 => 15-12-2011
export function convertDateTimeToDate(d_){
  const d1 = d_.split(":");
  const dsplit = d1[0].split('-');

  var yyyy = dsplit[0];
  var mm = dsplit[1];

  if(mm<10){
    mm = '0'+mm;
  }
  var dd = dsplit[2].trim();

  if(dd<10){
    dd = '0'+dd;
  }

  var today = dd + '-' + mm + '-' + yyyy;
  return today;
}

//convert date time to  DD-MM-YYYY
//eg: 2022-09-29T11:27:09.5306142+01:00 => 29-09-2022
export function convertDateTimeTo_DDMMYYYY(d_){
  const d1 = d_.split("T");
  const dsplit = d1[0].split('-');

  var yyyy = dsplit[0];
  var mm = dsplit[1];

 
  var dd = dsplit[2].trim();

  

  var today = dd + '-' + mm + '-' + yyyy;
  return today;
}

