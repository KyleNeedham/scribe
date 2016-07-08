(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Scribe = (function () {
        function Scribe(translations, placeholderIdentifier) {
            if (placeholderIdentifier === void 0) { placeholderIdentifier = ':'; }
            this.translations = translations;
            this.placeholderIdentifier = placeholderIdentifier;
        }
        Scribe.prototype.has = function (translation) {
            return this.get(translation) === translation;
        };
        Scribe.prototype.get = function (translation, replacements) {
            var line = this.getLine(translation);
            if (!line) {
                return translation;
            }
            if (!replacements) {
                return line;
            }
            return this.makeReplacements(line, replacements);
        };
        Scribe.prototype.choice = function (translation, count, replacements) {
            var lines = this.get(translation, replacements).split('|');
            if (lines[0] === translation) {
                return translation;
            }
            if (lines.length === 1 || count <= 1) {
                return lines[0];
            }
            return lines[1];
        };
        Scribe.prototype.getLine = function (translationNotation) {
            var translationKeyParts = translationNotation.split('.');
            return translationKeyParts.reduce(function (translationSegment, key) {
                if (translationSegment) {
                    return translationSegment[key];
                }
            }, this.translations);
        };
        Scribe.prototype.makeReplacements = function (line, replacements) {
            var _this = this;
            var sortedReplacementKeys = this.getSortedReplacementKeys(replacements);
            sortedReplacementKeys.forEach(function (key) {
                var replacementValue = replacements[key];
                if (Array.isArray(replacementValue)) {
                    line = _this.makeArrayReplacements(line, key, replacementValue);
                }
                else {
                    line = line.replace(new RegExp("" + _this.placeholderIdentifier + key, "g"), replacementValue);
                }
            });
            return line;
        };
        Scribe.prototype.makeArrayReplacements = function (line, key, replacements) {
            var _this = this;
            return replacements.reduce(function (line, val) {
                return line.replace(new RegExp("" + _this.placeholderIdentifier + key), val);
            }, line);
        };
        Scribe.prototype.getSortedReplacementKeys = function (replacements) {
            return Object.keys(replacements).sort(function (a, b) {
                return b.length - a.length;
            });
        };
        return Scribe;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Scribe;
});
