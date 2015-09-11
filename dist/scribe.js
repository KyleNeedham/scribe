(function() {
  (function(root, factory) {
    if (typeof define === 'function' && define.amd) {
      return define(['underscore'], function(_) {
        return factory(root, _);
      });
    } else {
      return root.Scribe = factory(root, root._);
    }
  })(this, function(root, _) {
    var Scribe;
    return Scribe = (function() {

      /**
       * @param {Object} translations
       * @param {string} placeholder The string that specifies a replacement
       * @constructor
       */
      function Scribe(translations, placeholder1) {
        this.translations = translations;
        this.placeholder = placeholder1 != null ? placeholder1 : ':';
      }


      /**
       * Check to see if the translation exists.
       * @see @get
       * @return {boolean}
       */

      Scribe.prototype.has = function(translation) {
        return this.get(translation) !== translation;
      };


      /**
       * Get a translation by key.
       * @param  {string} translation The key where the translation is located
       * @param  {Object} replacements
       * @return {string}
       */

      Scribe.prototype.get = function(translation, replacements) {
        var line;
        if (replacements == null) {
          replacements = {};
        }
        return line = this.makeReplacements(this.getLine(translation), replacements) || translation;
      };


      /**
       * Get the line from the translations.
       * @return {string} The line from @translations or the translation location
       */

      Scribe.prototype.getLine = function(translation) {
        return _.reduce(translation.split('.'), function(segment, property) {
          return segment != null ? segment[property] : void 0;
        }, this.translations);
      };


      /**
       * Make place-holder replacements.
       * @param  {string} line
       * @param  {Object} replacements
       * @return {Object}
       */

      Scribe.prototype.makeReplacements = function(line, replacements) {
        if (!line) {
          return;
        }
        replacements = this.sortReplacements(replacements);
        _.each(replacements, function(value, key) {
          if (_.isArray(value)) {
            return line = _.reduce(value, (function(_this) {
              return function(line, val) {
                return line.replace("" + _this.placeholder + key, val);
              };
            })(this), line);
          } else {
            return line = line.replace(new RegExp("" + this.placeholder + key, 'g'), value);
          }
        }, this);
        return line;
      };


      /**
       * Sort the replacements by length first, so that we don't replace a partial key first. For example
       * if we did not do this the placeholder ":foobar" would conflict with the placeholder ":foo"
       * @param  {Object} replacements
       * @return {Object}
       */

      Scribe.prototype.sortReplacements = function(replacements) {
        var sorted;
        sorted = {};
        _.chain(replacements).keys().sortBy(function(replacement) {
          return replacement.length * -1;
        }).each(function(placeholder) {
          return sorted[placeholder] = replacements[placeholder];
        });
        return sorted;
      };

      return Scribe;

    })();
  });

}).call(this);
