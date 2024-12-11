import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from "@angular/core";
import { LangEnum } from "../../enums/lang-enum";
import { ActionStatusEnum } from "../../enums/action-status-enum";
import { ActionCustomerEnum } from "../../enums/action-customer-enum";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { MessageService } from "primeng/api";
import { ConfigService } from "src/app/demo/service/app.config.service";
import { ActionService } from "../../services/action.service";
import { PermissionService } from "src/app/modules/auth/services/permission.service";
import { PermissionEnum } from "../../enums/permission-enum";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-action",
    templateUrl: "./action.component.html",
    styleUrls: ["./action.component.scss"],
})
export class ActionComponent implements OnInit, OnChanges {
    @Input() receivedData: any;
    langList: any[];
    actionStatusList: any[];
    actionCustomerList: any[];
    selectedStatus: number;
    selectedCustomer: number;
    form: FormGroup;
    ministryList: any[] = [];
    crmActionList: any[] = [];
    crmMinList: any[] = [];
    SmsList: any[] = [];
    visibleCrmAct = false;
    visibleCrmMin = false;
    visibleSms = false;
    hasPermission: boolean = false;
    mobileNum: any;

    constructor(
        private fb: FormBuilder,
        public configService: ConfigService,
        private service: ActionService,
        private messageService: MessageService,
        private loader: NgxUiLoaderService,
        public translate: TranslateService,
        private datePipe: DatePipe,
        private router: ActivatedRoute,
        public permission: PermissionService
    ) {
        this.langList = Object.keys(LangEnum)
            .map((key) => ({
                label: LangEnum[key],
                value: Number(key),
            }))
            .filter((x) => !isNaN(Number(x.value)));

        this.actionStatusList = Object.keys(ActionStatusEnum)
            .map((key) => ({
                label: ActionStatusEnum[key],
                value: Number(key),
            }))
            .filter((x) => !isNaN(Number(x.value)));

        this.actionCustomerList = Object.keys(ActionCustomerEnum)
            .map((key) => ({
                label: ActionCustomerEnum[key],
                value: Number(key),
            }))
            .filter((x) => !isNaN(Number(x.value)));
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["receivedData"] && changes["receivedData"].currentValue) {
            this.populateForm(changes["receivedData"].currentValue);
        }
    }

    ngOnInit(): void {
        this.initForm();
        if (this.receivedData) {
            this.populateForm(this.receivedData);
        }
        this.router.paramMap.subscribe((params) => {
            this.messageService.clear();
            const inboundId = params.get("inboundId");
            if (inboundId) {
                this.mobileNum == inboundId;
            }
        });
    }

    populateForm(item: any) {
        this.form.patchValue({
            act_date: item.act_date ? new Date(item.act_date) : "",
            id: item.id,
            eng_action_comments: item.eng_action_comments,
            crm_action_date: item.crm_action_date
                ? new Date(item.crm_action_date)
                : "",
            crm_followup_date: item.crm_followup_date
                ? new Date(item.crm_followup_date)
                : "",
            crm_ministry_reason: item.crm_ministry_reason,
            eng_crm_follow_comment: item.eng_crm_follow_comment,
            close_date: item.close_date ? new Date(item.close_date) : "",
            eng_final_remarks: item.eng_final_remarks,
            next_followup_date: item.next_followup_date
                ? new Date(item.next_followup_date)
                : "",
            redak_close_remarks: item.redak_close_remarks,
        });
    }

    initForm() {
        this.form = this.fb.group({
            act_date: [{ value: "", disabled: true }],
            id: "",
            eng_action_comments: "",
            crm_ministry_reason: [
                {
                    value: "",
                    disabled: !this.permission.hasPermission(
                        this.permissions.crm_action_update
                    ),
                },
            ],
            crm_followup_date: [
                {
                    value: "",
                    disabled: !this.permission.hasPermission(
                        this.permissions.crm_action_update
                    ),
                },
            ],
            crm_action_date: [
                {
                    value: "",
                    disabled: !this.permission.hasPermission(
                        this.permissions.crm_action_update
                    ),
                },
            ],
            eng_crm_follow_comment: "",
            close_date: [{ value: "", disabled: true }],
            eng_final_remarks: [{ value: "", disabled: true }],
            next_followup_date: [{ value: "", disabled: true }],
            redak_close_remarks: [{ value: "", disabled: true }],
        });
    }

    get opnionVal() {
        return ActionCustomerEnum;
    }

    sendSMS() {
        this.loader.start();
        let lang = this.translate.currentLang;
        if (this.receivedData.id != null) {
            let data = {
                mobileno: this.receivedData?.mobile,
                vid: this.receivedData.id,
                usercode: sessionStorage.getItem("userCode") ?? null,
                smsText:
                    lang == "en"
                        ? `Dear customer,
                                        thank you for contacting us and we would like to inform you that your Transaction #${this.receivedData.id}
                                        With our regards from HAJI HUSEIN ALI0REZA & Co.
                                        Ltd Customer Relations Management`
                        : `عزيزي العميل،
                            نشكركم على تواصلكم معنا، ويسعدنا إبلاغكم بأن معاملتكم رقم #${this.receivedData.id} قد تم تسجيلها بنجاح.
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
                        detail: this.translate.instant("messages.sendSuc"),
                    });
                    this.loader.stop();
                },
            });
        } else {
            this.messageService.add({
                severity: "warn",
                summary: "warn",
                detail: "No Voice ID Selected...!",
            });
            this.loader.stop();
        }
        this.loader.stop();
    }

    GetCrmMinistryList(query) {
        this.loader.start();
        this.service.GetCrmMinistryList().subscribe({
            next: (res) => {
                if (res.succeeded === false) {
                    this.messageService.add({
                        severity: "error",
                        summary: "Error",
                        detail: res.message,
                    });
                    this.loader.stop();
                    this.ministryList = [];
                    return;
                }
                const currentLang = this.translate.currentLang;
                this.ministryList = res.items.map((item) => ({
                    id: item.minor_code,
                    name: currentLang === "ar" ? item.ara_desc : item.eng_desc,
                }));
                this.loader.stop();
            },
        });
        this.loader.stop();
    }

    showSMSHistory() {
        this.loader.start();
        this.visibleCrmMin = false;
        this.visibleCrmAct = false;
        if (
            this.receivedData?.mobile != null ||
            this.mobileNum ||
            this.receivedData?.id != null
        ) {
            this.service
                .GetSMSHistory(
                    this.receivedData?.mobile,
                    this.receivedData?.id ?? null
                )
                .subscribe({
                    next: (res) => {
                        if (res.succeeded === false) {
                            this.messageService.add({
                                severity: "error",
                                summary: "Error",
                                detail: res.message,
                            });
                            this.loader.stop();
                            this.SmsList = [];
                            return;
                        }
                        if (res.items.length > 0) {
                            this.SmsList = res.items;
                            this.visibleSms = true;
                        }
                        this.loader.stop();
                    },
                });
        } else {
            this.messageService.add({
                severity: "warn",
                summary: "warn",
                detail: "No Mobile...!",
            });
            this.loader.stop();
        }
        this.loader.stop();
    }

    GetCrmActionHis() {
        this.loader.start();
        this.visibleCrmMin = false;
        this.visibleSms = false;
        if (this.receivedData?.id != null) {
            this.service.GetActionHistory(this.receivedData?.id).subscribe({
                next: (res) => {
                    if (res.succeeded === false) {
                        this.messageService.add({
                            severity: "error",
                            summary: "Error",
                            detail: res.message,
                        });
                        this.loader.stop();
                        this.crmActionList = [];
                        return;
                    }
                    const currentLang = this.translate.currentLang;
                    this.crmActionList = res.items;
                    this.visibleCrmAct = true;
                    this.loader.stop();
                },
            });
        } else {
            this.messageService.add({
                severity: "warn",
                summary: "warn",
                detail: "No Voice ID Selected...!",
            });
            this.loader.stop();
        }
        this.loader.stop();
    }

    GetCrmMinistryHis() {
        this.loader.start();
        this.visibleCrmAct = false;
        this.visibleSms = false;
        if (this.receivedData?.id != null) {
            this.service.GetMinistryHistory(this.receivedData?.id).subscribe({
                next: (res) => {
                    if (res.succeeded === false) {
                        this.messageService.add({
                            severity: "error",
                            summary: "Error",
                            detail: res.message,
                        });
                        this.loader.stop();
                        this.crmMinList = [];
                        return;
                    }
                    this.crmMinList = res.items;
                    this.visibleCrmMin = true;
                    this.loader.stop();
                },
            });
        } else {
            this.messageService.add({
                severity: "warn",
                summary: "warn",
                detail: "No Voice ID Selected...!",
            });
            this.loader.stop();
        }
        this.loader.stop();
    }

    get permissions() {
        return PermissionEnum;
    }
}
