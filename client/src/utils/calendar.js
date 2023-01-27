export function weeksToUnixTime(weeks) {
    // seconds * minutes * hours * days
    return 60 * 60 * 24 * 7 * weeks;
}

export function unixTimeToWeeks(time) {
    // days / hours / mintues / seconds
    return time / 7 / 24 / 60 / 60;
}