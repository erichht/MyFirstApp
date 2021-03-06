import DS from 'ember-data';
import Faker from 'faker';
import { empty } from '@ember/object/computed';

export default DS.Model.extend({
  title: DS.attr('string'),
  releaseYear: DS.attr('date'),
  library: DS.belongsTo('library', { inverse: 'books', async: true }),
  author: DS.belongsTo('author', { inverse: 'books', async: true }),
  isNotValidTitle: empty('title'),
  isNotValidYear: empty('releaseYear'),

  randomize(author, library) {
    this.set('title', this._bookTitle());
    this.set('author', author);
    this.set('releaseYear', this._randomYear());
    this.set('library', library);
    return this;
  },

  _bookTitle() {
    return `${Faker.commerce.productName()} Cookbook`;
  },

  _randomYear() {
    return new Date(this._getRandomArbitrary(1900, 2015).toPrecision(4));
  },

  _getRandomArbitrary (min, max) {
    return Math.random() * (max -min) + min;
  }

});
