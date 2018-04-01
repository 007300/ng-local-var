import { NgModule } from '@angular/core';

import { LocalVarDirective } from './local-var.directive';

@NgModule({
	declarations: [LocalVarDirective],
	exports: [LocalVarDirective]
})
export class LocalVarModule {}
