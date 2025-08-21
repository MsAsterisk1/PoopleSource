export function getTimeToMidnight() {
    const midnight = new Date(Date.now())
    midnight.setHours(0, 0, 0, 0)
    midnight.setDate(midnight.getDate() + 1)

    return midnight.getTime() - Date.now()
}

export function getFormattedTimeToMidnight() {
    const time = getTimeToMidnight()
    const hours = Math.floor(time / 3600000)
    const minutes = Math.floor(time / 60000) % 60
    const seconds = Math.floor(time / 1000) % 60

    return (
        `
        ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}
        `
    )
}

export function isToday(time: number | undefined) {
    if (time === undefined) {
        return false
    }

    const now = Date.now()

    const startOfToday = new Date(now).setHours(0, 0, 0, 0)
    const startOfGivenDay = new Date(time).setHours(0, 0, 0, 0)

    return startOfToday === startOfGivenDay
}

export function isYesterday(time: number | undefined) {
    if (time === undefined) {
        return false
    }

    const now = Date.now()

    const startOfToday = new Date(now).setHours(0, 0, 0, 0)
    const startOfGivenDay = new Date(time).setHours(0, 0, 0, 0)

    return startOfGivenDay < startOfToday - 12 * 3600 * 1000 && startOfGivenDay > startOfGivenDay - 36 * 3600 * 1000
}

export function midnightsSinceEpoch() {
    const epoch = new Date()
    epoch.setUTCFullYear(2025, 7, 15)
    // there are always two discontinuities, where two adjacent time zones have different poople words
    // one is at midnight (this is good, since we want a new word at midnight)
    // the other is at an arbitrary time zone division given by the epoch (this one is undesirable but necessary)
    // setting the epoch to noon UTC puts the second discontinuity between UTC+12 and UTC-12
    // which is probably the best place for it
    // not sure if this plays nice with time zones outside the -12 to +12 range
    // not to mention DST
    epoch.setUTCHours(12, 0, 0, 0)

    let startOfDay = new Date(Date.now()).setHours(0, 0, 0, 0)
    let numDays = 0
    // can't think of another way to count midnights that matches the robustness of just. counting them one by one
    while (startOfDay > epoch.getTime()) {
        startOfDay = new Date(startOfDay).setDate(new Date(startOfDay).getDate() - 1)
        numDays += 1
    }

    return numDays
}