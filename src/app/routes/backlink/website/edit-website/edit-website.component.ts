import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {WebsiteService} from "../../../../core/service/website.service";
import {MatDialog} from "@angular/material/dialog";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatChipInputEvent} from "@angular/material/chips";
import {Website} from "../../../../core/interface/website";

@Component({
  selector: 'app-backlink-website-edit-website',
  templateUrl: './edit-website.component.html',
  styleUrls: ['./edit-website.component.less']
})
export class EditWebsiteComponent {
  isNewWebsite = true;
  website: Website;
  websites: any;
  keywords: any;
  announcer: any;
  statusOption: any;
  selectedOption = 0;
  protected websiteForm !: FormGroup;
  private websiteData: FormData;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer, private websiteService: WebsiteService, private dialog: MatDialog) {
    this.announcer = inject(LiveAnnouncer);
    this.statusOption = {active: 1, trash: -1, noActive: 0}
    this.website = {
      websiteTitle: "",
      websiteDomain: "",
      websiteDescription: "",
      websiteStatus: "",
      websiteDate: "",
      websiteSeoTitle: "",
      websiteSeoKeyword: "",
      websiteSeoExcerpt: ""
    };
    this.websiteData = new FormData();
  }

  ngOnInit(): void {
    this.website.websiteId = parseInt(<string>this.activatedRoute.snapshot.paramMap.get("websiteId"));
    if (this.website && this.website.websiteId) {
      this.isNewWebsite = false;
      this.websiteService.get(this.website.websiteId).subscribe({
        next: (res: any) => {
          this.website.websiteId = res.data.result.id;
          this.website.websiteDomain = res.data.result.key_website;
          this.websiteForm.get("websiteDomain")?.setValue(this.website.websiteDomain);
          this.website.websiteTitle = res.data.result.title_website;
          this.websiteForm.get("websiteTitle")?.setValue(this.website.websiteTitle);
          this.website.websiteDescription = res.data.result.description_website;
          this.websiteForm.get("websiteDescription")?.setValue(this.website.websiteDescription);
          this.website.websiteStatus = res.data.result.status_website;
          this.websiteForm.get("websiteStatus")?.setValue(this.website.websiteStatus);
          this.website.websiteDate = res.data.result.date_add;
        }
      })
    }

    this.keywords = [];
    this.websites = [];

    this.websiteForm = this.formBuilder.group({
      websiteStatus: [null, [Validators.required]],
      websiteDate: [null, [Validators.required]],
      websiteTitle: [null, [Validators.required, Validators.maxLength(100)]],
      websiteDomain: [null, null],
      websiteExcerpt: [null, [Validators.required, Validators.maxLength(500)]],
      websiteDescription: [null],
      websiteSeoTitle: [null],
      websiteSeoKeyword: [null],
      websiteSeoExcerpt: [null],
    });
  }

  onSubmit() {
    if (this.websiteForm.valid) {
      if (this.website.websiteId) {
        this.websiteData.append('websiteId', this.website.websiteId.toString())
        this.websiteData.append('websiteTitle', this.websiteForm.get('websiteTitle')?.value)
        this.websiteData.append('websiteStatus', this.websiteForm.get('websiteStatus')?.value)
        this.websiteData.append('websiteDomain', this.websiteForm.get('websiteDomain')?.value)
        this.websiteData.append('websiteDate', this.websiteForm.get('websiteDate')?.value)
        this.websiteData.append('websiteDescription', this.websiteForm.get('websiteDescription')?.value)
        this.websiteData.append('websiteSeoTitle', this.websiteForm.get('websiteSeoTitle')?.value)
        this.websiteData.append('websiteSeoKeyword', this.keywords)
        this.websiteData.append('websiteSeoExcerpt', this.websiteForm.get('websiteSeoExcerpt')?.value)

        this.websiteService.put(this.websiteData).subscribe({
          next: (result: any) => {
            console.log(result);
          }
        })
      } else {
        this.websiteData.append('websiteTitle', this.websiteForm.get('websiteTitle')?.value)
        this.websiteData.append('websiteStatus', this.websiteForm.get('websiteStatus')?.value)
        this.websiteData.append('websiteDate', this.websiteForm.get('websiteDate')?.value)
        this.websiteData.append('websiteDomain', this.websiteForm.get('websiteDomain')?.value)
        this.websiteData.append('websiteDescription', this.websiteForm.get('websiteDescription')?.value)
        this.websiteData.append('websiteSeoTitle', this.websiteForm.get('websiteSeoTitle')?.value)
        this.websiteData.append('websiteSeoKeyword', this.keywords)
        this.websiteData.append('websiteSeoExcerpt', this.websiteForm.get('websiteSeoExcerpt')?.value)

        this.websiteService.post(this.websiteData).subscribe({
          next: (result: any) => {
            console.log(result);
          }
        })
      }
    } else {
      const {controls} = this.websiteForm;
      for (const i in controls) {
        if (controls.hasOwnProperty(i)) {
          controls[i].markAsDirty()
          controls[i].updateValueAndValidity()
        }
      }
    }
  }

  removeKeyword(keyword: string) {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);

      this.announcer.announce(`removed ${keyword}`);
    }
  }

  addKeyword(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.keywords.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }
}
