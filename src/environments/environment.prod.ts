
export const environment = {
    production: true,
    APIUrl: "https://mtest.hha.com.sa/ords/hha/",
    tokenKey: "token",
    logoUrl: "./assets/layout/images/horizontal-logo.svg",
    loginAvatar: "./assets/layout/images/illustration/doctors-bro.svg",
    EgyptNationalityId: 262,
    EncryptKey: 1203199320052021,
    FilesMainPath: "https://HrVerdex-pro.com/HrVerdexFileServer/HrVerdexFiles/",
    ReportsMainPath:
        "https://HrVerdex-pro.com/HrVerdexFileServer/ReportViewer?reportType=",
    EncryptIV: 1203199320052021,
    whatsAppDomain: "https://HrVerdex-pro.com/WhatsAppBot/",
    MailRegExp: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    NonSpacceRegExp: new RegExp(/^\S*$/),
    whatsApp: {
        serverUrl: "https://HrVerdex-pro.com",
        cookie_name: "connected_tenant",
        mediaPath: 'https://HrVerdex-pro.com/whatsapp_Server/uploads',
    },
    env: 'prod'
};
