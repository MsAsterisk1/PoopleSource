const UTC_GAME_CHANGE_HOUR = 8 // 3am EST

export function getTimeToNextGame() {
    const nextGame = new Date(Date.now())
    nextGame.setUTCHours(UTC_GAME_CHANGE_HOUR, 0, 0, 0)
    if (nextGame.getTime() < Date.now()) {
        nextGame.setDate(nextGame.getDate() + 1)
    }

    return nextGame.getTime() - Date.now()
}

export function getFormattedTimeToNextGame() {
    const time = getTimeToNextGame()
    const hours = Math.floor(time / 3600000)
    const minutes = Math.floor(time / 60000) % 60
    const seconds = Math.floor(time / 1000) % 60

    return (
        `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    )
}

export function isToday(time: number | undefined) {
    if (time === undefined) {
        return false
    }

    const now = Date.now()

    const startOfToday = new Date(now)
    startOfToday.setUTCHours(UTC_GAME_CHANGE_HOUR, 0, 0, 0)
    if (startOfToday.getTime() > now) {
        startOfToday.setUTCDate(startOfToday.getUTCDate() - 1)
    }
    const startOfGivenDay = new Date(time)
    startOfGivenDay.setUTCHours(UTC_GAME_CHANGE_HOUR, 0, 0, 0)
    if (startOfGivenDay.getTime() > time) {
        startOfGivenDay.setUTCDate(startOfGivenDay.getUTCDate() - 1)
    }

    return startOfToday.getTime() === startOfGivenDay.getTime()
}

export function isYesterday(time: number | undefined) {
    if (time === undefined) {
        return false
    }

    const now = Date.now()

    const startOfYesterday = new Date(now)
    startOfYesterday.setUTCHours(UTC_GAME_CHANGE_HOUR, 0, 0, 0)
    startOfYesterday.setUTCDate(startOfYesterday.getUTCDate() - 1)
    if (startOfYesterday.getTime() > now) {
        startOfYesterday.setUTCDate(startOfYesterday.getUTCDate() - 1)
    }
    const startOfGivenDay = new Date(time)
    startOfGivenDay.setUTCHours(UTC_GAME_CHANGE_HOUR, 0, 0, 0)
    if (startOfGivenDay.getTime() > time) {
        startOfGivenDay.setUTCDate(startOfGivenDay.getUTCDate() - 1)
    }

    return startOfYesterday.getTime() === startOfGivenDay.getTime()
}

export function daysSinceEpoch(time?: number) {
    const epoch = new Date()
    epoch.setUTCFullYear(2025, 7, 15)
    epoch.setUTCHours(UTC_GAME_CHANGE_HOUR, 0, 0, 0)

    let now = time ?? Date.now()
    let numDays = 0
    // can't think of another way to count days that matches the robustness of just. counting them one by one
    while (now > epoch.getTime()) {
        now = new Date(now).setDate(new Date(now).getDate() - 1)
        numDays += 1
    }

    return numDays
}