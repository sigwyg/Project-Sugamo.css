(async function() {
  'use strict';

  NS.userInit({
    title: 'No CSS',
    author: 'debiru',
    noLoadCSS: true,
    resetCSS: false,
  });

  // NS.loadCSS('user.css');
  // NS.loadCSS(['user.css', 'https://example.com/external.css']);
})();
