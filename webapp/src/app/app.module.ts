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
  MatInputModule, MatPaginatorModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
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
import { VirtualKeyboardComponent } from './editor/virtual-keyboard/virtual-keyboard.component';
import { TextViewComponent } from './editor/line-editor/single-line-editors/text-view/text-view.component';
import { SingleTypographyEditorComponent } from './editor/line-editor/single-line-editors/typography-editor/single-typography-editor.component';
import { SiblingSelectorComponent } from './editor/sibling-selector/sibling-selector.component';
import { SimpleTypographyEditorComponent } from './editor/line-editor/line-editors/simple-typography-editor/simple-typography-editor.component';
import { OcrEditorComponent } from './editor/line-editor/line-editors/ocr-editor/ocr-editor.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: '', component: EditorComponent },
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
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }  // Debugging only
    ),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class AppModule { }
