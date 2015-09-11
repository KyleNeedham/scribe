# Scribe  [![Build Status](https://travis-ci.org/KyleNeedham/scribe.svg?branch=master)](https://travis-ci.org/KyleNeedham/scribe)

Scribe is a seriously lightweight translator for JavaScript that can be integrated into any project.

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
    contains: 'The string must contain these phrases: :contain, :contain, :contain',
    users: {
      email: 'Your email does not match.'
    }
  }
}

scribe = new Scribe(translations, ':');

scribe.get('button.save'); // Save
scribe.get('validation.range', {start: 'Monday', end: 'Friday'}); // Your range must be within Monday and Friday
scribe.get('validation.contains', {contain: ['ayy lmao', 'such wow', 'doge']}); // The string must contain these phrases: ayy lmao, such wow, doge
scribe.get('validation.users.email'); // Your email does not match.
```

If you need to check if a translations exist you can simply use the `has` method.

```javascript
if (scribe.has('buttons.sync'))
{
  buttonLabel = scribe.get('buttons.sync');
}
else
{
  buttonLabel = scribe.get('buttons.save');
}
```

### Contributions

All contributions are welcomed. Please only edit `src/scribe.coffee` and add tests if necessary.
