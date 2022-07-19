import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { TransplantComponent } from './pages/transplant/transplant.component';
import { DemographicComponent } from './pages/demographic/demographic.component';
import { SpacerDirective } from './shared/directives/spacer.directive';
import { WrapperComponent } from './shared/wrapper/wrapper.component';
import { LeftDirective } from './shared/directives/left.directive';
import { RightDirective } from './shared/directives/right.directive';
import { DynamicPipe } from './shared/pipes/dynamic.pipe';
import { DatePipe } from '@angular/common';
import { FileFormComponent } from './pages/demographic/file-form/file-form.component';
import { DocumentModalComponent } from './shared/document-modal/document-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TransplantComponent,
    DemographicComponent,
    SpacerDirective,
    WrapperComponent,
    LeftDirective,
    RightDirective,
    DynamicPipe,
    FileFormComponent,
    DocumentModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
