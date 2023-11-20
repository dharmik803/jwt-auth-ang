import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Shinobi } from 'src/app/models/shinobi.model';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ShinobiService } from 'src/app/services/shinobi.service';

@Component({
  selector: 'app-shinobis',
  templateUrl: './shinobis.component.html',
  styleUrls: ['./shinobis.component.css']
})
export class ShinobisComponent implements OnInit{

  constructor(private shinobiService: ShinobiService,
              private fb: FormBuilder,
              private localServ: LocalstorageService
  ){
    
  }

  shinobiList!: Observable<Shinobi[]>;
  // shinobiList!: Shinobi[];
  shinobiForm!: FormGroup;
  formData!: Observable<Shinobi>;
  deleteId!: number;
  isNoData: boolean = false;


  ngOnInit(): void {

    this.onLoadGetShinobis();


    this.shinobiForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.pattern('^[A-Z][a-z]*( [A-Z][a-z]*)?$')]],
      age: [null, [Validators.required, Validators.pattern('^(0?[1-9]|[1-9][0-9]|100)$')]],
      rankLevel: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
      village: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
    });

    
    
  }

  get vName () { return this.shinobiForm.get('name') }
  get vAge () { return this.shinobiForm.get('age') }
  get vRankLevel () { return this.shinobiForm.get('rankLevel') }
  get vVillage () { return this.shinobiForm.get('village') }


  onLoadGetShinobis(){

    this.shinobiList = this.shinobiService.GetShinobi();

    this.shinobiList.subscribe(
      (data) => {
        if (data.length === 0) {
          this.isNoData = true;
        } else {
          this.isNoData = false;
        }
      },
      (error) => {
        this.isNoData = true;
      }
    );

  }

  onAddClick(){
    this.shinobiForm.setValue({
      id: null,
      name:'',
      age: null,
      rankLevel: '',
      village: ''
    });
  }

  onEditClick(id: number){
    if(id){
      this.formData = this.shinobiService.GetShinobiById(id);
    }

    this.formData.subscribe((shinobi) => {
      this.shinobiForm.setValue(shinobi);
    })
    
    console.log(this.shinobiForm);
  }

  onSaveShinobi(shinobi: Shinobi){
    console.log(shinobi);

    if(shinobi.id == null || shinobi.id == 0){
      shinobi.id = 0;
      this.shinobiService.PostShinobi(shinobi).subscribe((res) => {
        console.log(res);
        this.onLoadGetShinobis();
      })
    }
    else{
      this.shinobiService.UpdateShinobi(shinobi).subscribe((res) => {
        console.log();
        this.onLoadGetShinobis();
      })
    }

  }

  onDeleteClick(id: number){
    this.deleteId = id;
  }

  onDeleteShinobi(){
    if(this.deleteId){
      this.shinobiService.DeleteShinobi(this.deleteId).subscribe(
        (res) => {
          console.log(res);
          this.onLoadGetShinobis();
        }
      );
    }
  }


}

