import { juliandays } from 'aa-js';
import * as Earth from "./astronomy.js"

export function ageInYears(startdate) {
    const startjd = juliandays.getJulianDay(startdate)
    const startcoords = Earth.getEclipticLongitude(startjd)

    const nowjd = juliandays.getJulianDay()
    const nowcoords = Earth.getEclipticLongitude(nowjd)

    const degreediff = (nowcoords - startcoords)

    return (degreediff/360)
}

export function agingVelocity(now=null) {
    const nowjd = juliandays.getJulianDay()
    const velocity = Earth.getEclipticLongitudalVelocity(nowjd);
    return velocity / 360;
}