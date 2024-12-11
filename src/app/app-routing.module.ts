import { NgModule } from "@angular/core";
import { DashboardDemoComponent } from "./demo/view/dashboarddemo.component";
import { AppMainComponent } from "./Shared/components/app.main.component";
import { RouterModule } from "@angular/router";
import { LoginBackPreventGuard } from "./Shared/guards/login-back-prevent.guard";
import { AuthGuard } from "./Shared/guards/auth-guard.service";

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: "",
                    loadChildren: () =>
                        import("./modules/auth/auth.module").then(
                            (m) => m.AuthModule
                        ),
                },
                {
                    path: "inbound",
                    component: AppMainComponent,
                    canActivate: [AuthGuard],
                    // canDeactivate:[LoginBackPreventGuard],
                    children: [
                        {
                            path: "",
                            loadChildren: () =>
                                import(
                                    "./modules/in-bound/in-bound.module"
                                ).then((m) => m.InBoundModule),
                        },
                    ],
                },
                // {
                //     path: "home",
                //     component: AppMainComponent,
                //     canActivate: [AuthGuard],
                //     children: [
                //         {
                //             path: "",
                //             component: DashboardDemoComponent,
                //             title: "HR : Home",
                //         },
                //     ],
                // },
                { path: "**", redirectTo: "/notfound", title: "HR : NotFound" },
            ],
            { scrollPositionRestoration: "enabled" }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
