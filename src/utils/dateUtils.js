export function parseDate(dateString) {
    let year;
    let month;
    let day;
    const tokens = dateString.split(/[-/\\. ]/g);
    if (tokens.length < 3) {
        return null;
    }

    if (tokens[0].length === 4) {
        year = parseInt(tokens[0], 10);
        month = parseInt(tokens[1], 10);
        day = parseInt(tokens[2], 10);
    } else {
        year = parseInt(tokens[2], 10);
        month = parseInt(tokens[1], 10);
        day = parseInt(tokens[0], 10);
    }

    return Date.parse(`${year}-${month}-${day}`);
}

export function formatDate(timeStamp) {
    return new Date(timeStamp).toLocaleDateString("bg-BG");
}