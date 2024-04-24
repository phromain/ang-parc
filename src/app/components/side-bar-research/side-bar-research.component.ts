import {Component, OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ListRegionComponent} from "../list-region/list-region.component";
import {ParcFilterService} from "../../services/parc-filter.service";
import {ActivatedRoute} from "@angular/router";



@Component({
  selector: 'app-side-bar-research',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, ReactiveFormsModule, ListRegionComponent],
  templateUrl: './side-bar-research.component.html',
  styleUrl: './side-bar-research.component.css'
})
export class SideBarResearchComponent implements OnInit {
  sideBarForm = this.formBuilder.group({
    nomParc: '',
    regionId: '',
    attraction: false,
    aquatique: false,
    spectacle: false,
    zoo: false,
    parkingGratuit: false,
    restauration: false,
    boutique: false,
    sejour: false
  });


  constructor(private formBuilder: FormBuilder, private parcFilterService: ParcFilterService,private route: ActivatedRoute) {}

    ngOnInit() {
        this.updateFormFromQueryParams();
        this.sideBarForm.get('nomParc')!.valueChanges.subscribe(value => {
            if (value !== null) {
                this.parcFilterService.setNomParc(value);
            }
        });
        this.sideBarForm.get('regionId')!.valueChanges.subscribe(value => {
            if (value !== null) {
                this.parcFilterService.setRegionId(value);
            }
        });
        this.sideBarForm.get('attraction')!.valueChanges.subscribe(value => {
                this.parcFilterService.setAttraction(!!value);
        });
        this.sideBarForm.get('aquatique')!.valueChanges.subscribe(value => {
                this.parcFilterService.setAquatique(!!value);
        });
        this.sideBarForm.get('spectacle')!.valueChanges.subscribe(value => {
                this.parcFilterService.setSpectacle(!!value);
        });
        this.sideBarForm.get('zoo')!.valueChanges.subscribe(value => {
                this.parcFilterService.setZoo(!!value);
        });
        this.sideBarForm.get('parkingGratuit')!.valueChanges.subscribe(value => {
                this.parcFilterService.setParkingGratuit(!!value);
        });
        this.sideBarForm.get('restauration')!.valueChanges.subscribe(value => {
                this.parcFilterService.setRestauration(!!value);
        });
        this.sideBarForm.get('boutique')!.valueChanges.subscribe(value => {
                this.parcFilterService.setBoutique(!!value);
        });
        this.sideBarForm.get('sejour')!.valueChanges.subscribe(value => {
                this.parcFilterService.setSejour(!!value);
        });

    }

    updateFormFromQueryParams() {
        this.route.queryParams.subscribe(params => {
            const typeParc = params['typeparc'];
            const region = params['region'];

            if (typeParc) {
                this.sideBarForm.patchValue({[typeParc]: true});
                this.parcFilterService.setAttraction(typeParc === 'attraction');
                this.parcFilterService.setAquatique(typeParc === 'aquatique');
                this.parcFilterService.setSpectacle(typeParc === 'spectacle');
                this.parcFilterService.setZoo(typeParc === 'zoo');
            }
            if (region) {
                this.sideBarForm.patchValue({regionId: region});
                this.parcFilterService.setRegionId(region);
            }
        });
    }




    onReset() {
        this.sideBarForm.reset({
            nomParc: '',
            regionId: '',
            attraction: false,
            aquatique: false,
            spectacle: false,
            zoo: false,
            parkingGratuit: false,
            restauration: false,
            boutique: false,
            sejour: false
        });
        this.parcFilterService.resetParcs();
    }

}
