var DEFAULT_CHANNEL_INTERVAL = 6000;

var player;

var channels = getAllChannels();
var channelIndex = 0;

var staticChannelVideo = document.getElementById('static-video');
var staticChannelSound = document.getElementById('static-audio');

staticChannelSound.oncanplay = function () {

  staticChannelSound.play();

};

function onYouTubeIframeAPIReady() {

  player = new YT.Player('player', {
    height: '100%',
    width: '100%',
    videoId: channels[channelIndex],
    playerVars: {
      // Play automatically
      autoplay: 1,
      // Hide player controls
      controls: 0,
      // Hide all video info
      showinfo: 0,
      // Hide progress bar (unnecessary for HTML5 player)
      autohide: 1,
      // Hide annotations
      iv_load_policy: 3,
      // Hide related videos at the end
      rel: 0,
      // Slow YouTube's branding roll
      modestbranding: 1
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });

}

function onPlayerReady() {

  toggleStaticChannel();

}

function onPlayerStateChange(e) {

  if (e.data === YT.PlayerState.PLAYING) {

    toggleStaticChannel();
    setTimeout(function () {

      changeChannel(channels[++channelIndex]);

    }, DEFAULT_CHANNEL_INTERVAL);

  }

}

function toggleShow(elem) {

  elem.style.display = !elem.style.display || elem.style.display === 'none' ? 'block' : 'none';

}

function toggleStaticChannel() {

  toggleShow(staticChannelVideo);

  if (staticChannelSound.paused) {

    staticChannelSound.play();

  } else {

    staticChannelSound.pause();

  }

}

function changeChannel(channelId) {

  if (!channelId) {

    return;

  }

  player.pauseVideo();
  toggleStaticChannel();
  setTimeout(function () {

    player.loadVideoById(channelId, 0, "large");

  }, 800);

}

function getAllChannels() {

  return [
    'SItFvB0Upb8',
    'MG_e_PSBknA',
    'UhHhXukovMU',
    'UGBZnfB46es',
    '2RbRoF2AKAc',
    'S8rNRmmosmA',
    'X-TAaFg2vzY',
    'sKLWwsGtuVI',
    'W7Hoz2ZHYZM',
    'Yi7KWVCwmkI',
    'SFmM5CWnmtE',
    'NgWn7zbgxZ4',
    '5rz1TcLVFzY',
    'MUzJjPL2HoA',
    '9wz0KitxtDQ',
    'pkC7dcxZ5_Q',
    'iKC21wDarBo',
    '19PWUliieNM',
    'MOzmbza9D5c',
    'mw_HKzo9Ync',
    'cScB5FuQCIk',
    'RXJKdh1KZ0w',
    'oi78FH2QhrA'
  ];

}