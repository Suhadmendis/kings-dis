import moment from 'moment';

import React from 'react';

function TokenDiff(endTime) {
    let a = new Date();
    let b = new Date(endTime);
    
  
    const hours = (b-a)/3600000;

    return hours.toFixed(0); 
}

export default TokenDiff;