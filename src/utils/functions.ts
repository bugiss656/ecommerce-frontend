

export const convertSlugToString = (slug: string | undefined) => {
    const result = slug!.split('-').join(' ')
    return result.charAt(0).toUpperCase() + result.slice(1)
}

export const convertStringToSlug = (string: string | undefined) => {
    return string?.split(' ').join('-').toLowerCase()
}