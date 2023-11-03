import { juliandays, Earth } from 'aa-js';

export function ageInYears(startdate) {
    const startjd = juliandays.getJulianDay(startdate)

    const nowjd = juliandays.getJulianDay()

    const degreediff = Earth.getEclipticLongitudinalRotation(startjd, nowjd)

    return (degreediff/360)
}