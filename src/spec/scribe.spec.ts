/// <reference path="../../typings/jasmine/jasmine.d.ts"/>

import Scribe from '../scribe';

describe('Scribe behaviour', () => {
  const translations = {
    normal: 'foo',
    nested: {
      item: 'bar'
    },
    replace: {
      singular: 'foo is :bar',
      multiple: 'foo is :bar but bar is :foo',
      complex: 'foo is :abc but bar is :abcdef',
      same: 'foo is :bar and bar is also :bar',
      sameArray: 'lets count to 5, :foo :foo :foo :foo :foo'
    },
    plural: {
      basic: 'a foo|lots of foo',
      exact: '{0} there are none|{3} there is a few|{10} there is max',
      complex: '{0} none|[1,10] there is some|[25, Inf] there is lots'
    }
  };

  const translator = new Scribe(translations);

  describe('retrieving', () => {
    it('should retrieve a translation', () => {
      expect(translator.get('normal')).toEqual('foo');
    });

    it('should retrieve a nested translation', () => {
      expect(translator.get('nested.item')).toEqual('bar');
    });

    it('should return the translation key if unable to retrieve a translation', () => {
      expect(translator.get('normal.foo.bar')).toEqual('normal.foo.bar');
      expect(translator.get('replace.not_found', {
        bar: 'great'
      })).toEqual('replace.not_found');
    });
  });

  describe('replacing', () => {
    it('should replace a singular place-holder', () => {
      expect(translator.get('replace.singular', {
        bar: 'great'
      })).toEqual('foo is great');
    });

    it('should replace multiple place-holders', () => {
      expect(translator.get('replace.multiple', {
        bar: 'great',
        foo: 'greator'
      })).toEqual('foo is great but bar is greator');
    });

    it('should replace multiple place-holders of different lengths correcty', () => {
      expect(translator.get('replace.complex', {
        abc: 'great',
        abcdef: 'greator'
      })).toEqual('foo is great but bar is greator');
    });

    it('should replace a place-holder multiple times', () => {
      expect(translator.get('replace.same', {
        bar: 'great'
      })).toEqual('foo is great and bar is also great');
    });

    it('should replace the same place-holder multiple times with different data each time using an array', () => {
      expect(translator.get('replace.sameArray', {
        foo: ['1', '2', '3', '4', '5']
      })).toEqual('lets count to 5, 1 2 3 4 5');
    });
  });
});
