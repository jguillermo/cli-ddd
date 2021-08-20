import { LanguageInterface, LanguageList } from './language';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const s = require('underscore.string');

// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-var-requires
const slugify = require('underscore.string/slugify');

export class NodeLanguage implements LanguageInterface {
  dotExt(): string {
    return '.ts';
  }

  language(): string {
    return LanguageList.NODE;
  }

  className(names: string[]): string {
    return names
      .map((n) => {
        return s.capitalize(n);
      })
      .join('');
  }

  classFile(names: string[], addType = true): string {
    const namesMayus = names.map((n) => {
      const dd = n.split(/(?=[A-Z])/);
      return dd.join('-');
    });

    const type = slugify(namesMayus.pop());
    const name = namesMayus
      .map((n) => {
        return slugify(n);
      })
      .join('-');
    if (name === '') {
      return addType ? `${type}${this.dotExt()}` : `${type}`;
    } else {
      return addType ? `${name}.${type}${this.dotExt()}` : `${name}.${type}`;
    }
  }

  classFileWithOutType(names: string[], addType = true): string {
    const namesMayus = names.map((n) => {
      const dd = n.split(/(?=[A-Z])/);
      return dd.join('-');
    });

    const name = namesMayus
      .map((n) => {
        return slugify(n);
      })
      .join('-');
    return addType ? `${name}${this.dotExt()}` : name;
  }

  folderPath(paths: string[]): string {
    const pathsSeparate = [];
    paths.forEach((value: string) => {
      value.split('/').forEach((v: string) => {
        pathsSeparate.push(v);
      });
    });

    const pathsMayus = pathsSeparate.map((n) => {
      const dd = n.split(/(?=[A-Z])/);
      return dd.join('-');
    });
    return pathsMayus
      .map((n) => {
        return slugify(n);
      })
      .join('/');
  }
}
