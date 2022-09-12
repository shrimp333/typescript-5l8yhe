import { Dice } from './Dice';
import { Colour } from './Colour.enum';

export class Player {
  name: string;
  score: number;
  colour: Colour;
  constructor(name: string, score: number, colour: Colour) {
    this.name = name;
    this.score = score;
    this.colour = colour;
  }
}
