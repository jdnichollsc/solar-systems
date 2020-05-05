/**
 * Happy International Astronomy Day 2020! 🔭🌌💫
 * <animatable/> WebComponent => https://github.com/proyecto26/animatable-component
 * CREDITS:
 * - https://picturepan2.github.io/solar.css/
 * - https://codepen.io/kowlor/pen/ZYYQoy
 * - https://codepen.io/juliangarnier/pen/idhuG
 */

/* ----------------------- SOLAR SYSTEM ----------------------- */
const totalStars = 400;
const basePeriod = 10000; // 10 SECONDS === 1 YEAR
const baseRad = 0.5; // REM
const maxRad = 1.25; // REM
const baseDistance = 3.5; // REM
const maxDistance = 52.5; // REM
const lastPlanetDistance = 5934456; // KM
const largestPlanetRad = 69911;
const sunPeriod = 0.067;
const sunRad = 696000;
const sunColor = 'radial-gradient(circle at center, #ffd000 1%, #f9b700 39%, #e06317 100%)'

const planets = [
  {
    name: 'mercury',
    period: 0.240846,
    distance: 57909,
    rad: 2440,
    color: '#8993A4'
  },
  {
    name: 'venus',
    period: 0.615,
    distance: 108160,
    rad: 6052,
    color: '#F1B72C'
  },
  {
    name: 'earth',
    period: 1,
    distance: 149600,
    rad: 6371,
    color: '#538FC1'
  },
  {
    name: 'mars',
    period: 1.881,
    distance: 227990,
    rad: 3390,
    color: '#F5805B'
  },
  {
    name: 'jupiter',
    period: 11.86,
    distance: 778360,
    rad: largestPlanetRad,
    color: '#E96B77'
  },
  {
    name: 'saturn',
    period: 29.46,
    distance: 1433500,
    rad: 58232,
    color: '#E7A155'
  },
  {
    name: 'uranus',
    period: 84.01,
    distance: 2872400,
    rad: 25362,
    color: '#86E5F8'
  },
  {
    name: 'neptune',
    period: 164.8,
    distance: 4498400,
    rad: 24622,
    color: '#95B4FB'
  },
  {
    name: 'pluto',
    period: 164.8,
    distance: lastPlanetDistance,
    rad: 1188.3,
    color: '#804000'
  }
]

const orbit3d = [
  { transform: 'translate3d(-50%, -50%, 0) rotateZ(0)' },
  { transform: 'translate3d(-50%, -50%, 0) rotateZ(-360deg)' }
];

const rotation3d = [
  { transform: 'rotateX(-90deg) rotateY(360deg) rotateZ(0)' },
  { transform: 'rotateX(-90deg) rotateY(0) rotateZ(0)' }
];

const rotationY = [
  { transform: 'rotate3d(0, 0, 0, 360deg)' },
  { transform: 'rotate3d(0, 1, 0, 360deg)' }
];

const solarSystem = document.querySelector('.solar-system');

const sunAnimatable = document.createElement('animatable-component');
sunAnimatable.className = 'sun';
sunAnimatable.autoPlay = true;
sunAnimatable.easing = 'linear';
sunAnimatable.iterations = Infinity;
sunAnimatable.keyFrames = orbit3d;
sunAnimatable.duration = basePeriod * sunPeriod;
sunAnimatable.style.background = sunColor;
solarSystem.appendChild(sunAnimatable);

