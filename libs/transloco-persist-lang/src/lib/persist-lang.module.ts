import { ModuleWithProviders, NgModule } from '@angular/core';

import { TranslocoPersistLangService } from './persist-lang.service';
import {
  PersistLangConfig,
  TRANSLOCO_PERSIST_LANG_CONFIG,
} from './persist-lang.config';

@NgModule()
export class TranslocoPersistLangModule {
  static forRoot(
    config: PersistLangConfig
  ): ModuleWithProviders<TranslocoPersistLangModule> {
    return {
      ngModule: TranslocoPersistLangModule,
      providers: [
        { provide: TRANSLOCO_PERSIST_LANG_CONFIG, useValue: config },
        config.storage,
      ],
    };
  }

  // Initialize the service
  constructor(private service: TranslocoPersistLangService) {}
}
