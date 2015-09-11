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
     * @param  {Object} replacements
     * @return {string}
    ###
    get: (translation, replacements = {}) ->
      line = @makeReplacements(@getLine(translation), replacements) or translation

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
     * @param  {Object} replacements
     * @return {Object}
    ###
    makeReplacements: (line, replacements) ->
      return unless line

      replacements = @sortReplacements replacements

      _.each replacements, (value, key) ->
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
     * @param  {Object} replacements
     * @return {Object}
    ###
    sortReplacements: (replacements) ->
      sorted = {}

      _.chain replacements
        .keys()
        .sortBy (replacement) ->
          replacement.length * -1
        .each (placeholder) ->
          sorted[placeholder] = replacements[placeholder]

      sorted