for (let planet of planets) {
  const orbitAnimatable = document.createElement('animatable-component');
  orbitAnimatable.className = planet.name;
  orbitAnimatable.autoPlay = true;
  orbitAnimatable.easing = 'linear';
  orbitAnimatable.iterations = Infinity;
  orbitAnimatable.keyFrames = orbit3d;
  orbitAnimatable.duration = basePeriod * planet.period;
  const planetOrbitSize = orbitSize(planet.distance);
  orbitAnimatable.style.width = planetOrbitSize + 'rem';
  orbitAnimatable.style.height = planetOrbitSize + 'rem';
  
  const planetAnimatable = document.createElement('animatable-component');
  planetAnimatable.autoPlay = true;
  planetAnimatable.easing = 'linear';
  planetAnimatable.iterations = Infinity;
  planetAnimatable.keyFrames = orbit3d;
  planetAnimatable.duration = basePeriod * planet.period;

  const planetBody = document.createElement('div');
  planetBody.className = 'planet';
  const planetSize = objectSize(planet.rad);
  planetBody.style.width = planetSize + 'rem';
  planetBody.style.height = planetSize + 'rem';
  planetBody.style.background = planet.color;
  
  planetAnimatable.appendChild(planetBody);
  orbitAnimatable.appendChild(planetAnimatable);
  
  const info = document.createElement('p')
  info.className = 'info';
  info.innerHTML = planet.name;
  orbitAnimatable.appendChild(info)
  solarSystem.appendChild(orbitAnimatable);
}

/* ----------------------- STARS ----------------------- */

const stars = document.querySelector('.stars');
for (let index = 0; index < totalStars; index++) {
  const starAnimatable = document.createElement('animatable-component');
  starAnimatable.autoPlay = true;
  starAnimatable.className = 'star';
  starAnimatable.iterations = Infinity;
  starAnimatable.style.top = (Math.random() * 100) + 'vh';
  starAnimatable.style.left = (Math.random() * 100) + 'vw';
  starAnimatable.duration = (Math.random() * 20000 + 20000) / 10;
  starAnimatable.delay = Math.random() * 20000 / -10;
  starAnimatable.keyFrames = [
    { offset: 0, opacity: 1 },
    { offset: 0.5, opacity: 0.2 },
    { offset: 1, opacity: 1 },
  ]
  const sizeStar = `${ Math.random() * 0.2 + 0.001 }rem`;
  starAnimatable.style.width = sizeStar;
  starAnimatable.style.height = sizeStar;
  stars.appendChild(starAnimatable);
}

/* ----------------------- SHOOTING STAR ----------------------- */

const shootingStarAnimatable = document.querySelector('.shooting-star');
shootingStar(shootingStarAnimatable);
shootingStarAnimatable.addEventListener("finish", function(event) {
  shootingStar(shootingStarAnimatable);
});


/* ----------------------- FUNCTIONS ----------------------- */

function orbitSize (base) {
  return Math.sqrt(base / lastPlanetDistance) * maxDistance + baseDistance;
}

function objectSize (base) {
  return (base / largestPlanetRad) * maxRad + baseRad;
}

function shootingStar (star) {
  const { offsetWidth, offsetHeight } = solarSystem
  const p1 = {
    x: Math.random() * offsetWidth,
    y: Math.random() * offsetHeight
  }
  const p2 = {
    x: Math.random() * offsetWidth,
    y: Math.random() * offsetHeight
  }
  const deltaY = p2.y - p1.y;
  const deltaX = p2.x - p1.x;
  const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
  const transform = `translate3d(-50%, -50%, 0) rotate(${angle}deg)`
  star.keyFrames = [
    { offset: 0, transform, top: p1.y + 'px', left: p1.x + 'px', opacity: 1, width: 0 },
    { offset: 0.5, transform, opacity: 1, width: '12rem' },
    { offset: 1, transform, top: p2.y + 'px', left: p2.x + 'px', opacity: 0.2, width: '1rem' }
  ];
}

/* ----------------------- UTILITIES ----------------------- */

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}
function toggleFullscreen() {
  if (
    document.fullscreenElement || 
    document.mozFullScreenElement || 
    document.webkitFullscreenElement || 
    document.msFullscreenElement 
  ) {
    closeFullscreen();
  } else {
    const element = document.documentElement;
    if (element.requestFullScreen) {
      element.requestFullScreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    }
  }
}
solarSystem.addEventListener("dblclick", toggleFullscreen);
