export class Path {
  private _before: string;
  private _path: string;

  constructor(path: string) {
    const strArr = path.split('.');
    if (strArr.length === 2) {
      this._before = strArr[0];
      this._path = strArr[1];
    } else {
      this._before = '';
      this._path = strArr[0];
    }
  }

  get value(): string {
    return this._path;
  }

  get before(): string {
    return this._before;
  }
}
