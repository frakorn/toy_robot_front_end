import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TableTopItem } from '../models/tabletop.model';

@Injectable({
  providedIn: 'root'
})
export class TabletopService {

  constructor() { }

  generateGrid(): TableTopItem[] {
    const grid: TableTopItem[] = [];
    const gridSize = environment.tableTop.x; 
    for (let i = gridSize - 1; i >= 0; i--) { 
      for (let j = 0; j < gridSize; j++) { 
        const coordinate: TableTopItem = { x: j, y: i }; 
        grid.push(coordinate);
      }
    }
    return grid;
  }
}
