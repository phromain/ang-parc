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
    slugRegion: '',
    attraction: false,
    aquatique: false,
    spectacle: false,
    animalier: false,
    parkingGratuit: false,
    restauration: false,
    boutique: false,
    sejour: false,
    transport: false

  });


  constructor(private formBuilder: FormBuilder, private parcFilterService: ParcFilterService,private route: ActivatedRoute) {}

    ngOnInit() {
      this.updateFormFromQueryParams();
      this.updateParcsFromFormValues();
      this.sideBarForm.updateValueAndValidity();
    }

    updateFormFromQueryParams() {
        this.route.queryParams.subscribe(params => {
            const typeParc = params['typeparc'];
            const region = params['region'];
            console.log('queryParams', params);
            if (typeParc) {
              this.sideBarForm.patchValue({[typeParc]: true});
            }
            if(region) {
              this.sideBarForm.patchValue({slugRegion: region});
            }
        });
    }


    filterByNomParc(values: any, parc: any) {
        return values.nomParc ? parc.nomParc.toLowerCase().includes(values.nomParc.toLowerCase()) : true;
    }

    filterByRegionSlug(values: any, parc: any) {
        return values.slugRegion ? parc.slugRegion === values.slugRegion : true;
    }

    filterByType(values: any, parc: any) {
        return (!values.attraction && !values.aquatique && !values.spectacle && !values.animalier) ? true :
          (values.attraction && parc.typeParc.includes('Attraction')) ||
          (values.aquatique && parc.typeParc.includes('Aquatique')) ||
          (values.spectacle && parc.typeParc.includes('Spectacle')) ||
          (values.animalier && parc.typeParc.includes('Animalier'));
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

  filterByTransport(values: any, parc: any) {
    return values.transport ? parc.transport === values.transport : true;
  }

  updateParcsFromFormValues() {
    this.sideBarForm.valueChanges.subscribe(values => {
      //console.log('form values', values);
      this.parcFilterService.allParcs.subscribe(allParcs => {
        //console.log('allParcs', allParcs); // Log all parcs
        const filteredParcs = allParcs.filter(parc => {
          const isMatch =
            this.filterByNomParc(values, parc) &&
            this.filterByRegionSlug(values, parc) &&
            this.filterByType(values, parc) &&
            this.filterByParkingGratuit(values, parc) &&
            this.filterByRestauration(values, parc) &&
            this.filterByBoutique(values, parc) &&
            this.filterBySejour(values, parc) &&
            this.filterByTransport(values, parc);

          /*console.log('isMatch for parc', parc, ':', isMatch); // Log matching result for each parc
            if (isMatch) {
                console.log('Matched parc:', parc);
            }*/
            return isMatch;
        });
        this.parcFilterService.updateParcs(filteredParcs);
      });
    });
  }

    onReset() {
    this.parcFilterService.resetParcs();
  }
}
