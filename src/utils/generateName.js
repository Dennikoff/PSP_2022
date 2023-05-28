export const generateName = (link) => {
    let newName = link
    if (newName.indexOf('//') !== -1) {
        newName = newName.slice(newName.indexOf('/') + 2, newName.lastIndexOf('.'))
    } else {
        newName = newName.slice(0, newName.lastIndexOf('.'))
    }
    return newName.slice(0, 25)
}