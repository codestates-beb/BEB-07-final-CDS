export function weeksToUnixTime(weeks) {
    // seconds * minutes * hours * days
    return 60 * 60 * 24 * 7 * weeks;
}

export function unixTimeToWeeks(time) {
    // days / hours / mintues / seconds
    return time / 7 / 24 / 60 / 60;
}

// Calculate Time Remaining for paying premium
export function calculateRemainingPeriod(currentTime, nextTime){
    const diffSeconds = nextTime - currentTime;

    if (diffSeconds <= 0) return `overdue`;
    else{
        if (parseInt(diffSeconds / 60) === 0) 
            return diffSeconds === 1 ? `1 second`:`${diffSeconds} seconds`;
        const diffMinutes = parseInt( diffSeconds / 60 );

        if (parseInt(diffMinutes / 60) === 0) return `${diffMinutes} minutes`;
        const diffHours = parseInt( diffMinutes / 60 );

        if (parseInt(diffHours / 24) === 0 ) return `${diffHours} hours`;
        const diffDays = parseInt( diffHours / 24 );

        if (parseInt(diffDays / 7) === 0) return `${diffDays} days`;
        const diffWeeks = parseInt( diffDays / 7 );

        return `${diffWeeks} weeks`;
    }
}

// Calculate Remaining Period by only Interval
export function calculatePeriodByInterval(interval){

    if (interval <= 0) return `overdue`;
    else{
        if (parseInt(interval / 60) === 0) 
            return interval === 1 ? `1 second`:`${interval} seconds`;
        const diffMinutes = parseInt( interval / 60 );

        if (parseInt(diffMinutes / 60) === 0) return `${diffMinutes} minutes`;
        const diffHours = parseInt( diffMinutes / 60 );

        if (parseInt(diffHours / 24) === 0 ) return `${diffHours} hours`;
        const diffDays = parseInt( diffHours / 24 );

        if (parseInt(diffDays / 7) === 0) return `${diffDays} days`;
        const diffWeeks = parseInt( diffDays / 7 );

        return `${diffWeeks} weeks`;
    }
}

export function parseUnixtimeToDate(unixtimeOnDB){
    const currentTime = new Date(unixtimeOnDB * 1000);

    return currentTime.toLocaleString('en-us');
}