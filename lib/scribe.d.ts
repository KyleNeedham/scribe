export interface Replacements {
    [key: string]: string | string[];
}
declare class Scribe {
    private translations;
    private placeholderIdentifier;
    constructor(translations: any, placeholderIdentifier?: string);
    has(translation: string): boolean;
    get(translation: string, replacements?: Replacements): string;
    protected getLine(translationNotation: string): string;
    protected makeReplacements(line: string, replacements: Replacements): string;
    protected makeArrayReplacements(line: string, key: string, replacements: string[]): string;
    protected getSortedReplacementKeys(replacements: Replacements): string[];
}
export default Scribe;
