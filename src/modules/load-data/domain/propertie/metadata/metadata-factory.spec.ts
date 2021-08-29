import { EnumMetadataType, MetadataFactory } from './metadata-factory';

describe('MetadataFactory', () => {
  describe('getProcessType', () => {
    it('inline', () => {
      expect(MetadataFactory.getValueType('id')).toEqual(EnumMetadataType.INLINE);
      expect(MetadataFactory.getValueType('string')).toEqual(EnumMetadataType.INLINE);
      expect(MetadataFactory.getValueType('uuid')).toEqual(EnumMetadataType.INLINE);
      expect(MetadataFactory.getValueType('date')).toEqual(EnumMetadataType.INLINE);
      expect(MetadataFactory.getValueType('enum')).toEqual(EnumMetadataType.INLINE);
    });
    it('array', () => {
      expect(MetadataFactory.getValueType([])).toEqual(EnumMetadataType.ARRAY);
      expect(MetadataFactory.getValueType(['a', 'b'])).toEqual(EnumMetadataType.ARRAY);
      expect(MetadataFactory.getValueType([1, 2])).toEqual(EnumMetadataType.ARRAY);
      expect(MetadataFactory.getValueType([null])).toEqual(EnumMetadataType.ARRAY);
      expect(MetadataFactory.getValueType([undefined])).toEqual(EnumMetadataType.ARRAY);
    });

    it('object', () => {
      expect(MetadataFactory.getValueType({})).toEqual(EnumMetadataType.OBJET);
      expect(MetadataFactory.getValueType({ type: 'number' })).toEqual(EnumMetadataType.OBJET);
      expect(MetadataFactory.getValueType(null)).toEqual(EnumMetadataType.OBJET);
      expect(MetadataFactory.getValueType(undefined)).toEqual(EnumMetadataType.OBJET);
    });
  });

  describe('processValue', () => {
    it('inline', () => {
      expect(MetadataFactory.processValue('id').type).toEqual('id');
      expect(MetadataFactory.processValue('id').required).toEqual(true);
      expect(MetadataFactory.processValue('id').defaultValue).toEqual(null);

      expect(MetadataFactory.processValue('string').type).toEqual('string');
      expect(MetadataFactory.processValue('uuid').type).toEqual('uuid');
      expect(MetadataFactory.processValue('date').type).toEqual('date');
      expect(MetadataFactory.processValue('enum').type).toEqual('enum');
      expect(MetadataFactory.processValue('enum').values).toEqual([]);
    });
    it('array', () => {
      expect(MetadataFactory.processValue([]).type).toEqual('enum');
      expect(MetadataFactory.processValue([]).values).toEqual([]);

      expect(MetadataFactory.processValue(['a', 'b']).type).toEqual('enum');
      expect(MetadataFactory.processValue(['a', 'b']).values).toEqual(['a', 'b']);
      expect(MetadataFactory.processValue(['a', 'b']).required).toEqual(true);

      expect(MetadataFactory.processValue([null]).type).toEqual('enum');
      expect(MetadataFactory.processValue([null]).values).toEqual([null]);

      expect(MetadataFactory.processValue([undefined]).type).toEqual('enum');
      expect(MetadataFactory.processValue([undefined]).values).toEqual([undefined]);
    });

    it('object', () => {
      expect(MetadataFactory.processValue({ type: 'number' }).type).toEqual('number');
      expect(MetadataFactory.processValue({ type: 'number' }).required).toEqual(true);
      expect(MetadataFactory.processValue({ type: 'number', required: false }).required).toEqual(false);
    });
  });
});
