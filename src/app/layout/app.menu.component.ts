import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Operacional',
                items: [
                    { label: 'Variedad', icon: 'pi pi-fw pi-slack', routerLink: ['/'] },
                    { label: 'Color', icon: 'pi pi-fw pi-circle-fill', routerLink: ['/'] }
                
                ]
            },
            {
                label: 'Gerencial',
                items: [
                    { label: 'No disponible', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                    { label: 'No disponible', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                ]
            }
        ];
    }
}
