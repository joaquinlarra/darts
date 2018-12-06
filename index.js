const collide = require('line-circle-collision')

const input = {
  arrowX0: 10,
  arrowY0: 10,
  stealDistance: 5,
  targets: [
    { x: 100, y: 50, diameter: 10, prizePoints: 100 }, 
    { x: 300, y: 300, diameter: 25, prizePoints: 200 }, 
    { x: 500, y: 300, diameter: 25, prizePoints: 200 }
  ],
  players: [
    { 
      id: 'player1',
      shots: [ 
                { turn: 1, shootAngle: 23 },
                { turn: 4, shootAngle: 27 }, 
                { turn: 7, shootAngle: 45 } 
            ]
    },
    {
      id: 'player2',
      shots: [
                { turn: 2, shootAngle: 25 },
              { turn: 5, shootAngle: 50 },
              { turn: 8, shootAngle: 65 }
            ]
    },
    {
      id: 'player3',
      shots: 
        [ 
              { turn: 3, shootAngle: 40 },
              { turn: 6, shootAngle: 55 },
              { turn: 9, shootAngle: 80 } 
        ]
    }
  ] 
}

let results = {}

for(let turn = 0; turn < 3; turn++) {
  for(let i = 0; i < input.players.length; i++) {
    let player = input.players[i].id;
    let shot = input.players[i].shots[turn];
    
    for(let k = 0; k < input.targets.length; k++) {
      let target = input.targets[k];
      let circle = [target.x, target.y];
      let radius = target.diameter / 2;
      let a = [input.arrowX0, input.arrowY0];
      
      let xNext = target.x;
      let yNext = Math.tan(shot.shootAngle * Math.PI/180)*(xNext) + input.arrowY0;
      let b = [xNext, yNext];
      
      let hit = collide(a, b, circle, radius);
      if(hit) {
        if( !results[player]) results[player] = 0;

        results[player] += Number(target.prizePoints);
      }
    }
  }
}

let scores = Object.values(results);
const winnerScore = Math.max(...scores);

if(Object.keys(results).length) {

  Object.keys(results).forEach(player => {
    let score = results[player];
    if(score == winnerScore) {
      console.log(`${player} won the match with ${score} points\n`);
    }
  });

}






