export interface Replacements {
  [key: string]: string | string[]
}

class Scribe {
  /**
    * @param translations Container for all translation messages.
    * @param placeholderIdentifier Special identifier to idicate the block of text
    * to right is a placeholder.
    */
  constructor(private translations, private placeholderIdentifier: string = ':') {}

  /**
    * Check to see if the translation exists.
    * @param translation The dot notation location of the require translation.
    */
  has(translation: string): boolean {
    return this.get(translation) === translation;
  }

  /**
    * Get a translation by key.
    * @param translation The dot notation location of the required translation.
    * @param replacements If replacements are passed we will get the translation and then
    * try to replace any placeholders with the value from the corresponding key on the replacements.
    */
  get(translation: string, replacements?: Replacements): string {
    const line = this.getLine(translation);

    if(!line) {
      return translation;
    }

    if(!replacements) {
      return line;
    }

    return this.makeReplacements(line, replacements);
  }

  /**
    * Gets the translation line, using the translationNotation passed.
    * @param translationNotation The dot notation location of the required translation.
    */
  protected getLine(translationNotation: string): string {
    const translationKeyParts: string[] = translationNotation.split('.');

    return translationKeyParts.reduce((translationSegment, key) => {
      if(translationSegment) {
        return translationSegment[key];
      }
    }, this.translations);
  }

  /**
    * Replace all placeholder
    * @param line A string containing placeholders to replace.
    * @param replacements An object with keys that correspond to the placeholders
    * in the line.
    */
  protected makeReplacements(line: string, replacements: Replacements): string {
    const sortedReplacementKeys = this.getSortedReplacementKeys(replacements);

    sortedReplacementKeys.forEach((key) => {
      const replacementValue = replacements[key];
      // If it is an array then we will go over the line with each item in the array
      // replacing each occurence of the placeholder with the current array item.
      if(Array.isArray(replacementValue)) {
        line = this.makeArrayReplacements(line, key, replacementValue);
      } else {
        line = line.replace(new RegExp(`${this.placeholderIdentifier}${key}`, "g"), replacementValue);
      }
    });

    return line;
  }

  /**
    * @param line A string containing placeholders to replace.
    * @param key The placeholder.
    * @param replacements An array of string values.
    */
  protected makeArrayReplacements(line: string, key: string, replacements: string[]) {
    return replacements.reduce((line: string, val: string) => {
      return line.replace(new RegExp(`${this.placeholderIdentifier}${key}`), val);
    }, line);
  }

  /**
    * Sort the replacements by length first, so that we don't replace part on another placeholder first. For example
    * if we did not do this the placeholder ":foo" would also replace the placeholder ":foobar"
    * @param replacements The end of the specified portion of the array.
    */
  protected getSortedReplacementKeys(replacements: Replacements): string[] {
    return Object.keys(replacements).sort((a, b) => {
    	return b.length - a.length;
  	});
  }
}

export default Scribe;
