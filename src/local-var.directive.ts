import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

class VarContext {
	public $implicit: any = null;
	public localVar: any = null;
}

@Directive({
	selector: '[localVar]'
})
export class LocalVarDirective {
	private context: VarContext = new VarContext();

	constructor(
		private viewContainer: ViewContainerRef,
		private templateRef: TemplateRef<any>
	) {}

	@Input()
	set localVar(value: any) {
		this.context.$implicit = this.context.localVar = value;
		this.updateView();
	}

	private updateView() {
		this.viewContainer.clear();
		this.viewContainer.createEmbeddedView(this.templateRef, this.context);
	}
}
