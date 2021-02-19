'use strict';
import PopUp from './popup.js';
import * as sound from './sound.js';
import { GameBulder, Reason } from './game.js';

const gameFinishBanner = new PopUp();
const game = new GameBulder()
  .withGameDuration(5)
  .withCarrotcount(5)
  .withBugCount(5)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = 'Replay?';
      sound.playAlert();
      break;
    case Reason.win:
      message = 'YOU WIN!';
      sound.playWin();
      break;
    case Reason.lose:
      message = 'YOU LOST!';
      sound.playBug();
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
