import { PropertieTypes } from '../propertieType';
import { Metadata } from './metadata';
import { MetadataEnum } from './metadata-enum';

export interface PropertieValue {
  required: boolean;
  defaultValue: string | boolean | number;
  type: string;
  values?: string[];
}

export enum EnumMetadataType {
  INLINE,
  ARRAY,
  OBJET,
}

export class MetadataFactory {
  public static create(value: any): Metadata {
    const metadata = MetadataFactory.processValue(value);
    switch (metadata.type) {
      case PropertieTypes.ENUM: {
        return new MetadataEnum(metadata);
      }
      default: {
        return new Metadata(metadata);
      }
    }
  }

  public static getValueType(value: any): EnumMetadataType {
    if (typeof value === 'string') {
      return EnumMetadataType.INLINE;
    } else if (Array.isArray(value)) {
      return EnumMetadataType.ARRAY;
    } else {
      return EnumMetadataType.OBJET;
    }
  }

  public static processValue(value: any): PropertieValue {
    let metadata: PropertieValue = {
      type: null,
      required: true,
      defaultValue: null,
      values: [],
    };
    switch (MetadataFactory.getValueType(value)) {
      case EnumMetadataType.INLINE: {
        metadata.type = `${value}`;
        break;
      }
      case EnumMetadataType.ARRAY: {
        metadata.type = 'enum';
        metadata.values = value ? value : [];
        break;
      }
      case EnumMetadataType.OBJET: {
        metadata.defaultValue = typeof value['default'] == 'undefined' ? null : value['default'];
        metadata.required = typeof value['required'] == 'undefined' ? true : value['required'];
        metadata = { ...metadata, ...value };
        break;
      }
      default: {
        throw new Error('there is a problen, no exist type properties values');
      }
    }
    return metadata;
  }
}
