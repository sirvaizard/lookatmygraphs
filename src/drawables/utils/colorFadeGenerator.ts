export default function* getColorFadeGenerator(from: string, to: string, steps: number) {
    const colorRegex = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i
    const finalColor: Array<string | number>| null = to.match(colorRegex)
    const initialColor: Array<string | number> | null = from.match(colorRegex)

    if(finalColor?.shift() && initialColor?.shift()) {
        finalColor.forEach((c, index, arr) => arr[index] = parseInt(String(c), 16))
        initialColor.forEach((c, index, arr) => arr[index] = parseInt(String(c), 16))

        const stepSizes = finalColor.map((value, index) =>
            Math.floor((Number(value) - Number(initialColor[index]))/steps))

        for(let x = 0; x < steps; x++) {
            initialColor.forEach((color, index, self) => {
                const minMax = stepSizes[index] > 0 ? Math.min : Math.max;
                self[index] = minMax(Number(color) + stepSizes[index], Number(finalColor[index]))
            })

            yield String(initialColor.reduce((acc, curr) =>
                acc += curr.toString(16).padStart(2, '0'), '#'))
        }
    }

    yield to
}
