import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { TabHeadingDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { IProperrtyBase } from 'src/app/model/ipropertybase';
import { IfStmt } from '@angular/compiler';
import { AlertyfyService } from 'src/app/services/alertyfy.service';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  //@ViewChild('Form') addPropertyForm: NgForm;
  @ViewChild('formTabs') formTabs?: TabsetComponent;

  addPropertyForm: FormGroup;
  nextClicked: boolean;
  property = new Property();

  propertyType: Array<string> = ['House', 'Apartment', 'Duplex'];
  furnishType: Array<string> = ['Fully', 'Semi', 'Unfurnished'];
  mainEntrance: Array<string> = ['East', 'West', 'North', 'South'];
  cityList: any[];

  propertyView: IProperrtyBase = {
    Id: null,
    Name: '',
    SellRent: null,
    Price: null,
    PType: null,
    FType: null,
    BHK: null,
    BuiltArea: null,
    City: '',
    RTM: null,
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertyfy: AlertyfyService,
    private housingService: HousingService
  ) {}

  ngOnInit() {
    this.CreateAddPropertyForm();
    this.housingService.getAllCitys().subscribe((data) => {
      this.cityList = data;
      console.log(data);
    });
  }

  CreateAddPropertyForm() {
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: ['1', Validators.required],
        PType: [null, Validators.required],
        FType: [null],
        Name: [null, Validators.required],
        BHK: [null],
        City: [null, Validators.required],
      }),
      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        Maintenance: [null],
        Security: [null],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null],
      }),
      AddressInfo: this.fb.group({
        Floor: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null],
      }),
      OtherDetailsInfo: this.fb.group({
        RTM: [null, Validators.required],
        Posession: [null],
        AOP: [null],
        FloorNo: [null],
        TotalFloor: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [''],
      }),
      PhotoInfo: this.fb.group({}),
    });
  }

  //----------------------
  // Getter Methods
  //----------------------

  //#region <FormGroups>
  get BasicInfo() {
    return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
  }
  get PriceInfo() {
    return this.addPropertyForm.controls['PriceInfo'] as FormGroup;
  }
  get AddressInfo() {
    return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
  }
  get OtherDetailsInfo() {
    return this.addPropertyForm.controls['OtherDetailsInfo'] as FormGroup;
  }
  get PhotoInfo() {
    return this.addPropertyForm.controls['PhotoInfo'] as FormGroup;
  }
  //#endregion

  //#region  <FormControlls>
  get SellRent() {
    return this.BasicInfo.controls['SellRent'] as FormControl;
  }
  get PType() {
    return this.BasicInfo.controls['PType'] as FormControl;
  }
  get BHK() {
    return this.BasicInfo.controls['BHK'] as FormControl;
  }
  get FType() {
    return this.BasicInfo.controls['FType'] as FormControl;
  }
  get BuildingName() {
    return this.BasicInfo.controls['Name'] as FormControl;
  }
  get City() {
    return this.BasicInfo.controls['City'] as FormControl;
  }
  get Price() {
    return this.PriceInfo.controls['Price'] as FormControl;
  }
  get Security() {
    return this.PriceInfo.controls['Security'] as FormControl;
  }
  get Maintenance() {
    return this.PriceInfo.controls['Maintenance'] as FormControl;
  }
  get BuiltArea() {
    return this.PriceInfo.controls['BuiltArea'] as FormControl;
  }
  get CarpetArea() {
    return this.PriceInfo.controls['CarpetArea'] as FormControl;
  }
  get Floor() {
    return this.AddressInfo.controls['Floor'] as FormControl;
  }
  get TotalFloor() {
    return this.AddressInfo.controls['TotalFloor'] as FormControl;
  }
  get Address() {
    return this.AddressInfo.controls['Address'] as FormControl;
  }
  get LandMark() {
    return this.AddressInfo.controls['LandMark'] as FormControl;
  }
  get RTM() {
    return this.OtherDetailsInfo.controls['RTM'] as FormControl;
  }
  get Posession() {
    return this.OtherDetailsInfo.controls['Posession'] as FormControl;
  }
  get AOP() {
    return this.OtherDetailsInfo.controls['AOP'] as FormControl;
  }
  get Gated() {
    return this.OtherDetailsInfo.controls['Gated'] as FormControl;
  }
  get MainEntrance() {
    return this.OtherDetailsInfo.controls['MainEntrance'] as FormControl;
  }
  get Description() {
    return this.OtherDetailsInfo.controls['Description'] as FormControl;
  }
  //#endregion

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.nextClicked = true;

    if (this.allTabsValid()) {
      this.mapProperty();
      this.housingService.addProperty(this.property);
      this.alertyfy.success(
        'You have successfully added your Property details.!'
      );
      if (this.SellRent.value == 2) {
        this.router.navigate(['/rent-property']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.alertyfy.warning('Please priview your input details.!');
    }
    console.log(this.addPropertyForm);
  }

  mapProperty(): void {
    this.property.Id = this.housingService.newPropId();
    this.property.SellRent = +this.SellRent.value;
    this.property.BHK = this.BHK.value;
    this.property.PType = this.PType.value;
    this.property.Name = this.BuildingName.value;
    this.property.City = this.City.value;
    this.property.FType = this.FType.value;
    this.property.Price = this.Price.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.FloorNo = this.Floor.value;
    this.property.TotalFloor = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.LandMark = this.LandMark.value;
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Posession = this.Posession.value;
    this.property.Description = this.Description.value;
    this.property.PostedOn = new Date().toString();
  }

  allTabsValid(): boolean {
    if (this.BasicInfo.invalid) {
      this.formTabs.tabs[0].active = true;
      return false;
    }
    if (this.PriceInfo.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
    }
    if (this.AddressInfo.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }
    if (this.OtherDetailsInfo.invalid) {
      this.formTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }

  selectTab(tabId: number, IsCurrentTabValid: boolean) {
    this.nextClicked = true;
    if (IsCurrentTabValid) {
      this.formTabs.tabs[tabId].active = true;
    }
  }
}
