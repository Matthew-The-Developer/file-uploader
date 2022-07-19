import { Injector, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dynamic'
})
export class DynamicPipe implements PipeTransform {
   constructor(private injector: Injector) { }

  transform(value: any, pipeToken: any, pipeArgs: any[] = []): any {
    if (pipeToken) {
      const pipe = this.injector.get(pipeToken);
      return pipe.transform(value, ...pipeArgs);
    } else {
      return value;
    }
  }
}
