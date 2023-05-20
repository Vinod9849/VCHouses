import { Component, OnInit } from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
})
export class PropertyDetailComponent implements OnInit {
  public propertyId: number;
  property = new Property();
  //router: any;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private housingService: HousingService
  ) {}

  ngOnInit() {
    this.propertyId = +this.route.snapshot.params['id'];

    this.route.data.subscribe((data: Property) => {
      this.property = data['prp'];
    });

    // this.route.params.subscribe((params) => {
    //   this.propertyId = +params['id'];
    //   this.housingService.getProperty(this.propertyId).subscribe(
    //     (data: Property) => {
    //       this.property = data;
    //     },
    //     (error) => this.router.navigate(['/'])
    //   );
    // });
    this.galleryOptions = [
      {
        width: '100%',
        height: '480px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
      },
    ];

    this.galleryImages = [
      {
        small: 'assets/images/interior_1.jpg',
        medium: 'assets/images/interior_1.jpg',
        big: 'assets/images/interior_1.jpg',
      },
      {
        small: 'assets/images/interior_2.jpeg',
        medium: 'assets/images/interior_2.jpeg',
        big: 'assets/images/interior_2.jpeg',
      },
      {
        small: 'assets/images/interior_3.jpg',
        medium: 'assets/images/interior_3.jpg',
        big: 'assets/images/interior_3.jpg',
      },
      {
        small: 'assets/images/interior_4.png',
        medium: 'assets/images/interior_4.png',
        big: 'assets/images/interior_4.png',
      },
      {
        small: 'assets/images/interior_5.jpg',
        medium: 'assets/images/interior_5.jpg',
        big: 'assets/images/interior_5.jpg',
      },
    ];
  }
}
