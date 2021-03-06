import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GraphQLModule} from './graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {MatButtonModule, MatChipsModule, MatDatepickerModule, MatMenuModule, MatNativeDateModule} from '@angular/material';
import {KeyComponent} from './key/key.component';
import {TodoComponent} from './todo/todo.component';
import {HomeComponent} from './home/home.component';
import {TodoService} from './services/todo-service';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    KeyComponent,
    TodoComponent,
    HomeComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        GraphQLModule,
        HttpClientModule,
        ApolloModule,
        HttpLinkModule,
        BrowserAnimationsModule,
        MaterialModule,
        MatButtonModule,
        MatMenuModule,
        MatChipsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        FormsModule,
        MatNativeDateModule
    ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: 'http://localhost:8080/graphql'
        })
      }
    },
    deps: [HttpLink]
  }, TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
