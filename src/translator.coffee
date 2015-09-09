((root, factory) ->
  if typeof define is 'function' and define.amd
    define ['underscore'], (_) ->
      factory root, _
  else
    root.Scribe = factory root, root._
) @, (root, _) ->

  class Scribe

    ###*
     * @param {Object} translations
     * @param {string} placeholder The string that specifies a replacement
     * @constructor
    ###
    constructor: (@translations, @placeholder = ':') ->

    ###*
     * Check to see if the translation exists.
     * @see @get
     * @return {boolean}
    ###
    has: (translation) ->
      @get(translation) isnt translation

    ###*
     * Get a translation by key.
     * @param  {string} translation The key where the translation is located
     * @param  {Object} replace
     * @return {string}
    ###
    get: (translation, replace = {}) ->
      line = @makeReplacements(@getLine(translation), replace) or translation

    ###*
     * Get the line from the translations.
     * @return {string} The line from @translations or the translation location
    ###
    getLine: (translation) ->
      _.reduce translation.split('.'), (segment, property) ->
        segment?[property]
      , @translations

    ###*
     * Make place-holder replacements.
     * @param  {string} line
     * @param  {Object} replace
     * @return {Object}
    ###
    makeReplacements: (line, replace) ->
      return unless line

      replace = @sortReplacements replace

      _.each replace, (value, key) ->
        # If it is an array then we will go over the line with each item in the array
        # replacing each occurence of the placeholder with the current array item.
        if _.isArray(value)
          line = _.reduce value, (line, val) =>
            line.replace "#{@placeholder}#{key}", val
          , line
        else
          line = line.replace new RegExp("#{@placeholder}#{key}", 'g'), value
      , @

      line

    ###*
     * Sort the replacements by length first, so that we don't replace a partial key first. For example
     * if we did not do this the placeholder ":foobar" would conflict with the placeholder ":foo"
     * @param  {Object} replace
     * @return {Object}
    ###
    sortReplacements: (replace) ->
      sorted = {}

      _.chain replace
        .keys()
        .sortBy (replacement) ->
          replacement.length * -1
        .each (placeholder) ->
          sorted[placeholder] = replace[placeholder]

      sorted
