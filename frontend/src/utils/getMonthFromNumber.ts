export default function getMonthFromNumber(monthNumber: number): string {
    const monthNames = [
        "Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
    return monthNames[monthNumber - 1];
}