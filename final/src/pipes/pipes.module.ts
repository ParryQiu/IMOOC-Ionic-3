import { NgModule } from '@angular/core';
import { RelativetimePipe } from './relativetime/relativetime';
@NgModule({
	declarations: [RelativetimePipe],
	imports: [RelativetimePipe],
	exports: [RelativetimePipe]
})
export class PipesModule {}
