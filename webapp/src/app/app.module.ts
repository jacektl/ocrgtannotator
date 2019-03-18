import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './authentication/login/login.component';
import {LogoutComponent} from './authentication/logout/logout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatToolbarModule} from '@angular/material';
import {RouterModule, Routes} from '@angular/router';
import {ImprintComponent} from './imprint/imprint.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './authentication/jwt-interceptor';
import {ErrorInterceptor} from './authentication/error-inceptor';
import { EditorComponent } from './editor/editor.component';
import {SecuredImageComponent} from './common/secured-image/secured-image.component';
import {SecuredSvgImageComponent} from './common/secured-svg-image/secured-svg-image.component';
import { BreadcrumbComponent } from './editor/breadcrumb/breadcrumb.component';
import { TextEditorComponent } from './editor/line-editors/text-editor/text-editor.component';

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
    MatIconModule,
    MatSelectModule,
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
