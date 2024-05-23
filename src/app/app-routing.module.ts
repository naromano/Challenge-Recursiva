import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReaderComponent } from './components/reader/reader.component';
import { StepFourComponent } from './components/steps/step-four/step-four.component';
import { StepOneComponent } from './components/steps/step-one/step-one.component';
import { StepTwoComponent } from './components/steps/step-two/step-two.component';
import { StepThreeComponent } from './components/steps/step-three/step-three.component';
import { StepFiveComponent } from './components/steps/step-five/step-five.component';

const routes: Routes = [
  { path: '', component: ReaderComponent },
  { path: 'stepOne', component: StepOneComponent },
  { path: 'stepTwo', component: StepTwoComponent },
  { path: 'stepThree', component: StepThreeComponent },
  { path: 'stepFour', component: StepFourComponent },
  { path: 'stepFive', component: StepFiveComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
