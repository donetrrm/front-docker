import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../translate.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(private translateService: TranslateService){}

  transform(word:string | number): string | number {
    return this.translateService.getMenuTranslation(word);
  }

}
