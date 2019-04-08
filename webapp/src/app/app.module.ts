import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './authentication/login/login.component';
import {LogoutComponent} from './authentication/logout/logout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule, MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule, MatPaginatorModule,
  MatSelectModule,
  MatSidenavModule, MatSlideToggleModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {RouterModule, Routes} from '@angular/router';
import {ImprintComponent} from './imprint/imprint.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './authentication/jwt-interceptor';
import {ErrorInterceptor} from './authentication/error-inceptor';
import { EditorComponent } from './editor/editor.component';
import {SecuredImageComponent} from './common/secured-image/secured-image.component';
import {SecuredSvgImageComponent} from './common/secured-svg-image/secured-svg-image.component';
import { BreadcrumbComponent } from './editor/breadcrumb/breadcrumb.component';
import { TextEditorComponent } from './editor/line-editor/single-line-editors/text-editor/text-editor.component';
import { LineEditorComponent } from './editor/line-editor/line-editor.component';
import { TextViewComponent } from './editor/line-editor/single-line-editors/text-view/text-view.component';
import { SingleTypographyEditorComponent } from './editor/line-editor/single-line-editors/typography-editor/single-typography-editor.component';
import { SiblingSelectorComponent } from './editor/sibling-selector/sibling-selector.component';
import { SimpleTypographyEditorComponent } from './editor/line-editor/line-editors/simple-typography-editor/simple-typography-editor.component';
import { OcrEditorComponent } from './editor/line-editor/line-editors/ocr-editor/ocr-editor.component';
import {VirtualKeyboardComponent} from './common/virtual-keyboard/virtual-keyboard.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {subdir, url} from './settings';
import { SubdirUrlPipe } from './subdir-url.pipe';
import { TypographyViewComponent } from './editor/line-editor/single-line-editors/typography-view/typography-view.component';
import { CompareViewComponent } from './editor/line-editor/single-line-editors/compare-view/compare-view.component';
import { EditorCardComponent } from './editor/line-editor/editor-card/editor-card.component';

const appRoutes: Routes = [
  { path: url('login'), component: LoginComponent },
  { path: url('logout'), component: LogoutComponent },
  { path: url('imprint'), component: ImprintComponent },
  { path: url(''), component: EditorComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    ImprintComponent,
    EditorComponent,
    SecuredImageComponent,
    SecuredSvgImageComponent,
    BreadcrumbComponent,
    TextEditorComponent,
    LineEditorComponent,
    VirtualKeyboardComponent,
    TextViewComponent,
    SingleTypographyEditorComponent,
    SiblingSelectorComponent,
    SimpleTypographyEditorComponent,
    OcrEditorComponent,
    SubdirUrlPipe,
    TypographyViewComponent,
    CompareViewComponent,
    EditorCardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatTooltipModule,
    DragDropModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}  // Debugging only
    ),
    MatSlideToggleModule,
    MatListModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class AppModule { }
