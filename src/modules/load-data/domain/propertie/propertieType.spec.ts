import { PropertieType } from './propertieType';

describe('Propertie', () => {
  let type: PropertieType;

  describe('value', () => {
    it('value boolean', () => {
      type = new PropertieType('boolean');
      expect(type.value).toEqual('boolean');
    });
    it('value Boolean', () => {
      type = new PropertieType('Boolean');
      expect(type.value).toEqual('boolean');
    });
    it('value BOOLEAN', () => {
      type = new PropertieType('BOOLEAN');
      expect(type.value).toEqual('boolean');
    });
    it('value UUID', () => {
      type = new PropertieType('UUID');
      expect(type.value).toEqual('uuid');
    });
    it('value User:Id object', () => {
      type = new PropertieType('User:Id');
      expect(type.value).toEqual('User:Id');
    });
  });

  describe('isPrimitive', () => {
    it('primitive boolean', () => {
      type = new PropertieType('boolean');
      expect(type.isPrimitive).toEqual(true);
    });

    it('primitive date', () => {
      type = new PropertieType('date');
      expect(type.isPrimitive).toEqual(true);
    });
    it('primitive enum', () => {
      type = new PropertieType('enum');
      expect(type.isPrimitive).toEqual(true);
    });
    it('primitive id', () => {
      type = new PropertieType('id');
      expect(type.isPrimitive).toEqual(true);
    });
    it('primitive number', () => {
      type = new PropertieType('number');
      expect(type.isPrimitive).toEqual(true);
    });
    it('primitive string', () => {
      type = new PropertieType('string');
      expect(type.isPrimitive).toEqual(true);
    });
    it('primitive uuid', () => {
      type = new PropertieType('uuid');
      expect(type.isPrimitive).toEqual(true);
    });
    it('object', () => {
      type = new PropertieType('User:Id');
      expect(type.isPrimitive).toEqual(false);
    });
  });

  describe('parentType', () => {
    it('boolean', () => {
      type = new PropertieType('boolean');
      expect(type.parentType).toEqual('BooleanTypeImp');
      expect(type.value).toEqual('boolean');
    });
    it('id', () => {
      type = new PropertieType('id');
      expect(type.parentType).toEqual('UUIDTypeImp');
      expect(type.value).toEqual('id');
    });
    it('enum', () => {
      type = new PropertieType('enum');
      expect(type.parentType).toEqual('StringTypeImp');
      expect(type.value).toEqual('enum');
    });
    it('object', () => {
      type = new PropertieType('User:Id');
      expect(type.parentType).toEqual(null);
      expect(type.value).toEqual('User:Id');
    });
  });

  describe('primitiveType', () => {
    it('boolean', () => {
      type = new PropertieType('boolean');
      expect(type.primitiveType).toEqual('BooleanTypeImp');
      expect(type.value).toEqual('boolean');
    });
    it('uuid', () => {
      type = new PropertieType('uuid');
      expect(type.primitiveType).toEqual('UUIDTypeImp');
      expect(type.value).toEqual('uuid');
    });
    it('object', () => {
      type = new PropertieType('User:Id');
      expect(type.primitiveType).toEqual(null);
      expect(type.value).toEqual('User:Id');
    });
  });
  describe('primitive', () => {
    it('boolean', () => {
      type = new PropertieType('boolean');
      expect(type.primitive).toEqual('boolean');
      expect(type.value).toEqual('boolean');
    });
    it('object', () => {
      type = new PropertieType('User:Id');
      expect(type.primitive).toEqual(null);
      expect(type.value).toEqual('User:Id');
    });
  });
});
