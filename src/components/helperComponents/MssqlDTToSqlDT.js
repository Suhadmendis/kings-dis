import moment from 'moment';

import React from 'react';

function MssqlDTToSqlDT(msDateTime) {
    const date = new Date(msDateTime);
        // Format the date into 'YYYY-MM-DD HH:mm:ss' (SQL format)
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

}

export default MssqlDTToSqlDT;