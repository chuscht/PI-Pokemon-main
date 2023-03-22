export const sortNameAsc = (pokemons) => {
    return pokemons.sort((a, b) => (a.name > b.name ? 1 : -1))
}

export const sortNameDesc = (pokemons) => {
    return pokemons.sort((a, b) => (a.name > b.name ? -1 : 1))
}

export const sortAttackAsc = (pokemons) => {
    return pokemons.sort((a, b) => (a.attack > b.attack ? 1 : -1))
}

export const sortAttackDesc = (pokemons) => {
    return pokemons.sort((a, b) => (a.attack > b.attack ? -1 : 1))
}

export const sortNameAndAttackAsc = (pokemons) => {
    return pokemons.sort((a,b) => {
        let a1 = a.attack
        let a2 = b.attack

        let n1 = a.name
        let n2 = b.name

        if(a1 < a2) return -1
        if(a1 > a2) return 1

        if (n1 < n2) return -1
        if (n2 < n1) return 1
        return 0
    })
}

export const sortNameAndAttackDesc = (pokemons) => {
    return pokemons.sort((a,b) => {
        let a1 = a.attack
        let a2 = b.attack

        let n1 = a.name
        let n2 = b.name

        if(a1 < a2) return 1
        if(a1 > a2) return -1

        if (n1 < n2) return 1
        if (n2 < n1) return -1
        return 0
    })
}

export const sortNameAscAndAttackDesc = (pokemons) => {
    return pokemons.sort((a,b) => {
        let a1 = a.attack
        let a2 = b.attack

        let n1 = a.name
        let n2 = b.name

        if(a1 < a2) return -1
        if(a1 > a2) return 1

        if (n1 < n2) return 1
        if (n2 < n1) return -1
        return 0
    })
}

export const sortNameDescAndAttackAsc = (pokemons) => {
    return pokemons.sort((a,b) => {
        let a1 = a.attack
        let a2 = b.attack

        let n1 = a.name
        let n2 = b.name

        if(a1 < a2) return 1
        if(a1 > a2) return -1

        if (n1 < n2) return -1
        if (n2 < n1) return 1
        return 0
    })
}