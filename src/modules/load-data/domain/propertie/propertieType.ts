export class PropertieType {
  private _type: string;
  private static primitivesValues = ['boolean', 'date', 'enum', 'id', 'number', 'string', 'uuid'];

  constructor(type: string) {
    this._type = PropertieType.isPrimitiveValue(type) ? type.toLowerCase() : type;
  }

  get value(): string {
    return `${this._type}`;
  }

  get isPrimitive() {
    return PropertieType.isPrimitiveValue(this.value);
  }

  get primitive(): string | null {
    if (!this.isPrimitive) {
      return null;
    }
    return this._type;
  }

  get primitiveType(): string | null {
    if (!this.isPrimitive) {
      return null;
    }
    return `${PropertieType.capitalizar(this.value)}TypeImp`;
  }

  get parentType(): string | null {
    if (!this.isPrimitive) {
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

  // get primitive(): string {
  //   let primitive = '';
  //   switch (this._type) {
  //     case 'id:
  //       primitive = 'string';
  //       break;
  //     default:
  //       primitive = this._type;
  //   }
  //   return primitive;
  // }
}
