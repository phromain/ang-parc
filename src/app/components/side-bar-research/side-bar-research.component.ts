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
    this.route.queryParams.subscribe(params => {
      const typeParc = params['typeparc'];
      if (typeParc) {
        this.sideBarForm.patchValue({[typeParc]: true});
      }
      this.sideBarForm.valueChanges.subscribe(values => {
        this.parcFilterService.allParcs.subscribe(allParcs => {
          const filteredParcs = allParcs.filter(parc =>
            (values.nomParc ? parc.nomParc.toLowerCase().includes(values.nomParc.toLowerCase()) : true) &&
            (values.regionId ? parc.idRegion === values.regionId : true) &&
            (!values.attraction && !values.aquatique && !values.spectacle && !values.zoo ? true :
              (values.attraction && parc.libelleTypeParc === 'Attraction') ||
              (values.aquatique && parc.libelleTypeParc === 'Aquatique') ||
              (values.spectacle && parc.libelleTypeParc === 'Spectacle') ||
              (values.zoo && parc.libelleTypeParc === 'Zoo')) &&
            (values.parkingGratuit ? parc.parkingGratuit === values.parkingGratuit : true) &&
            (values.restauration ? parc.restauration === values.restauration : true) &&
            (values.boutique ? parc.boutique === values.boutique : true) &&
            (values.sejour ? parc.sejour === values.sejour : true)
          );
          this.parcFilterService.updateParcs(filteredParcs);
        });
      });
    });
  }

  onReset() {
    this.parcFilterService.resetParcs();
  }
}
