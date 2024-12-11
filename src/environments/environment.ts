// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    APIUrl: "https://mtest.hha.com.sa/ords/hha/",
    tokenKey: 'token',
    logoUrl: './assets/layout/images/horizontal-logo.svg',
    loginAvatar: './assets/layout/images/illustration/doctors-bro.svg',
    EgyptNationalityId: 262,
    EncryptKey: 1203199320052021,
    FilesMainPath: "http://localhost/VerdexHrFiles/Files/",
    ReportsMainPath: "http://localhost/HrVerdexFileServer/ReportViewer?reportType=",
    EncryptIV: 1203199320052021,
    MailRegExp: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    NonSpacceRegExp: new RegExp(/^\S*$/),
    whatsApp: {
        serverUrl: 'http://localhost:4040',
        cookie_name: "connected_tenant",
        mediaPath: 'http://localhost/whatsapp_Uploads/uploads'
    },
    env: ''
}
