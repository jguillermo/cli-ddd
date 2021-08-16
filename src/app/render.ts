import { storage } from './in-memory-storage';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('colors');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ejs = require('ejs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

export interface RenderData {
  templateFile: string;
  templateData: any;
  generatefolder: string;
  generateFile: string;
}

export class Render {
  static generate(data: RenderData) {
    const render = Render.generateRender(data.templateFile, data.templateData);
    Render.generateFile(data.generatefolder, data.generateFile, render);
  }

  static fromDir(startPath, filter, callback) {
    if (!fs.existsSync(startPath)) {
      console.log('no dir ', startPath);
      return;
    }

    const files = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
      const filename = path.join(startPath, files[i]);
      const stat = fs.lstatSync(filename);
      if (stat.isDirectory()) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Render.fromDir(filename, filter, callback); //recurse
      } else if (filter.test(filename)) callback(filename);
    }
  }

  static copy(data: RenderData) {
    const render = fs.readFileSync(`${storage.get('pathTemplate')}/main/${data.templateFile}`, 'utf-8');
    Render.generateFile(data.generatefolder, data.generateFile, render);
  }

  private static generateRender(templateFile: string, templateData: any): string {
    //console.log(templateData);
    return ejs.render(fs.readFileSync(`${storage.get('pathTemplate')}/main/${templateFile}`, 'utf-8'), templateData);
  }

  private static generateFile(generatefolder: string, generateFile: string, render: string): void {
    let fileGenerate = `${storage.get('pathRender')}/${generatefolder}/${generateFile}`;
    let folderGenerate = `${storage.get('pathRender')}/${generatefolder}`;
    if (generatefolder === '') {
      fileGenerate = `${storage.get('pathRender')}/${generateFile}`;
      folderGenerate = `${storage.get('pathRender')}`;
    }

    let exist = true;
    if (!fs.existsSync(fileGenerate)) {
      fs.mkdirSync(folderGenerate, { recursive: true });
      fs.writeFileSync(fileGenerate, render, 'utf-8');
      exist = false;
    }
    if (exist) {
      console.log(colors.gray(`[exist] ${fileGenerate}`));
    } else {
      console.log(colors.green(`[created] ${fileGenerate}`));
    }
  }
}
