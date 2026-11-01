# Spider Stomp

Hi! This is my Halloween game for Hack Club's Ghost Ship. I made it with p5.js.

## What is it?

A haunted house is totally overrun with spiders and you have to squish as many as you can before the timer runs out. You get 30 seconds. Click a spider to squish it!

## How to play

- Click anywhere to start.
- Click the **black spiders** to squish them (+1 point).
- Click the **golden spiders** for a bonus (+5 points). They're fast and they disappear after a few seconds, so you have to be quick.
- **DON'T click the black cat!!** It's innocent. You lose 3 points if you hurt it (your score can't go below 0).
- When the timer hits 0 the game ends and you get a rank. Click to try again.

## What I added

The guide gave us a base game where you click a ghost, so I changed a LOT of stuff:

1. **Different creatures.** I swapped the ghost for spiders, and I drew a golden spider and a black cat too. They're made out of ellipses, triangles, lines, and arcs.
2. **Floating movement.** Everything bounces around and bounces off the edges of the screen instead of teleporting.
3. **Gets harder.** I used `lerp()` so the spiders go from normal speed to 2.5x faster by the end of the round.
4. **Particle splats.** When you squish something, little dots fly out and fall down.
5. **My own scene.** There's a haunted house with flickering windows, a moon with craters, and fog that drifts back and forth.
6. **Ranks.** At the end you get a title like "Bug Squisher Pro" depending on your score.

## What I learned

- How `setup()` and `draw()` work. `draw()` runs like 60 times a second, which is kinda wild.
- How to use `state` to switch between the start screen, the game, and the game over screen.
- How to use an array to keep track of a bunch of things (the spiders AND the particles).
- That when you `splice()` things out of an array while looping, you have to loop backwards or it skips stuff. That bug confused me for a while.
- `constrain()` is really useful for keeping stuff on the screen.

## Files

- `index.html` loads p5.js and my sketch
- `sketch.js` is all the game code

## How to run it

Go to the link on the Pages site, or open it in the [p5.js web editor](https://editor.p5js.org/) and press play.


Thanks for playing!
