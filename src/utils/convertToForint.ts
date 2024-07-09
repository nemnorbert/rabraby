export default (input: number | undefined) => {
    if (!input || input < 0 || input > 30000) {
        return "-" 
    }

    return new Intl.NumberFormat('hu-HU', {
        style: 'currency',
        currency: 'HUF',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(input);
}