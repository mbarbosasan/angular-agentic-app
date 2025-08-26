import { Pipe, PipeTransform } from '@angular/core';
import { ModelMessage } from 'ai';

@Pipe({
  name: 'toContent',
})
export class ToContentPipe implements PipeTransform {
  transform(value: ModelMessage): string {
    console.log(value);
    if (value.role === 'assistant') {
      return typeof value.content === 'string'
        ? value.content
        : value.content.map((content) => (content.type === 'text' ? content.text : ''))[0];
    } else {
      return value.content as string;
    }
  }
}
