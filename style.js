*,
*::before,
*::after {
  box-sizing: inherit;
}

html, body, .stars, .solar-system {
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
  font-size: 26px;
}

body {
  background-color: #020040;
}

animatable-component {
  display: block;
  position: relative;
  transform-style: preserve-3d;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.stars {
  position: absolute;
}

.solar-system {
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
  perspective-origin: 50% 50%;
}

.planet {
  overflow: visible;
  border-radius: 50%;
  transform-style: preserve-3d;
  position: absolute;
  top: 50%;
  left: 0%;
  transform: translate3d(-50%, -50%, 0);
}

.solar-system animatable-component {
  display: block;
  overflow: visible;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  border-radius: 50%;
  transform-style: preserve-3d;
  border: .05rem solid rgba(190, 190, 190, .1);
}

.sun {
  width: 4rem;
  height: 4rem;
  box-shadow: 0 0 60px rgba(255, 160, 60, 0.4);
}

.saturn .planet {
  box-shadow: 0 0 0 0.2rem #181818, 0 0 0 0.4rem rgba(231, 161, 85, .2), 0 0 0 0.5rem rgba(231, 161, 85, .1), 0 0 0 0.7rem rgba(231, 161, 85, .1);
}

.info {
  z-index: 999;
  color: white;
  font-size: .3rem;
  font-weight: 900;
  text-transform: uppercase;
  position: absolute;
  right: 0;
  bottom: 50%;
  transform: translate3d(50%, 0, 0) rotate(-30deg);
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
}

.star {
  position: absolute;
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 50%;
  background-color: lightblue;
}

.shooting-star {
  display: block;
  width: 0;
  height: 1px;
  background: linear-gradient(-135deg, rgb(221,201,255) 0%, rgba(221,201,255, 0) 100%);
  position: absolute;
  top: 50vh;
  left: 50vw;
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) rotate(-45deg);
}
