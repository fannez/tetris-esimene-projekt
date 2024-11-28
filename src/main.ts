import './style.css';
import './game.css';

import { gameInit, gameStart } from './game/game';

const canvas = document.getElementById('gameCanvas')! as HTMLCanvasElement;
const startBtn = document.getElementById('resetBtn')! as HTMLButtonElement;
const ctx = canvas.getContext('2d')!;

gameInit(canvas, ctx);
gameStart(ctx); // Just for testing

startBtn.addEventListener('click', () => {
  gameStart(ctx);
});
