import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainInPageComponent } from "./components/main-in-page/main-in-page.component";

const routes: Routes = [
    { path: "mainInBound", component: MainInPageComponent, title: "InBound" },
    {
        path: "mainInBound/:inboundId",
        component: MainInPageComponent,
        title: "InBound",
    },
    {
        path: "mainInBound/:inboundId/:email",
        component: MainInPageComponent,
        title: "InBound",
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InBoundRoutingModule {}
