# js13kgames-2020

js13kgames competition entry. Motto 404

## Installation

1. Clone the repo.
2. Install the dependencies.
3. Create a build.
4. Open the `dist/index.html` in a web browser.

## Motivation and idea of the game

JS13kGames.

Okay, here's the long version.
For quite some time, I was interested in exploring SVG, since the format is
text-based, yields high resolution and can be scripted (even animated).

In a Discord chat, I discovered an application, which held the idea of agents
in a virtual world interacting with each other. Personally, I'd like to see
the feature of memory present in more games.

404 - Not Found is interpreted as something lost and not found.
You can find this topic recurring in several places within this game.

Also, there are these pictures consisting of triangles. I was wondering,
whether this could be extended to other shapes as well.
So during vacation, that is, within the first two weeks of this competition,
I scribbled in a notebook with Pen and Paper to explore different ideas.

The idea is to have different worlds, which play with a single shape in
various fashions each. They're dependent on each other, but split up in anger.
It's your job to change that. But time's running!

A first prototype was implemented using an Android phone.
I coded everything in a single HTML file using [Markor][markor] and viewed it
in Firefox for Android.

Since I didn't have a Node.js runtime there (since [Termux][termux] dropped
support for my version of Android) I went with no external dependencies this
time.

It took me quite some time to develop the whole game engine next to the game.

Plus, going back full time, cut my time for development short.
Family duties weren't adding either.

So I had to take cuts again. The whole game is about 9k zipped, so there's 
quite some unexplored opportunities. Imagine a _complex_ game within 13k!

I want to end this section with a THANK YOU to Maxim!
The sound in this game wouldn't be possible without
[miniMusic][MiniMusic], from which I derived my implementation.
(I couldn't find a license, but the code is generic Web Audio implementation).

## Testing

I planned to add unit tests, but ended up testing the game with Firefox on my
Android phone, an Android tablet and my laptop. The latter one got coverage
with Chromium, too.

## License

GPL v3 or newer. See [LICENSE](./LICENSE.txt).

[markor]: https://f-droid.org/en/packages/net.gsantner.markor/
[MiniMusic]: https://github.com/xem/miniMusic
[termux]: https://f-droid.org/en/packages/com.termux/
