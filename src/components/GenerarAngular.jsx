import React from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import '../styles/GenerarAngular.css';
import angularLogo from '../assets/ilustracion.svg';  // Asegúrate de tener este SVG
import Navbar from './Navbar';


const GenerarAngular = () => {
  const generarZip = async () => {
    const zip = new JSZip();
    const root = zip.folder('angular-project');
    const htmlGuardado = localStorage.getItem("htmlGenerado");

    // Archivos raíz necesarios
    root.file('README.md', '# Angular App\nProyecto generado automáticamente.');

    root.file('angular.json', JSON.stringify({
      "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
      "version": 1,
      "newProjectRoot": "projects",
      "projects": {
        "angular-project": {
          "projectType": "application",
          "schematics": {},
          "root": "",
          "sourceRoot": "src",
          "prefix": "app",
          "architect": {
            "build": {
              "builder": "@angular-devkit/build-angular:browser",
              "options": {
                "outputPath": "dist/angular-project",
                "index": "src/index.html",
                "main": "src/main.ts",
                "polyfills": "src/polyfills.ts",
                "tsConfig": "tsconfig.app.json",
                "assets": ["src/favicon.ico", "src/assets"],
                "styles": ["src/styles.css"],
                "scripts": []
              },
              "configurations": {
                "production": {
                  "fileReplacements": [
                    {
                      "replace": "src/environments/environment.ts",
                      "with": "src/environments/environment.prod.ts"
                    }
                  ],
                  "optimization": true,
                  "outputHashing": "all",
                  "sourceMap": false,
                  "extractCss": true,
                  "namedChunks": false,
                  "extractLicenses": true,
                  "vendorChunk": false,
                  "buildOptimizer": true
                }
              }
            },
            "serve": {
              "builder": "@angular-devkit/build-angular:dev-server",
              "options": {
                "browserTarget": "angular-project:build"
              }
            }
          }
        }
      },
      "defaultProject": "angular-project"
    }, null, 2));

    root.file('tsconfig.json', JSON.stringify({
      "compileOnSave": false,
      "compilerOptions": {
        "outDir": "./dist/out-tsc",
        "sourceMap": true,
        "declaration": false,
        "downlevelIteration": true,
        "experimentalDecorators": true,
        "module": "es2020",
        "moduleResolution": "node",
        "importHelpers": true,
        "target": "es2015",
        "typeRoots": ["node_modules/@types"],
        "lib": ["es2018", "dom"]
      }
    }, null, 2));

    root.file('tsconfig.app.json', JSON.stringify({
      "extends": "./tsconfig.json",
      "compilerOptions": {
        "outDir": "./out-tsc/app",
        "types": []
      },
      "files": ["src/main.ts", "src/polyfills.ts"],
      "include": ["src/**/*.d.ts"]
    }, null, 2));

    root.file('package.json', JSON.stringify({
      "name": "angular-project",
      "version": "0.0.1",
      "scripts": {
        "ng": "ng",
        "start": "ng serve",
        "build": "ng build",
        "test": "ng test",
        "lint": "ng lint",
        "e2e": "ng e2e"
      },
      "private": true,
      "dependencies": {
        "@angular/animations": "^16.0.0",
        "@angular/common": "^16.0.0",
        "@angular/compiler": "^16.0.0",
        "@angular/core": "^16.0.0",
        "@angular/forms": "^16.0.0",
        "@angular/platform-browser": "^16.0.0",
        "@angular/platform-browser-dynamic": "^16.0.0",
        "@angular/router": "^16.0.0",
        "rxjs": "~7.5.0",
        "tslib": "^2.3.0",
        "zone.js": "~0.13.0"
      },
      "devDependencies": {
        "@angular-devkit/build-angular": "^16.0.0",
        "@angular/cli": "^16.0.0",
        "@angular/compiler-cli": "^16.0.0",
        "typescript": "~5.0.0"
      }
    }, null, 2));

    // src
    const src = root.folder('src');
    src.file('index.html', `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Angular Project</title>
  <base href="/">
</head>
<body>
  <app-root></app-root>
</body>
</html>
    `.trim());

    src.file('main.ts', `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));`);

    src.file('polyfills.ts', `import 'zone.js';`);
    src.file('styles.css', `h1 { color: blue; font-family: Arial; }`);
    src.folder('assets'); // puede estar vacía

    const env = src.folder('environments');
    env.file('environment.ts', `export const environment = { production: false };`);
    env.file('environment.prod.ts', `export const environment = { production: true };`);

    // src/app
    const app = src.folder('app');
    app.file('app.component.ts', `
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-project';
}
    `.trim());

    // Aquí insertamos el contenido del HTML generado en localStorage
    app.file('app.component.html', htmlGuardado || `<h1>Hola desde Angular!</h1>`); // Aquí se coloca el contenido guardado o uno predeterminado
    app.file('app.component.css', ``);
    app.file('app.module.ts', `
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
    `.trim());

    // Generar el zip y forzar descarga
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'angular-project.zip');
  };

  return (
    <>
    <Navbar/>
    
    <div className="generate-container">
      <div className="generate-card">
        <img src={angularLogo} alt="Angular Logo" className="generate-image" />
        <h2>Generar Proyecto Angular</h2>
        <p>Descarga automáticamente un proyecto Angular basado en tu diseño.</p>
        <button onClick={generarZip} className="generate-button">
          Descargar Proyecto Angular
        </button>
      </div>
    </div>
    </>
  );
};

export default GenerarAngular;
