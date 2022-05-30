export enum PropertieTypes {
  BOOLEAN = 'boolean',
  DATE = 'date',
  ENUM = 'enum',
  ID = 'id',
  NUMBER = 'number',
  STRING = 'string',
  UUID = 'uuid',
}

export class PropertieType {
  private _type: string;

  constructor(type: string) {
    this._type = PropertieType.isPrimitiveValue(type) ? type.toLowerCase() : type;
  }

  get value(): string {
    return `${this._type}`;
  }

  get isPrimitiveType() {
    return PropertieType.isPrimitiveValue(this.value);
  }

  get primitiveType(): string | null {
    if (!this.isPrimitiveType) {
      return null;
    }
    return this.value;
  }

  get isDate(): boolean {
    return this.value === PropertieTypes.DATE;
  }
  get isNumber(): boolean {
    return this.value === PropertieTypes.NUMBER;
  }
  get isEnum(): boolean {
    return this.value === PropertieTypes.ENUM;
  }
  get isBoolean(): boolean {
    return this.value === PropertieTypes.BOOLEAN;
  }

  get primitiveTypeImp(): string | null {
    if (!this.isPrimitiveType) {
      return null;
    }
    return `${PropertieType.capitalizar(this.value)}TypeImp`;
  }

  get parentTypeImp(): string | null {
    if (!this.isPrimitiveType) {
      return null;
    }
    let parentType = this.value;
    switch (this.value) {
      case PropertieTypes.ENUM:
        parentType = 'string';
        break;
      case PropertieTypes.ID:
        parentType = 'uuid';
        break;
    }
    return `${PropertieType.capitalizar(parentType)}TypeImp`;
  }

  private static capitalizar(str: string) {
    if (str === PropertieTypes.UUID) {
      return 'UUID';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static isPrimitiveValue(value: string): boolean {
    return `${value}`.toUpperCase() in PropertieTypes;
  }

  get primitive(): string | null {
    if (!this.isPrimitiveType) {
      return null;
    }
    let type = this.value;
    switch (this.value) {
      case PropertieTypes.ID:
        type = 'string';
        break;
      case PropertieTypes.UUID:
        type = 'string';
        break;
      case PropertieTypes.ENUM:
        type = 'string';
        break;
      case PropertieTypes.DATE:
        type = 'Date';
        break;
    }
    return type;
  }
}
