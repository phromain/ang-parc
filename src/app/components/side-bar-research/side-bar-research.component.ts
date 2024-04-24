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
        this.updateParcsFromFormValues();
    }

    updateFormFromQueryParams() {
        this.route.queryParams.subscribe(params => {
            const typeParc = params['typeparc'];
            const region = params['region'];
            console.log('queryParams', params);
            if (typeParc) {
                this.sideBarForm.patchValue({[typeParc]: true});
            }
        });
    }


    filterByNomParc(values: any, parc: any) {
        return values.nomParc ? parc.nomParc.toLowerCase().includes(values.nomParc.toLowerCase()) : true;
    }

    filterByRegionId(values: any, parc: any) {
        return values.regionId ? parc.idRegion === values.regionId : true;
    }

    filterByType(values: any, parc: any) {
        return (!values.attraction && !values.aquatique && !values.spectacle && !values.zoo) ? true :
            (values.attraction && parc.libelleTypeParc === 'Attraction') ||
            (values.aquatique && parc.libelleTypeParc === 'Aquatique') ||
            (values.spectacle && parc.libelleTypeParc === 'Spectacle') ||
            (values.zoo && parc.libelleTypeParc === 'Zoo');
    }

    filterByParkingGratuit(values: any, parc: any) {
        return values.parkingGratuit ? parc.parkingGratuit === values.parkingGratuit : true;
    }

    filterByRestauration(values: any, parc: any) {
        return values.restauration ? parc.restauration === values.restauration : true;
    }

    filterByBoutique(values: any, parc: any) {
        return values.boutique ? parc.boutique === values.boutique : true;
    }

    filterBySejour(values: any, parc: any) {
        return values.sejour ? parc.sejour === values.sejour : true;
    }


    updateParcsFromFormValues() {
        this.sideBarForm.valueChanges.subscribe(values => {
            console.log('form values', values); // Log form values
            this.parcFilterService.allParcs.subscribe(allParcs => {
                console.log('allParcs', allParcs); // Log all parcs
                const filteredParcs = allParcs.filter(parc => {
                    const isMatch =
                        this.filterByNomParc(values, parc) &&
                        this.filterByRegionId(values, parc) &&
                        this.filterByType(values, parc) &&
                        this.filterByParkingGratuit(values, parc) &&
                        this.filterByRestauration(values, parc) &&
                        this.filterByBoutique(values, parc) &&
                        this.filterBySejour(values, parc);
                    console.log('isMatch for parc', parc, ':', isMatch); // Log matching result for each parc
                    if (isMatch) {
                        console.log('Matched parc:', parc);
                    }
                    return isMatch;
                });
                console.log('filteredParcs', filteredParcs); // Log filtered parcs
                this.parcFilterService.updateParcs(filteredParcs);
            });
        });
    }

    onReset() {
    this.parcFilterService.resetParcs();
  }
}
