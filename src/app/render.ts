import { storage } from './in-memory-storage';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('colors');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ejs = require('ejs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const copydir = require('copy-dir');

export interface RenderData {
  templateFile: string;
  templateData: any;
  generatefolder: string;
  generateFile: string;
}

export class Render {
  static generate(data: RenderData, force = false) {
    const render = Render.generateRender(data.templateFile, data.templateData);
    Render.generateFile(data.generatefolder, data.generateFile, render, force);
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

  static copyFolder(language: string, templateFolder: string, renderFolder: string) {
    const pathTemplate = path.join(storage.get('pathTemplate'), 'main', language, templateFolder);
    const pathRender = path.join(storage.get('pathRender'), renderFolder);

    if (!fs.existsSync(pathRender)) {
      copydir.sync(pathTemplate, pathRender, {
        utimes: true,
        mode: true,
        cover: true,
      });
      console.log(colors.green(`[created] ${pathRender}`));
    } else {
      console.log(colors.gray(`[exist] ${pathRender}`));
    }
  }

  private static generateRender(templateFile: string, templateData: any): string {
    //console.log(templateData);
    return ejs.render(fs.readFileSync(`${storage.get('pathTemplate')}/main/${templateFile}`, 'utf-8'), templateData);
  }

  private static generateFile(generatefolder: string, generateFile: string, render: string, force = false): void {
    let fileGenerate = `${storage.get('pathRender')}/${generatefolder}/${generateFile}`;
    let folderGenerate = `${storage.get('pathRender')}/${generatefolder}`;
    if (generatefolder === '') {
      fileGenerate = `${storage.get('pathRender')}/${generateFile}`;
      folderGenerate = `${storage.get('pathRender')}`;
    }

    const fileExist = fs.existsSync(fileGenerate);

    fs.mkdirSync(folderGenerate, { recursive: true });

    if (force) {
      fs.writeFileSync(fileGenerate, render, 'utf-8');
      if (fileExist) {
        console.log(colors.gray(`[updated] ${fileGenerate}`));
      } else {
        console.log(colors.green(`[created] ${fileGenerate}`));
      }
    } else {
      if (!fileExist) {
        fs.writeFileSync(fileGenerate, render, 'utf-8');
      }
      if (fileExist) {
        console.log(colors.gray(`[exist] ${fileGenerate}`));
      } else {
        console.log(colors.green(`[created] ${fileGenerate}`));
      }
    }
  }
}
