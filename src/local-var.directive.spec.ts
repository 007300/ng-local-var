import 'es6-shim';
import 'reflect-metadata';

import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import { CommonModule } from '@angular/common';
import { Component, DebugElement, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';

import { LocalVarModule } from './module';

describe('LocalVarDirective', () => {
	const date = new Date();

	TestBed.initTestEnvironment(
		BrowserDynamicTestingModule,
		platformBrowserDynamicTesting()
	);
	@Component({
		template: `
		<div id="object" *localVar="data as object">
			{{object.date | json}}
		</div>
		<div id="observable" *localVar="data$ | async as observable">
	    	{{observable.date | json}}
	    </div>
		`
	})
	class TestComponent {
		data: any;
		data$: Observable<any>;

		constructor() {
			this.data = { date };
			this.data$ = of({ date });
		}
	}

	@NgModule({
		declarations: [TestComponent],
		imports: [LocalVarModule, CommonModule]
	})
	class DummyModule {}

	let fixture: ComponentFixture<TestComponent>;
	let component: TestComponent;
	let nativeElement: DebugElement;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				imports: [DummyModule]
			});

			fixture = TestBed.createComponent(TestComponent);
			component = fixture.componentInstance;
			nativeElement = fixture.debugElement;
			fixture.detectChanges();
		})
	);

	it('should define a local variable', () => {
		expect(
			nativeElement.query(By.css('#object')).nativeElement.textContent
		).toMatch(JSON.stringify(date));
	});

	it('should define a local variable from subscription', () => {
		expect(
			nativeElement.query(By.css('#observable')).nativeElement.textContent
		).toMatch(JSON.stringify(date));
	});
});
