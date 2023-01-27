export function weeksToUnixTime(weeks) {
    // seconds * minutes * hours * days
    return 60 * 60 * 24 * weeks;
}