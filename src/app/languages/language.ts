import { NodeLanguage } from './node-language';

export interface LanguageInterface {
  language(): string;

  className(names: string[]): string;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  classFile(names: string[], addType: boolean = false): string;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  classFileWithOutType(names: string[], addType: boolean = false): string;

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
