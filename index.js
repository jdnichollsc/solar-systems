/**
 * Happy International Astronomy Day 2020! 🔭🌌💫
 * <animatable/> WebComponent => https://github.com/proyecto26/animatable-component
 */
"use strict";

/* ----------------------- SOLAR SYSTEM ----------------------- */
const sun = {
  period: 0.067,
  rad: 696000,
  color: 'radial-gradient(circle at center, #ffd000 1%, #f9b700 39%, #e06317 100%)'
};
const lastPlanetDistance = 5934456; // KM
const largestPlanetRad = 69911;
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
];
const defaultOptions = {
  basePeriod: 10000, // 10 SECONDS == 1 YEAR
  baseRad: 0.5, // REM
  maxRad: 1.25, // REM
  baseDistance: 3.5, // REM
  maxDistance: 52.5, // REM
  lastPlanetDistance,
  largestPlanetRad,
  sun,
  planets
};
const orbit3d = [
  { transform: 'translate3d(-50%, -50%, 0) rotateZ(0)' },
  { transform: 'translate3d(-50%, -50%, 0) rotateZ(-360deg)' }
];

function createSolarSystem (element, options) { 
  const solarSystem = element || document.querySelector('.solar-system');
  const solarSystemOptions = Object.assign({}, defaultOptions, options);
  const sunAnimatable = document.createElement('animatable-component');
  sunAnimatable.className = 'sun';
  sunAnimatable.autoPlay = true;
  sunAnimatable.easing = 'linear';
  sunAnimatable.iterations = Infinity;
  sunAnimatable.keyFrames = orbit3d;
  sunAnimatable.duration = solarSystemOptions.basePeriod * solarSystemOptions.sun.period;
  sunAnimatable.style.background = solarSystemOptions.sun.color;
  solarSystem.appendChild(sunAnimatable);

  for (let planet of solarSystemOptions.planets) {
    const orbitAnimatable = document.createElement('animatable-component');
    orbitAnimatable.className = planet.name;
    orbitAnimatable.autoPlay = true;
    orbitAnimatable.easing = 'linear';
    orbitAnimatable.iterations = Infinity;
    orbitAnimatable.keyFrames = orbit3d;
    orbitAnimatable.duration = solarSystemOptions.basePeriod * planet.period;
    const planetOrbitSize = orbitSize(planet.distance);
    orbitAnimatable.style.width = planetOrbitSize + 'rem';
    orbitAnimatable.style.height = planetOrbitSize + 'rem';

    const planetAnimatable = document.createElement('animatable-component');
    planetAnimatable.autoPlay = true;
    planetAnimatable.easing = 'linear';
    planetAnimatable.iterations = Infinity;
    planetAnimatable.keyFrames = orbit3d;
    planetAnimatable.duration = solarSystemOptions.basePeriod * planet.period;

    const planetBody = document.createElement('div');
    planetBody.className = 'planet';
    const planetSize = objectSize(planet.rad);
    planetBody.style.width = planetSize + 'rem';
    planetBody.style.height = planetSize + 'rem';
    planetBody.style.background = planet.color;

    planetAnimatable.appendChild(planetBody);
    orbitAnimatable.appendChild(planetAnimatable);

    const info = document.createElement('p');
    info.className = 'info';
    info.innerHTML = planet.name;
    orbitAnimatable.appendChild(info);
    solarSystem.appendChild(orbitAnimatable);
  }
  
  function orbitSize (base) {
    const { lastPlanetDistance, maxDistance, baseDistance } = solarSystemOptions;
    return Math.sqrt(base / lastPlanetDistance) * maxDistance + baseDistance;
  }

  function objectSize (base) {
    const { largestPlanetRad, maxRad, baseRad } = solarSystemOptions;
    return (base / largestPlanetRad) * maxRad + baseRad;
  }
}
/* ----------------------- STARS ----------------------- */
function createStars(element, totalStars = 400) {
  const stars = element || document.querySelector('.stars');
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
}
  
/* ----------------------- SHOOTING STAR ----------------------- */
function createShootingStar(element) {
  const shootingStarAnimatable = element || document.querySelector('.shooting-star');
  shootingStar(shootingStarAnimatable);
  shootingStarAnimatable.addEventListener("finish", function(event) {
    shootingStar(shootingStarAnimatable);
  });
}

/* ----------------------- FUNCTIONS ----------------------- */

function shootingStar (element) {
  const { innerWidth, innerHeight } = window
  const p1 = {
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight
  }
  const p2 = {
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight
  }
  const deltaY = p2.y - p1.y;
  const deltaX = p2.x - p1.x;
  const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
  const transform = `translate3d(-50%, -50%, 0) rotate(${angle}deg)`
  element.keyFrames = [
    { offset: 0, transform, top: p1.y + 'px', left: p1.x + 'px', opacity: 1, width: 0 },
    { offset: 0.5, transform, opacity: 1, width: '12rem' },
    { offset: 1, transform, top: p2.y + 'px', left: p2.x + 'px', opacity: 0.2, width: '1rem' }
  ];
}
