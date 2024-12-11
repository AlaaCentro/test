
export const environment = {
    production: false,
    APIUrl: "https://mtest.hha.com.sa/ords/hha/",
    tokenKey: "token",
    logoUrl: "./assets/layout/images/horizontal-logo.svg",
    loginAvatar: "./assets/layout/images/illustration/doctors-bro.svg",
    EgyptNationalityId: 262,
    EncryptKey: 1203199320052021,
    FilesMainPath: "http://localhost/HrVerdexFileServer/HrVerdexFiles/",
    ReportsMainPath:
        "http://localhost/HrVerdexFileServer/ReportViewer?reportType=",
    EncryptIV: 1203199320052021,
    whatsAppDomain: "https://HrVerdex-pro.com/WhatsAppBot/",
    MailRegExp: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    NonSpacceRegExp: new RegExp(/^\S*$/),

};
