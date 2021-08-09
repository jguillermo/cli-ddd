export class PropertieType {
  private _type: string;
  private static primitivesValues = ['boolean', 'date', 'enum', 'id', 'number', 'string', 'uuid'];

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
      case 'enum':
        parentType = 'string';
        break;
      case 'id':
        parentType = 'uuid';
        break;
    }
    return `${PropertieType.capitalizar(parentType)}TypeImp`;
  }

  private static capitalizar(str: string) {
    if (str === 'uuid') {
      return 'UUID';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static isPrimitiveValue(value: string) {
    return PropertieType.primitivesValues.indexOf(`${value}`.toLowerCase()) >= 0;
  }

  isString() {
    return this.primitive === 'string';
  }

  get primitive(): string | null {
    if (!this.isPrimitiveType) {
      return null;
    }
    let type = this.value;
    switch (this.value) {
      case 'id':
        type = 'string';
        break;
      case 'uuid':
        type = 'string';
        break;
      case 'enum':
        type = 'string';
        break;
    }
    return type;
  }
}
