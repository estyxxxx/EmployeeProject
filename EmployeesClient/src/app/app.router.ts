import { Routes } from "@angular/router";
import { TableComponent } from "./table/table.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: TableComponent },
    { path: '**', component: NotFoundComponent }
];