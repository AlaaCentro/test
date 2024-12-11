
export const environment = {
    production: false,
    // APIUrl: "http://localhost:47357/",
    // APIUrl: "https://mobileapps.hha.com.sa/ords/hhaapiuat2/",
    APIUrl: "https://mtest.hha.com.sa/ords/hha/",
    tokenKey: "token",
    logoUrl: "./assets/layout/images/horizontal-logo.svg",
    loginAvatar: "./assets/layout/images/illustration/doctors-bro.svg",
    EgyptNationalityId: 262,
    EncryptKey: 1203199320052021,
    EncryptIV: 1203199320052021,
    // FilesMainPath: "http://localhost/HrVerdexFileServer/Files/",
    FilesMainPath: "http://localhost/VerdexHrFiles/Files/",
    ReportsMainPath: "https://localhost:44385/ReportViewer?reportType=",
    whatsAppDomain: "https://HrVerdex-pro.com/WhatsAppBot/",
    MailRegExp: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    NonSpacceRegExp: new RegExp(/^\S*$/),
    whatsApp: {
        serverUrl: "http://localhost:4040",
        cookie_name: "connected_tenant",
        mediaPath: "http://localhost/whatsapp_Uploads/uploads",
    },
    env: 'local'
};
