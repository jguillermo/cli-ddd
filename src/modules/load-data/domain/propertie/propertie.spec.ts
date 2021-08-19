import { Propertie } from './propertie';
import { Name } from '../Name';

describe('Propertie', () => {
  let propertie: Propertie;

  describe('create', () => {
    it('string', () => {
      propertie = Propertie.create('name', 'string', new Name('User'));
      expect(propertie.type.value).toEqual('string');
      expect(propertie.defaultValue.value).toEqual(null);
      expect(propertie.required.value).toEqual(true);
    });
    it('string object', () => {
      propertie = Propertie.create('name', { type: 'string' }, new Name('User'));
      expect(propertie.type.value).toEqual('string');
      expect(propertie.defaultValue.value).toEqual(null);
      expect(propertie.required.value).toEqual(true);
    });
  });
});
