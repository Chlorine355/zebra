export const getDateTimeString = (date: Date) => {
    return `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}`
}