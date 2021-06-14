export interface LanguageInterface {
  language(): string;

  className(names: string[]): string;

  classFile(names: string[]): string;

  classFileWithOutType(names: string[]): string;

  folderPath(paths: string[]): string;
}
