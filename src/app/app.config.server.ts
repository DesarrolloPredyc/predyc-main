import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideQuillConfig } from 'ngx-quill/config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideQuillConfig({
      modules: {
        syntax: true,
        toolbar: []
      }
    })
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
