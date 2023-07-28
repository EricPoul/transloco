import { ChangeDetectorRef } from '@angular/core';

import { mockLocaleService, mockCDR } from '../mocks';
import { TranslocoLocaleService } from '../../transloco-locale.service';
import { LocaleConfig } from '../../transloco-locale.types';

import { TranslocoDecimalPipe } from './../../pipes/transloco-decimal.pipe';
import { defaultConfig } from './../../transloco-locale.config';

describe('TranslocoDecimalPipe', () => {
  let service: TranslocoLocaleService;
  let cdr: ChangeDetectorRef;
  let pipe: TranslocoDecimalPipe;

  beforeEach(() => {
    service = mockLocaleService();
    cdr = mockCDR();
    pipe = new TranslocoDecimalPipe(service, cdr, defaultConfig.localeConfig);
  });

  it('should transform number to locale format number', () => {
    expect(pipe.transform(123456)).toEqual('123,456');
  });

  it('should transform string to locale format number', () => {
    expect(pipe.transform('123456')).toEqual('123,456');
  });

  it('should take the format from the locale', () => {
    service = mockLocaleService('es-ES');
    pipe = new TranslocoDecimalPipe(service, cdr, defaultConfig.localeConfig);
    expect(pipe.transform(123456)).toEqual('123.456');
  });

  it('should take the number from the locale', () => {
    expect(pipe.transform(123456, undefined, 'es-ES')).toEqual('123.456');
  });

  it('should use default config options', () => {
    spyOn(Intl, 'NumberFormat').and.callThrough();
    const config: LocaleConfig = {
      global: { decimal: { useGrouping: true, maximumFractionDigits: 2 } },
      localeBased: {},
    };
    const pipe = new TranslocoDecimalPipe(service, cdr, config);
    pipe.transform('123');
    const call = (Intl.NumberFormat as any).calls.argsFor(0);
    expect(call[1].useGrouping).toBeTruthy();
    expect(call[1].maximumFractionDigits).toEqual(2);
  });

  it('should use passed digit options instead of default options', () => {
    spyOn(Intl, 'NumberFormat').and.callThrough();
    const config = { useGrouping: true, maximumFractionDigits: 3 };
    pipe.transform('123', config);
    const call = (Intl.NumberFormat as any).calls.argsFor(0);
    expect(call[1].useGrouping).toBeTruthy();
    expect(call[1].maximumFractionDigits).toEqual(3);
  });

  it('should handle none transformable values', () => {
    expect(pipe.transform(null as any)).toEqual('');
    expect(pipe.transform({} as any)).toEqual('');
    expect(pipe.transform('none number string')).toEqual('');
  });
});
