# Scribe  [![Build Status](https://travis-ci.org/KyleNeedham/scribe.svg?branch=master)](https://travis-ci.org/KyleNeedham/scribe)

Scribe is a seriously lightweight translator for javascript that can be intergrated into any project with ease.

---

## Usage

Scribe will not fetch translations, you should get the translations and pass them in the constructor. By default placeholders are define by prepending `:`.

```javascript
var translations = {
  buttons: {
    save: 'Save',
    udate: 'Update',
    delete: 'Delete'
  },
  validation: {
    range: 'Your range must be within :start and :end',
    contains: 'The string must contain these words :contain, :contain, :contain',
    users: {
      email: 'You email does not match.'
    }
  }
}

trans = new Translator(translations, ':');

trans.get('button.save'); // Save
trans.get('validation.range', {start: 'Monday', end: 'Friday'}); // Your range must be within Monday and Friday
trans.get('validation.contains', {contain: ['ayy lmao', 'wow', 'doge']}); // The string must contain these words ayy lmao, wow, doge
trans.get('validation.users.email'); // You email does not match.
```

If you need to check if a translations exist you can simple use the `has` method.

```javascript
if (trans.has('buttons.sync'))
{
  buttonLabel = trans.get('buttons.sync');
}
else
{
  buttonLabel = trans.get('buttons.save');
}
```

### Contributions

All contributions are welcomed. Please only edit `src/translator.coffee` and not the dist files.
