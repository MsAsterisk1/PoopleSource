export function getGuesses(orElse?: string[]): string[] {
    return JSON.parse(localStorage.getItem("guesses") ?? (JSON.stringify(orElse ?? [])));
}

export function setGuesses(guesses: string[]) {
    localStorage.setItem("guesses", JSON.stringify(guesses));
}


export function getGames(): { [excessMoves: string]: number; } {
    return JSON.parse(localStorage.getItem("games") ?? "{}");
}

export function winGame(excessGuesses: number) {
    const games = getGames()
    if (games[excessGuesses] !== undefined) {
        games[excessGuesses]++
    } else {
        games[excessGuesses] = 1
    }
    localStorage.setItem("games", JSON.stringify(games));
    localStorage.setItem("dateLastWon", JSON.stringify(Date.now()));
    const newStreak = getStreak() + 1
    setStreak(newStreak)

    if (newStreak > getBestStreak()) {
        localStorage.setItem("bestStreak", JSON.stringify(newStreak));
    }

    setTimeLastWon()
}

export function setStreak(streak: number) {
    localStorage.setItem("streak", JSON.stringify(streak));
}

export function getStreak(): number {
    return JSON.parse(localStorage.getItem("streak") ?? "0")
}

export function getBestStreak(): number {
    return JSON.parse(localStorage.getItem("bestStreak") ?? "0")
}


export function getTimeLastPlayed() {
    const lastPlayed = localStorage.getItem("dateLastPlayed");
    if (lastPlayed !== null) {
        return parseInt(lastPlayed)
    } else {
        return undefined;
    }
}

export function setTimeLastPlayed(time?: number) {
    localStorage.setItem("dateLastPlayed", JSON.stringify(time ?? Date.now()));
}

export function getTimeLastWon() {
    const lastWon = localStorage.getItem("dateLastWon");
    if (lastWon !== null) {
        return parseInt(lastWon)
    } else {
        return undefined;
    }
}

export function setTimeLastWon(time?: number) {
    localStorage.setItem("dateLastWon", JSON.stringify(time ?? Date.now()));
}