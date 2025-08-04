class MissingPropError extends Error {
    constructor(componentName: string, prop: string) {
        super(`❌ ${componentName}: Missing required prop '${prop}'`);
        this.name = "MissingPropError";
    }
}

export default MissingPropError