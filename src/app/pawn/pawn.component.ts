import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pawn',
  templateUrl: './pawn.component.html',
  styleUrls: ['./pawn.component.scss']
})
export class PawnComponent {

  pawnForm: FormGroup;
  pawnPosition = { x: -1, y: -1, direction: 'NORTH' };
  directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
  directionArrows: Record<string, string> = {

    NORTH: '←',
    EAST: '↓',
    SOUTH: '→',
    WEST: '↑',
  };
  board = Array.from({ length: 8 }, () => Array(8).fill(null));

  constructor(private fb: FormBuilder) {
    this.pawnForm = this.fb.group({
      x: [null, [Validators.required, Validators.min(0), Validators.max(7)]],
      y: [null, [Validators.required, Validators.min(0), Validators.max(7)]],
      direction: ['NORTH', Validators.required],
      color: ['#000000', Validators.required],
    });
  }

  get pawnControls() {
    return this.pawnForm.controls;
  }

  placePawn() {
    if (this.pawnForm.valid) {
      const { x, y, direction } = this.pawnForm.value;
      this.pawnPosition = { x, y, direction };
    }
  }

  rotatePawn(direction: 'LEFT' | 'RIGHT') {
    const index = this.directions.indexOf(this.pawnPosition.direction);
    this.pawnPosition.direction =
      direction === 'LEFT'
        ? this.directions[(index + 3) % 4] // Counterclockwise
        : this.directions[(index + 1) % 4]; // Clockwise
  }

  movePawn() {
    if (this.pawnPosition.x < 0 || this.pawnPosition.y < 0) return;

    const { x, y, direction } = this.pawnPosition;
    if (direction === 'NORTH' && y > 0) this.pawnPosition.y--;
    if (direction === 'EAST' && x < 7) this.pawnPosition.x++;
    if (direction === 'SOUTH' && y < 7) this.pawnPosition.y++;
    if (direction === 'WEST' && x > 0) this.pawnPosition.x--;
  }

  getCellStyle(row: number, col: number) {
    return {
      backgroundColor: (row + col) % 2 === 0 ? '#DEB887' : '#800000',
    };
  }
}
