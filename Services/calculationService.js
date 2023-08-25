

export const calculateValue = () => {
    return 1;
};

const evaluateItem = (item, target) => {
    if (item.value === target) return 'hit';
    if (item.value > target) return 'high';
    if (item.value < target) return 'low';
}

export const binarySearch = (items, targetValue) => {

    if (items[0].value > targetValue || items[items.length - 1].value < targetValue) {
        return {
            itemPresent: false,
            foundItem: null,
        }
    }

    if (evaluateItem(items[items.length - 1], targetValue) === 'hit') {
        return {
            itemPresent: true,
            foundItem: items[items.length -1],
        }
    }

    let lowerIndex = 0;
    let upperIndex = items.length - 1;
    let foundItem = null;
    let itemPresent = true;
    let lastEvalIndex = null;

    while (!foundItem && itemPresent) {
        if (upperIndex === lowerIndex) itemPresent = false;

        let evalIndex = Math.floor((lowerIndex + upperIndex) / 2);
        if(evalIndex === lastEvalIndex) itemPresent = false;
        lastEvalIndex = evalIndex;
        const evalResult = evaluateItem(items[evalIndex], targetValue);
        switch (evalResult) {
            case 'hit':
                foundItem = items[evalIndex];
                itemPresent = true;
                break;
            case 'high':
                upperIndex = evalIndex;
                break;
            case 'low':
                lowerIndex = evalIndex;
                break;
        }
    }

    return {
        foundItem,
        itemPresent
    }

}