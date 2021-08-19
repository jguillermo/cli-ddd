import { PropertieType } from './propertieType';

describe('PropertieType', () => {
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
      expect(type.isPrimitiveType).toEqual(true);
    });

    it('primitive date', () => {
      type = new PropertieType('date');
      expect(type.isPrimitiveType).toEqual(true);
    });
    it('primitive enum', () => {
      type = new PropertieType('enum');
      expect(type.isPrimitiveType).toEqual(true);
    });
    it('primitive id', () => {
      type = new PropertieType('id');
      expect(type.isPrimitiveType).toEqual(true);
    });
    it('primitive number', () => {
      type = new PropertieType('number');
      expect(type.isPrimitiveType).toEqual(true);
    });
    it('primitive string', () => {
      type = new PropertieType('string');
      expect(type.isPrimitiveType).toEqual(true);
    });
    it('primitive uuid', () => {
      type = new PropertieType('uuid');
      expect(type.isPrimitiveType).toEqual(true);
    });
    it('object', () => {
      type = new PropertieType('User:Id');
      expect(type.isPrimitiveType).toEqual(false);
    });
  });

  describe('parentTypeImp', () => {
    it('boolean', () => {
      type = new PropertieType('boolean');
      expect(type.parentTypeImp).toEqual('BooleanTypeImp');
      expect(type.value).toEqual('boolean');
    });
    it('id', () => {
      type = new PropertieType('id');
      expect(type.parentTypeImp).toEqual('UUIDTypeImp');
      expect(type.value).toEqual('id');
    });
    it('enum', () => {
      type = new PropertieType('enum');
      expect(type.parentTypeImp).toEqual('StringTypeImp');
      expect(type.value).toEqual('enum');
    });
    it('object', () => {
      type = new PropertieType('User:Id');
      expect(type.parentTypeImp).toEqual(null);
      expect(type.value).toEqual('User:Id');
    });
  });

  describe('primitiveTypeImp', () => {
    it('boolean', () => {
      type = new PropertieType('boolean');
      expect(type.primitiveTypeImp).toEqual('BooleanTypeImp');
      expect(type.value).toEqual('boolean');
    });
    it('uuid', () => {
      type = new PropertieType('uuid');
      expect(type.primitiveTypeImp).toEqual('UUIDTypeImp');
      expect(type.value).toEqual('uuid');
    });
    it('object', () => {
      type = new PropertieType('User:Id');
      expect(type.primitiveTypeImp).toEqual(null);
      expect(type.value).toEqual('User:Id');
    });
  });
  describe('primitiveType', () => {
    it('boolean', () => {
      type = new PropertieType('boolean');
      expect(type.primitiveType).toEqual('boolean');
      expect(type.value).toEqual('boolean');
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
    it('id', () => {
      type = new PropertieType('id');
      expect(type.primitive).toEqual('string');
      expect(type.value).toEqual('id');
    });
    it('uuid', () => {
      type = new PropertieType('uuid');
      expect(type.primitive).toEqual('string');
      expect(type.value).toEqual('uuid');
    });
    it('enum', () => {
      type = new PropertieType('enum');
      expect(type.primitive).toEqual('string');
      expect(type.value).toEqual('enum');
    });
    it('object', () => {
      type = new PropertieType('User:Id');
      expect(type.primitive).toEqual(null);
      expect(type.value).toEqual('User:Id');
    });
  });
});
