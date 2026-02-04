import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

import { AssetService } from '../../../core/services/asset.service';
import { CategoryService } from '../../../core/services/category.service';
import { Asset, AssetRequest } from '../../../models/asset.model';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-asset-form',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule
  ],
  templateUrl: './asset-form.component.html'
})
export class AssetFormComponent implements OnInit, OnChanges {

  @Input() visible = false;
  @Input() asset?: Asset;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() saved = new EventEmitter<void>();

  categories: Category[] = [];
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private assetService: AssetService,
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      serialNumber: ['', Validators.required],
      categoryId: [null, Validators.required]
    });

    this.categoryService.getCategories().subscribe(res => {
      this.categories = res.data;
      this.cdr.detectChanges();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['asset'] && this.form) {
      if (this.asset) {
        this.form.patchValue({
          name: this.asset.name,
          serialNumber: this.asset.serialNumber,
          categoryId: this.asset.categoryId
        });
      } else {
        this.form.reset();
      }
    }
  }


  save() {
    if (this.form.invalid) return;

    const data = this.form.value as AssetRequest;

    const request = this.asset
      ? this.assetService.updateAsset(this.asset.id, data)
      : this.assetService.createAsset(data);

    request.subscribe(() => {
      this.visible = false;
      this.visibleChange.emit(false);
      this.saved.emit();
    });
  }
}
