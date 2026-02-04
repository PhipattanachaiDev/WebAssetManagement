import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { AssetService } from '../../../core/services/asset.service';
import { Asset } from '../../../models/asset.model';
import { AssetFormComponent } from '../asset-form/asset-form.component';

@Component({
  selector: 'app-asset-list',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    AssetFormComponent
  ],
  templateUrl: './asset-list.component.html',
  providers: [ConfirmationService, MessageService]
})
export class AssetListComponent implements OnInit {

  assets: Asset[] = [];
  display = false;
  selected?: Asset;
  loading = false;

  constructor(
    private assetService: AssetService,
    private confirm: ConfirmationService,
    private msg: MessageService
  ) { }

  ngOnInit(): void {
    this.loadAssets();
  }

  loadAssets() {
    this.loading = true;
    this.assetService.getAssets().subscribe({
      next: res => this.assets = res.data,
      error: () => {
        this.msg.add({ severity: 'error', summary: 'Error', detail: 'Load assets failed' });
      },
      complete: () => this.loading = false
    });
  }

  openNew() {
    this.selected = undefined;
    this.display = true;
  }

  edit(asset: Asset) {
    this.selected = asset;
    this.display = true;
  }

  remove(id: number) {
    this.confirm.confirm({
      header: 'Delete asset',
      message: 'Are you sure you want to delete this asset?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      acceptIcon: 'pi pi-trash',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.assetService.deleteAsset(id).subscribe(() => {
          this.loadAssets();
        });
      }
    });
  }
}
