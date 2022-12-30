import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { throwErrorAndLogout } from 'src/utils/permissions.utils';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private loginService: LoginServiceService) {}

  public isExpanded = false;

  public ROUTES_ADMIN = [
    {
      path: '/dynamicStatistics',
      title: 'Estadísticas dinámicas',
      icon: 'bar_chart',
    },
    { path: '/bulk', title: 'Cargas Masivas', icon: 'cloud_upload' },
    { path: '/users', title: 'Usuarios', icon: 'people' },
    { path: '/configuration', title: 'Configuración', icon: 'settings' },
    { path: '/logs', title: 'Seguimiento', icon: 'visibility' },
  ];

  public ROUTES_USER = [
    {
      path: '/dynamicStatistics',
      title: 'Estadísticas dinámicas',
      icon: 'bar_chart',
    },
  ];

  public menuItems: any = this.ROUTES_USER;

  ngOnInit(): void {
    this.getPermissions();
  }

  ngAfterViewInit() {
    this.getPermissions();
  }

  getPermissions() {
    let data = {
      token: localStorage.getItem('token'),
    };
    this.loginService.getPermissions(data).subscribe(
      (response: any) => {
        this.setGlobalErrorAndShowAvailableRoutes(response, data);
      },
      () => {
        const errorMessage =
          'Ocurrió un error al obtenerse los permisos del usuario en el aplicativo.';
        throwErrorAndLogout(data, errorMessage, this);
      }
    );
  }

  setGlobalErrorAndShowAvailableRoutes(response: any, data: any) {
    if (response.status == 200) {
      this.loginService.setGlobalRol(response.data['0']['key']);
      if (response.data['0']['key'] == 'ADMIN') {
        this.menuItems = this.ROUTES_ADMIN;
      } else {
        this.menuItems = this.ROUTES_USER;
      }
    } else {
      const errorMessage =
        'No fue posible obtenerse los permisos del usuario en el aplicativo.';
      throwErrorAndLogout(data, errorMessage, this);
    }
  }
}
