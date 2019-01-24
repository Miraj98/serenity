export const getSearchResults = (input, _coursePool) => {
    if (input !== '') {
        let filteredArr = []
        let numberOfFilteredItems = 0
        for (let i = 0; i < _coursePool.length; i++) {
            let coursePool = [..._coursePool]
            if (coursePool[i].courseTitle.toUpperCase().includes(input.toUpperCase()) || coursePool[i].courseNo.toUpperCase().includes(input.toUpperCase())) {
                filteredArr.push(coursePool[i])
                numberOfFilteredItems = numberOfFilteredItems + 1
                if(numberOfFilteredItems > 18) {
                    break
                }
            }
        }
        return filteredArr
    }
    else return []
}