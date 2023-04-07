import { Component, OnInit } from '@angular/core';
import { NodeService } from "../../../service/node.service";
import { TreeNode } from 'primeng/api';

@Component({
    templateUrl: './treedemo.component.html'
})
export class TreeDemoComponent implements OnInit {

    files1: TreeNode[] = [];
    files2: TreeNode[] = [];
    files3: TreeNode[] = [];
    selectedFiles1: TreeNode[] = [];
    selectedFiles2: TreeNode[] = [];
    selectedFiles3: TreeNode = {};
    cols: any[] = [];

    constructor(private nodeService: NodeService){}

    ngOnInit() {
        this.nodeService.getFiles().then(files => this.files1 = files);
        this.nodeService.getFilesystem().then(files => this.files2 = files);
        this.nodeService.getFiles().then(files => {
            this.files3 = [{
                label: '/',
                children: files
            }];
        });

        this.cols = [
            { field: 'name', header: 'Имя' },
            { field: 'size', header: 'Размер' },
            { field: 'type', header: 'Тип' }
        ];
    }
}
