import './style.css';
import './game.css';

import { gameInit, gameStart } from './game/game';

const canvas = document.getElementById('gameCanvas')! as HTMLCanvasElement;
const startBtn = document.getElementById('resetBtn')! as HTMLButtonElement;
const linesTxt = document.getElementById('txt-lines')! as HTMLSpanElement;
const timeTxt = document.getElementById('txt-time')! as HTMLSpanElement;
const scoreTxt = document.getElementById('txt-score')! as HTMLSpanElement;
const ctx = canvas.getContext('2d')!;

gameInit(canvas, ctx);

startBtn.addEventListener('click', () => {
  startBtn.blur();
  gameStart(ctx, linesTxt, timeTxt, scoreTxt);
});
