import { Pipe, PipeTransform } from '@angular/core';
import { parsePhoneNumber, CountryCode } from 'libphonenumber-js/min';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: any, country: string): any {
    try {
      const userPhone = parsePhoneNumber(value + '', country as CountryCode);
      return userPhone.formatNational();
    } catch (error) {
      return value;
    }
  }
}
