import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'returnCustomeNamePipe'
})
export class ReturnCustomeNamePipePipe implements PipeTransform {

    transform(value: string): string {
        const parts = value.split('/');
        let filename = parts[parts.length - 1];
        if (filename.length > 10) {
            filename = filename.substr(0, 6) + '...';
        }
        return filename;
    }

}
