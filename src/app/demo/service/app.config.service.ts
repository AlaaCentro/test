import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AppConfig } from "../domain/appconfig";

@Injectable()
export class ConfigService {
    config: AppConfig = {
        theme: "",
        dark: false,
        inputStyle: "",
        ripple: true,
        scale: 14,
    };

    private configUpdate = new Subject<AppConfig>();
    configUpdate$ = this.configUpdate.asObservable();

    updateConfig(config: AppConfig) {
        this.config = config;
        this.configUpdate.next(config);
    }

    getConfig() {
        return this.config;
    }
}
