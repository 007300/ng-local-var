# ng-local-var

A simple directive to define a variable in template for Angular.

## Examples:

```
data = { a: 1, b: 2 };
data$ = Observable.of(data)
```

```html
<div *localVar="data as obj1">
  {{obj1.a | json}}
  {{obj1.b | json}}
</div>

<div *localVar="data$ | async as obj2">
  {{obj2.a | json}}
  {{obj2.b | json}}
</div>
```

## Installation:

Install the package via yarn/npm:

```bash
yarn add ng-local-var
npm install --save ng-local-var
```

Then import the module via NgModule:

```js
// app.module.ts

import { LocalVarModule } from 'ng-local-var';

@NgModule({
	imports: [LocalVarModule]
})
export class AppModule {}
```
