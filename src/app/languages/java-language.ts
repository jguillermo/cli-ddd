import { LanguageInterface, LanguageList } from './language';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const s = require('underscore.string');

export class JavaLanguage implements LanguageInterface {
  language(): string {
    return LanguageList.JAVA;
  }

  className(names: string[]): string {
    return names
      .map((n) => {
        return s.capitalize(n);
      })
      .join('');
  }

  classFile(names: string[], addType = true): string {
    const name = names
      .map((n) => {
        return s.capitalize(n);
      })
      .join('');
    return addType ? `${name}.java` : name;
  }

  classFileWithOutType(names: string[], addType = true): string {
    return names
      .map((n) => {
        if (addType) {
          return '';
        }
        return s.capitalize(n);
      })
      .join('');
  }

  folderPath(paths: string[]): string {
    return paths.join('/');
  }
}
