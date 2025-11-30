import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyConverter'
})
export class CurrencyConverterPipe implements PipeTransform {

  transform(value: number | string, currencyCode: string = 'EUR', symbol: string = '€'): string {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numericValue) || numericValue === null) {
      return '';
    }

    const formatter = new Intl.NumberFormat('fr-FR', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });

    return `${formatter.format(numericValue)} ${symbol} (${currencyCode})`;
  }
}
