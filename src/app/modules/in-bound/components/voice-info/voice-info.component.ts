import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from "@angular/core";
import { MessageService, SelectItem } from "primeng/api";
import { LogTypeEnum } from "../../enums/log-type-enum";
import { VoiceInfoService } from "../../services/voice-info.service";
import { TranslateService } from "@ngx-translate/core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ConfigService } from "src/app/demo/service/app.config.service";
import { LangEnum } from "../../enums/lang-enum";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { StatusEnum } from "../../enums/StatusEnum";
import { ValidationInputService } from "src/app/Shared/services/validation-input.service";
import { ActionComponent } from "../action/action.component";
import { PermissionService } from "src/app/modules/auth/services/permission.service";
import { PermissionEnum } from "../../enums/permission-enum";
import { ActionService } from "../../services/action.service";

@Component({
    selector: "app-voice-info",
    templateUrl: "./voice-info.component.html",
    styleUrls: ["./voice-info.component.scss"],
})
export class VoiceInfoComponent implements OnInit, OnChanges {
    @Output() dataEmitter = new EventEmitter();
    @Input() actionRef!: ActionComponent;
    form: FormGroup;
    langList: any[];
    statusList: any[];
    logTypeList: any[] = [];
    chossenList: any;
    sourceList: any = [];
    type: any;
    selectedItems: any[] = [];
    selectedLogs: any[] = [];
    @Input() searched: any;
    infoData: any;
    randomId = Math.floor(10000000 + Math.random() * 90000000);
    now = new Date();
    formSubmitted = false;
    id: any;
    voiceId: any;
    selectedSource: any;
    numberOnly = this.validationService.numberOnly;
    sysDate: any = `${this.now.getFullYear()}-${(this.now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${this.now
        .getDate()
        .toString()
        .padStart(2, "0")} ${this.now
        .getHours()
        .toString()
        .padStart(2, "0")}:${this.now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

    constructor(
        public configService: ConfigService,
        private voiceService: VoiceInfoService,
        private messageService: MessageService,
        private service: ActionService,
        private loader: NgxUiLoaderService,
        public translate: TranslateService,
        private fb: FormBuilder,
        private datePipe: DatePipe,
        private validationService: ValidationInputService,
        public permission: PermissionService
    ) {
        this.langList = Object.keys(LangEnum)
            .map((key) => ({
                label: LangEnum[key],
                value: Number(key),
            }))
            .filter((x) => !isNaN(Number(x.value)));
        this.statusList = Object.keys(StatusEnum)
            .map((key) => ({
                label: StatusEnum[key],
                value: Number(key),
            }))
            .filter((x) => !isNaN(Number(x.value)));
    }

    ngOnInit() {
        const lang = this.translate.currentLang;
        this.initForm();

        if (this.searched) {
            this.onSearch(this.searched);
        }
        this.translate.onLangChange.subscribe(() => {
            this.updateLogTypeList();
        });
        this.form.get("sms_lang").setValue(LangEnum.Arabic);
        this.form.get("cust_lang").setValue(LangEnum.Arabic);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["searched"] && changes["searched"].currentValue) {
            this.onSearch(this.searched);
        }
    }

    initForm() {
        this.form = this.fb.group({
            // total_voice: [""],
            source: [""],
            status: [null],
            ref_no: [""],
            franchise_code: [""],
            // ministry_report_date: [""],
            ministry_report_date: [
                {
                    value: "",
                    disabled: !this.permission.hasPermission(
                        this.permissions.crm_action_update
                    ),
                },
            ],
            comp_type: [""],
            sysDate: [""],
            job_card: [""],
            job_date: [""],
            mobile: [""],
            appt_date: [""],
            tel: [""],
            service_contract_id: [""],
            contract_start_date: [""],
            contract_end_date: [""],
            franchise_eng: [""],
            franchise_arb: [""],
            cust_name_arb: [""],
            cust_name_eng: [""],
            cust_code: [""],
            warranty_until: [""],
            prom_date: [""],
            chassis: [""],
            plate_no: [""],
            model_year: [""],
            mileage: [""],
            model_desc: [""],
            model_code: [""],
            email: [""],
            receive_date: [""],
            assign_branch: [""],
            branch_desc_eng: [""],
            branch_desc_arb: [""],
            assign_dept: [""],
            eng_assign_comments: [""],
            eng_comp: [""],
            department_desc_arb: [""],
            department_desc_eng: [""],
            sms_lang: [""],
            cust_lang: [""],
            company_arb: [""],
            company_eng: [""],
            cust_note: [""],
        });
    }

    searchVoice() {
        const currentLang = this.translate.currentLang;
        this.messageService.clear("c");
        if (this.voiceId != null || this.voiceId == "") {
            this.loader.start();
            this.voiceService.GetInboundDataByVoiceID(this.voiceId).subscribe({
                next: (res) => {
                    this.loader.stop();
                    if (res.succeeded === false) {
                        this.messageService.add({
                            severity: "error",
                            summary: "Error",
                            detail: res.message,
                        });
                        return;
                    }
                    this.GetlogTypeList("");
                    this.GetSourceList("");
                    if (res.items.length === 0) {
                        this.infoData = { items: [{}] };
                        this.messageService.add({
                            severity: "info",
                            summary: "Info",
                            detail: this.translate.instant(
                                "common.noDataAvailable"
                            ),
                        });
                        this.dataEmitter.emit(this.infoData.items[0]);
                    } else {
                        this.infoData = res;
                        this.id = this.voiceId;
                        this.dataEmitter.emit(this.infoData.items[0]);
                    }
                    this.disabledForm();
                    this.populateForm(this.infoData.items[0]);
                },
                error: (err) => {
                    this.loader.stop();
                    this.messageService.add({
                        severity: "error",
                        summary: "Error",
                        detail: "An error occurred while fetching data.",
                    });
                    console.error(err);
                },
            });
        }
    }

    disabledForm() {
        this.form.get("source").disable();
        this.form.get("cust_lang").disable();
        this.form.get("sms_lang").disable();
    }

    onSearch(searched: any) {
        this.loader.start();
        this.voiceService.GetInboundDataByJob(searched).subscribe({
            next: (res) => {
                this.loader.stop();
                if (res.succeeded === false) {
                    this.messageService.add({
                        severity: "error",
                        summary: "Error",
                        detail: res.message,
                    });
                    return;
                }

                if (res.items.length === 0) {
                    this.infoData = { items: [{}] };
                } else {
                    this.infoData = res;
                }
                this.populateForm(this.infoData.items[0]);
                this.dataEmitter.emit(this.infoData.items[0]);
            },
            error: (err) => {
                this.loader.stop();
                this.messageService.add({
                    severity: "error",
                    summary: "Error",
                    detail: "An error occurred while fetching data.",
                });
                console.error(err);
            },
        });
    }

    populateForm(item: any) {
        this.form.patchValue({
            source: item.source || null,
            job_card: item.job_card || "",
            job_date: item.job_date || "",
            sysDate: this.sysDate || "",
            mobile: item.mobile || "",
            appt_date: item.appt_date || "",
            tel: item.tel || "",
            service_contract_id: item.service_contract_id || "",
            contract_start_date: item.contract_start_date || "",
            contract_end_date: item.contract_end_date || "",
            franchise_eng: item.franchise_eng || "",
            franchise_arb: item.franchise_arb || "",
            cust_name_arb: item.cust_name_arb || "",
            cust_name_eng: item.cust_name_eng || "",
            cust_code: item.cust_code || "",
            warranty_until: item.warranty_until || "",
            prom_date: item.prom_date || "",
            chassis: item.chassis || "",
            plate_no: item.plate_no || "",
            model_year: item.model_year || "",
            mileage: item.mileage || "",
            model_desc: item.model_desc || "",
            model_code: item.model_code || "",
            email: item.email || "",
            receive_date: item.receive_date || "",
            assign_branch: item.assign_branch || "",
            branch_desc_eng: item.branch_desc_eng || "",
            branch_desc_arb: item.branch_desc_arb || "",
            assign_dept: item.assign_dept || "",
            franchise_code: item.franchise_code || "",
            department_desc_eng: item.department_desc_eng || "",
            department_desc_arb: item.department_desc_arb || "",
            company_eng: item.company_eng || "",
            company_arb: item.company_arb || "",
            ref_no: item.ref_no || "",
            ministry_report_date: item.ministry_report_date
                ? new Date(item.ministry_report_date)
                : "",
            eng_assign_comments: item.eng_assign_comments || "",
            cust_note: item.cust_note || "",
            comp_type: item.comp_type || "",
            status:
                item.status === "C" ? StatusEnum.Closed : StatusEnum.Pending,
            cust_lang:
                item.cust_lang === null
                    ? LangEnum.Other
                    : item.cust_lang === "E"
                    ? LangEnum.English
                    : LangEnum.Arabic,
            sms_lang:
                item.cust_lang === null
                    ? LangEnum.Other
                    : item.sms_lang === "E"
                    ? LangEnum.English
                    : LangEnum.Arabic,
        });
        this.selectedLogs = item.eng_comp || "";
        this.selectedSource = item.source;
    }

    GetlogTypeList(e) {
        this.voiceService.GetCustomerVoiceList().subscribe({
            next: (res) => {
                if (res.succeeded === false) {
                    this.messageService.add({
                        severity: "error",
                        summary: "Error",
                        detail: res.message,
                    });
                    this.loader.stop();
                    this.logTypeList = [];
                    return;
                }
                const currentLang = this.translate.currentLang;
                this.logTypeList = res.items.map((item) => ({
                    id: item.minor_code,
                    name: currentLang === "ar" ? item.ara_desc : item.eng_desc,
                }));
                this.loader.stop();
            },
        });
    }

    updateLogTypeList() {
        const currentLang = this.translate.currentLang;
        this.logTypeList = this.logTypeList.map((item) => ({
            id: item.id,
            name: currentLang === "ar" ? item.ara_desc : item.eng_desc,
        }));
    }

    clearlogType(e) {
        this.chossenList = [];
        this.type = null;
        this.selectedItems = [];
        this.selectedLogs = [];
    }

    onLogTypeSelect(e) {}

    GetSourceList(query) {
        this.voiceService.GetSourceList().subscribe({
            next: (res) => {
                if (res.succeeded === false) {
                    this.messageService.add({
                        severity: "error",
                        summary: "Error",
                        detail: res.message,
                    });
                    this.loader.stop();
                    this.logTypeList = [];
                    return;
                }
                const currentLang = this.translate.currentLang;
                this.sourceList = res.items.map((item) => ({
                    id: item.minor_code,
                    name: currentLang === "ar" ? item.ara_desc : item.eng_desc,
                }));
                this.loader.stop();
            },
        });
    }

    clearSource() {}

    GetComplainList(e) {
        if (e != null) {
            this.voiceService.GetComplaintList(e).subscribe({
                next: (res) => {
                    if (res.succeeded === false) {
                        this.messageService.add({
                            severity: "error",
                            summary: "Error",
                            detail: res.message,
                        });
                        this.loader.stop();
                        this.chossenList = [];
                        return;
                    }
                    const currentLang = this.translate.currentLang;
                    this.chossenList = res.items.map((item) => ({
                        id: item.minor_code,
                        name:
                            currentLang === "ar"
                                ? item.desc_arb
                                : item.desc_eng,
                    }));
                    this.loader.stop();
                },
            });
        } else {
            this.messageService.add({
                severity: "warn",
                summary: "warn",
                detail: this.translate.instant("voiceInfo.pleaseSelect"),
            });
        }
    }

    makeCall(e) {
        if (e) {
            window.open(`tel:${e}`, "_self");
        }
    }

    changeLogs(e) {
        const selectedLogs = e.value;
        const selectedNames = selectedLogs.map((log) => log.name);
        this.selectedLogs = selectedNames.join(" , ");
    }

    submit() {
        this.formSubmitted = true;
        if (this.form.invalid) {
            return;
        }
        this.loader.start();

        var itm = this.form.value;
        var actionForm = this.actionRef.form.value;
        let lang = this.translate.currentLang;

        if (itm.source != null) {
            itm.source = itm.source;
        }
        if (itm.comp_type != null) {
            itm.comp_type = itm.comp_type.id;
        }
        if (itm.cust_lang != null) {
            switch (itm.cust_lang) {
                case LangEnum.Arabic:
                    itm.cust_lang = "Ar";
                    break;
                case LangEnum.English:
                    itm.cust_lang = "En";
                    break;
                default:
                    itm.cust_lang = "null";
                    break;
            }
        }

        // newObject
        const newObject: any = {
            id: this.id,
            source: itm.source,
            ref_no: itm.ref_no,
            crt_by: itm.crt_by,
            ministry_report_date: this.datePipe.transform(
                itm.ministry_report_date,
                "dd-MMM-yyyy HH:mm:ss"
            ),
            job_card: itm.job_card,
            job_date: this.datePipe.transform(
                itm.job_date,
                "dd-MMM-yyyy HH:mm:ss"
            ),
            prom_date: this.datePipe.transform(
                itm.prom_date,
                "dd-MMM-yyyy HH:mm:ss"
            ),
            appt_date: this.datePipe.transform(
                itm.appt_date,
                "dd-MMM-yyyy HH:mm:ss"
            ),
            service_contract_id: itm.service_contract_id,
            contract_start_date: this.datePipe.transform(
                itm.contract_start_date,
                "dd-MMM-yyyy HH:mm:ss"
            ),
            contract_end_date: this.datePipe.transform(
                itm.contract_end_date,
                "dd-MMM-yyyy HH:mm:ss"
            ),
            warranty_until: this.datePipe.transform(
                itm.warranty_until,
                "dd-MMM-yyyy HH:mm:ss"
            ),
            invoice_number: itm.invoice_number,
            mobile: itm.mobile,
            tel: itm.tel,
            cust_code: itm.cust_code,
            cust_name_eng: itm.cust_name_eng,
            cust_name_arb: itm.cust_name_arb,
            company_eng: itm.company_eng,
            company_arb: itm.company_arb,
            chassis: itm.chassis,
            plate_no: itm.plate_no,
            model_year: itm.model_year,
            mileage: itm.mileage,
            model_code: itm.model_code,
            email: itm.email,
            receive_date: itm.receive_date,
            comp_type: itm.comp_type,
            eng_comp: this.selectedLogs.length > 0 ? this.selectedLogs : "",
            assign_branch: itm.assign_branch,
            assign_dept: itm.assign_dept,
            eng_assign_comments: itm.eng_assign_comments,
            franchise_code: itm.franchise_code,
            sms_lang:
                itm.sms_lang != null
                    ? itm.sms_lang == LangEnum.Arabic
                        ? "A"
                        : "E"
                    : null,
            cust_lang:
                itm.cust_lang != null
                    ? itm.cust_lang == LangEnum.Arabic
                        ? "A"
                        : "E"
                    : null,
            cust_note: itm.cust_note,
        };
        if (this.id) {
            newObject.id = Number(this.id);
            newObject.crm_action_date = actionForm.crm_action_date
                ? new Date(actionForm.crm_action_date)
                : null;
            newObject.crm_followup_date = actionForm.crm_followup_date
                ? new Date(actionForm.crm_followup_date)
                : null;
            newObject.eng_crm_follow_comment =
                actionForm.eng_crm_follow_comment || "";
            newObject.crm_ministry_reason = actionForm.crm_ministry_reason;

            // Update call
            this.voiceService.updateInbound(newObject).subscribe({
                next: (res) => {
                    if (res.succeeded === false) {
                        this.messageService.add({
                            severity: "error",
                            summary: "Error",
                            detail: res.message,
                        });
                        this.loader.stop();
                        return;
                    }
                    this.messageService.add({
                        severity: "success",
                        summary: "success",
                        detail: this.translate.instant(
                            "messages.Updatesuccess"
                        ),
                    });
                    this.resetFormState();
                },
                error: () => this.loader.stop(),
            });
        } else {
            // Create call
            this.voiceService.createInbound(newObject).subscribe({
                next: (res) => {
                    if (res.status_desc !== "success!") {
                        this.messageService.add({
                            severity: "error",
                            summary: "Error",
                            detail: res.message,
                        });
                        this.loader.stop();
                        return;
                    }
                    this.messageService.add({
                        key: "cc",
                        severity: "success",
                        summary: "success",
                        detail: this.translate.instant("messages.savedsuccess"),
                        data: { id: res.vid },
                    });
                    if (res.vid != null) {
                        let data = {
                            mobileno: newObject?.mobile,
                            vid: res.vid,
                            usercode:
                                sessionStorage.getItem("userCode") ?? null,
                            smsText:
                                lang == "en"
                                    ? `Dear customer,
                                                    thank you for contacting us and we would like to inform you that your Transaction #${res.id}
                                                    With our regards from HAJI HUSEIN ALI0REZA & Co.
                                                    Ltd Customer Relations Management`
                                    : `عزيزي العميل،
                                        نشكركم على تواصلكم معنا، ويسعدنا إبلاغكم بأن معاملتكم رقم #${res.id} قد تم تسجيلها بنجاح.
                                        مع أطيب التحيات من شركة حاج حسين علي رضا وشركاه المحدودة - إدارة علاقات العملاء`,
                        };
                        this.service.sendSMS(data).subscribe({
                            next: (res) => {
                                if (res.status === false) {
                                    this.messageService.add({
                                        severity: "error",
                                        summary: "Error",
                                        detail: res.message,
                                    });
                                    this.loader.stop();
                                    return;
                                }
                                this.messageService.add({
                                    severity: "success",
                                    summary: "success",
                                    detail: this.translate.instant(
                                        "messages.sendSuc"
                                    ),
                                });
                                this.loader.stop();
                            },
                        });
                    }
                    this.resetFormState();
                },
                error: () => this.loader.stop(),
            });
        }
    }

    resetFormState() {
        this.loader.stop();
        this.selectedLogs = [];
        this.selectedItems = [];
        this.voiceId = null;
        this.messageService.clear("c");
        this.initForm();
    }

    clearList() {
        this.selectedLogs = [];
    }

    get permissions() {
        return PermissionEnum;
    }
}
