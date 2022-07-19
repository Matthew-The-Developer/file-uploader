import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemographicComponent } from './pages/demographic/demographic.component';
import { TransplantComponent } from './pages/transplant/transplant.component';

const routes: Routes = [
  { path: 'transplant', component: TransplantComponent },
  { path: 'demographics', component: DemographicComponent },
  { path: '', redirectTo: 'transplant', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
