(function() {
  (function(root, factory) {
    if (typeof define === 'function' && define.amd) {
      return define(['underscore'], function(_) {
        return factory(root, _);
      });
    } else {
      return root.Translator = factory(root, root._);
    }
  })(this, function(root, _) {
    var Translator;
    return Translator = (function() {

      /**
       * @param {Object} translations
       * @param {string} placeholder The string that specifies a replacement
       * @constructor
       */
      function Translator(translations, placeholder1) {
        this.translations = translations;
        this.placeholder = placeholder1 != null ? placeholder1 : ':';
      }


      /**
       * Check to see if the translation exists.
       * @see @get
       * @return {boolean}
       */

      Translator.prototype.has = function(translation) {
        return this.get(translation) !== translation;
      };


      /**
       * Get a translation by key.
       * @param  {string} translation The key where the translation is located
       * @param  {Object} replace 
       * @return {string}
       */

      Translator.prototype.get = function(translation, replace) {
        var line;
        if (replace == null) {
          replace = {};
        }
        return line = this.makeReplacements(this.getLine(translation), replace) || translation;
      };


      /**
       * Get the line from the translations.
       * @return {string} The line from @translations or the translation location
       */

      Translator.prototype.getLine = function(translation) {
        return _.reduce(translation.split('.'), function(segment, property) {
          return segment != null ? segment[property] : void 0;
        }, this.translations);
      };


      /**
       * Make place-holder replacements.
       * @param  {string} line
       * @param  {Object} replace
       * @return {Object}
       */

      Translator.prototype.makeReplacements = function(line, replace) {
        if (!line) {
          return;
        }
        replace = this.sortReplacements(replace);
        _.each(replace, function(value, key) {
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
       * @param  {Object} replace
       * @return {Object}
       */

      Translator.prototype.sortReplacements = function(replace) {
        var sorted;
        sorted = {};
        _.chain(replace).keys().sortBy(function(replacement) {
          return replacement.length * -1;
        }).each(function(placeholder) {
          return sorted[placeholder] = replace[placeholder];
        });
        return sorted;
      };

      return Translator;

    })();
  });

}).call(this);
