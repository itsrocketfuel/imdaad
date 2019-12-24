import {
  Routes
} from '@angular/router';

import {
  FullComponent
} from './layouts/full/full.component';
import {
  LoginComponent
} from './login/login.component';
import {
  LandingPageComponent
} from './landing-page/landing-page.component';
import {
  RegisterComponent
} from './register/register.component';

export const AppRoutes: Routes = [{
    path: '',
    component: FullComponent,
    children: [{
        path: '',
        redirectTo: '/starter',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren: './material-component/material.module#MaterialComponentsModule'
      },
      {
        path: 'starter',
        loadChildren: './starter/starter.module#StarterModule'
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    children: [{
        path: 'login',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadChildren: './material-component/material.module#MaterialComponentsModule'
      },
      {
        path: 'login',
        loadChildren: './starter/starter.module#StarterModule'
      }

    ]
  },
  {
    path: 'home',
    component: LandingPageComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];
