import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AddPostComponent } from './pages/add-post/add-post.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { PostComponent } from './shared/components/post/post.component';
import { DetailPostComponent } from './pages/detail-post/detail-post.component';
import { CommentComponent } from './shared/components/comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AddPostComponent,
    LoginPageComponent,
    NavbarComponent,
    RegisterPageComponent,
    PostComponent,
    DetailPostComponent,
    CommentComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
