import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { Structure } from '../../domain/structure';

const fs = require('fs');
const YAML = require('yaml');

@Injectable()
export class YmlToJsonService {
  relativePath() {
    return process.cwd();
  }

  getFiles(pathFiles: string): string[] {
    if (!fs.existsSync(pathFiles)) {
      throw Error('el folder no existe');
    }
    const listFile: string[] = [];
    // tslint:disable-next-line:only-arrow-functions
    fs.readdirSync(pathFiles).forEach(function (file: string) {
      listFile.push(file);
    });
    return listFile;
  }

  readFiles(files: string[], pathConfig: string) {
    return files.map((fileName) => {
      const file = fs.readFileSync(path.join(pathConfig, fileName), 'utf8');
      return YAML.parse(file);
    });
  }

  getData(pathFiles: string): Structure[] {
    const files = this.getFiles(pathFiles);
    return this.readFiles(files, pathFiles);
  }
}
