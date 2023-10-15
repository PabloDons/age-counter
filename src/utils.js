import { juliandays, Earth } from 'aa-js';

export function ageInYears(year, monthIndex, day, now=null) {
    const startdate = new Date(year, monthIndex, day)
    const nowdate = new Date();

    const startjd = juliandays.getJulianDay(startdate)
    const startcoords = Earth.getEclipticLongitude(startjd)

    const nowjd = juliandays.getJulianDay()
    const nowcoords = Earth.getEclipticLongitude(nowjd)

    let yeardiff = (nowdate.getFullYear() - startdate.getFullYear())
    const degreediff = (nowcoords - startcoords)

    const startdate_nowyear = new Date(nowdate.getFullYear(), monthIndex, day)
    const alongyeardiff = nowdate - startdate_nowyear

    // if degreediff negative while year did not switch
    if (degreediff < 0 && alongyeardiff > 0) {
        yeardiff += 1
    }

    // if year switched while degreediff not netagive
    if (alongyeardiff < 0 && degreediff >= 0) {
        yeardiff += 1
    }

    return yeardiff + (degreediff/360)
}
