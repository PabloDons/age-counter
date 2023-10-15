import {
  gB0EarthCoefficients,
  gB1EarthCoefficients,
  gB1EarthCoefficientsJ2000,
  gB2EarthCoefficientsJ2000,
  gB3EarthCoefficientsJ2000,
  gB4EarthCoefficientsJ2000,
  gL0EarthCoefficients,
  gL1EarthCoefficients,
  gL1EarthCoefficientsJ2000,
  gL2EarthCoefficients,
  gL2EarthCoefficientsJ2000,
  gL3EarthCoefficients,
  gL3EarthCoefficientsJ2000,
  gL4EarthCoefficients,
  gL4EarthCoefficientsJ2000,
  gL5EarthCoefficients,
  gR0EarthCoefficients,
  gR1EarthCoefficients,
  gR2EarthCoefficients,
  gR3EarthCoefficients,
  gR4EarthCoefficients,
} from "./earthcoeff.js";

const RAD2DEG = 57.295779513082320876798154814105;

export function getEclipticLongitude(jd) {
  const tau = (jd - 2451545) / 365250; // julian day millennia, not centuries!
  const tau2 = tau * tau;
  const tau3 = tau2 * tau;
  const tau4 = tau3 * tau;
  const tau5 = tau4 * tau;

  // AA p.218: Values A are expressed in 10^-8 radians, while B and C values are in radians.

  const L0 = gL0EarthCoefficients.reduce((sum, val) => sum + val.A * Math.cos(val.B + val.C * tau), 0);
  const L1 = gL1EarthCoefficients.reduce((sum, val) => sum + val.A * Math.cos(val.B + val.C * tau), 0);
  const L2 = gL2EarthCoefficients.reduce((sum, val) => sum + val.A * Math.cos(val.B + val.C * tau), 0);
  const L3 = gL3EarthCoefficients.reduce((sum, val) => sum + val.A * Math.cos(val.B + val.C * tau), 0);
  const L4 = gL4EarthCoefficients.reduce((sum, val) => sum + val.A * Math.cos(val.B + val.C * tau), 0);
  const L5 = gL5EarthCoefficients.reduce((sum, val) => sum + val.A * Math.cos(val.B + val.C * tau), 0);

  const value = (L0 + L1 * tau + L2 * tau2 + L3 * tau3 + L4 * tau4 + L5 * tau5) / 1e8;

  return value * RAD2DEG;
}

export function getEclipticLongitudalVelocity(jd) {
  const tau = (jd - 2451545) / 365250; // julian day millennia, not centuries!
  const tau2 = tau * tau;
  const tau3 = tau2 * tau;
  const tau4 = tau3 * tau;

  // AA p.218: Values A are expressed in 10^-8 radians, while B and C values are in radians.

  const L1 = gL1EarthCoefficients.reduce((sum, val) => sum + val.A * Math.cos(val.B + val.C * tau), 0);
  const L2 = gL2EarthCoefficients.reduce((sum, val) => sum + val.A * Math.cos(val.B + val.C * tau), 0);
  const L3 = gL3EarthCoefficients.reduce((sum, val) => sum + val.A * Math.cos(val.B + val.C * tau), 0);
  const L4 = gL4EarthCoefficients.reduce((sum, val) => sum + val.A * Math.cos(val.B + val.C * tau), 0);
  const L5 = gL5EarthCoefficients.reduce((sum, val) => sum + val.A * Math.cos(val.B + val.C * tau), 0);

  const value = (L1 + 2 * L2 * tau + 3 * L3 * tau2 + 4 * L4 * tau3 + 5 * L5 * tau4) / 1e8;

  return (value * RAD2DEG) / 1000; // degrees per year
}
