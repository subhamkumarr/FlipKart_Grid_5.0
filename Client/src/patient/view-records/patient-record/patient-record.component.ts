import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

type MedicationType = [
    {
        name: "";
        dose: "";
        frequency: "";
        nofDays: "";
        remarks: "";
    }
];

type PatientMedicalrecordType = {
    Diagnosis: "";
    Medication: MedicationType;
    ClinicalTest: [];
};

@Component({
    selector: "app-patient-record",
    templateUrl: "./patient-record.component.html",
    styleUrls: ["./patient-record.component.sass"],
})
export class PatientRecordComponent implements OnInit {
    @Input() PatientDetails: any = {};
    @Input() PatientRecords: any = {};
    @Output() saveRecord = new EventEmitter<any>();
    @Output() closeEdit = new EventEmitter<any>()
    model: any;

    Medication: any[] = [];
    ClinicalTest: any[] = [];

    med: any = {};
    clinic: any = {};

    LabFiles: any[] = [];

    constructor() {
        this.model = {};
    }

    ngOnInit(): void {
        console.log();
        this.model = this.PatientRecords.data || {};
        console.log(this.model);

        this.Medication = this.model.medication || [];
        this.ClinicalTest = this.model.tests || [];
        this.LabFiles = this.model.files || [];
    }

    onMedicinesSave() {
        this.Medication.push(this.med);
        this.med = {};
    }

    onTestSave() {
        this.ClinicalTest.push(this.clinic);
        this.clinic = {};
    }

    onPatientRecordSubmit() {
        this.model.medication = this.Medication;
        this.model.tests = this.ClinicalTest;
        this.model.files = this.LabFiles;

        console.log(this.model);
        this.saveRecord.emit(this.model);
        this.model = {};
        this.Medication = [];
        this.ClinicalTest = [];
    }

    onFileAdd(files: any) {
        if (this.LabFiles.length > 0) {

        }
        for (let i = 0; i < files.target.files.length; i++) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.LabFiles[this.LabFiles.length] = event.target.result;
            };
            reader.readAsDataURL(files.target.files[i]);
        }
    }

    onCloseEdit() {
        this.closeEdit.emit()
    }
}
