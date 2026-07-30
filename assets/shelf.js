/*
  Homepage-only script for the shelf.

  1) Progressive tile reveal: every book is already in the HTML (good for SEO
     and for anyone without JS), but each category grid only *shows* the first
     BATCH tiles at first. As the reader scrolls near the bottom of a grid,
     the next BATCH tiles fade in. This is "infinite scroll" without any
     backend, pagination endpoint, or JSON file to maintain — it just reads
     however many .shelf-tile elements already exist in the grid.

     Nothing changes about how a new booktalk is added: keep appending one
     .shelf-tile per book to the matching Fiction/Non-Fiction .shelf-grid,
     same as always. This script decides what to reveal and when, automatically.

  2) Jump-nav highlight: the sticky "Fiction / Non-Fiction" pill nav gets an
     .active class on whichever section is currently in view.
*/
(function () {
  var BATCH = 6;

  function setUpProgressiveReveal() {
    document.querySelectorAll('.shelf-section').forEach(function (section) {
      var grid = section.querySelector('.shelf-grid');
      if (!grid) return;

      var tiles = Array.prototype.slice.call(
        grid.querySelectorAll('.shelf-tile:not(.slot-empty)')
      );
      if (tiles.length <= BATCH) return; // small shelf: show everything, no reveal needed

      var placeholder = grid.querySelector('.shelf-tile.slot-empty');
      if (placeholder) placeholder.hidden = true; // reappears once every real tile is shown

      tiles.slice(BATCH).forEach(function (tile) {
        tile.classList.add('tile-hidden');
      });

      var shown = BATCH;
      var sentinel = document.createElement('div');
      sentinel.className = 'shelf-sentinel';
      grid.insertBefore(sentinel, placeholder || null);

      function revealNextBatch() {
        var next = tiles.slice(shown, shown + BATCH);
        next.forEach(function (tile, i) {
          tile.classList.remove('tile-hidden');
          tile.style.animationDelay = i * 60 + 'ms';
          tile.classList.add('tile-reveal');
        });
        shown += next.length;

        if (shown >= tiles.length) {
          sentinel.remove();
          if (placeholder) placeholder.hidden = false;
        }
      }

      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) revealNextBatch();
            });
          },
          { rootMargin: '300px 0px' }
        );
        io.observe(sentinel);
      } else {
        // very old browser fallback: just show everything
        tiles.forEach(function (tile) { tile.classList.remove('tile-hidden'); });
        sentinel.remove();
        if (placeholder) placeholder.hidden = false;
      }
    });
  }

  function setUpJumpNavHighlight() {
    var links = document.querySelectorAll('.shelf-jump a');
    if (!links.length || !('IntersectionObserver' in window)) return;

    var sections = Array.prototype.map.call(links, function (a) {
      return document.querySelector(a.getAttribute('href'));
    });

    var navIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var idx = sections.indexOf(entry.target);
          if (idx === -1 || !entry.isIntersecting) return;
          links.forEach(function (l) { l.classList.remove('active'); });
          links[idx].classList.add('active');
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach(function (s) { if (s) navIo.observe(s); });
  }

  setUpProgressiveReveal();
  setUpJumpNavHighlight();
})();
