import { NodeLanguage } from './node-language';

export interface LanguageInterface {
  language(): string;

  className(names: string[]): string;

  classFile(names: string[]): string;

  classFileWithOutType(names: string[]): string;

  folderPath(paths: string[]): string;
}

export enum LanguageList {
  JAVA = 'java',
  NODE = 'node',
}

export class Language {
  static plugin(name: string): LanguageInterface {
    switch (name) {
      case LanguageList.NODE:
        return new NodeLanguage();
      default:
        throw new Error(`FactoryService : ${name} not exist`);
    }
  }
}
