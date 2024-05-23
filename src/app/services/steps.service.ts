import { Injectable } from '@angular/core';
import { Partner } from '../models/partner';
import { TeamStatistics } from '../models/teamStatistics';

@Injectable({
  providedIn: 'root',
})
export class StepsService {
  constructor() {}

  stepOne(parseCsvData: Partner[]): number {
    return parseCsvData.length;
  }

  stepTwo(parseCsvData: Partner[]) {
    const partnerRacing = parseCsvData.filter(
      (partner) => partner.team.toLowerCase() === 'racing'
    );

    const totalAges = partnerRacing.reduce(
      (acc, partner) => acc + partner.age,
      0
    );
    const averageAges = (totalAges / partnerRacing.length).toFixed(2);

    return averageAges;
  }

  stepThree(parseCsvData: Partner[]) {
    const partnersMarriedUniversity = parseCsvData
      .filter(
        (partner) =>
          partner.civilStatus.toLowerCase() === 'casado' &&
          partner.levelStudy.toLowerCase() === 'universitario'
      )
      .sort((a, b) => a.age - b.age)
      .slice(0, 100)
      .map((partner) => ({
        name: partner.name,
        age: partner.age,
        team: partner.team,
      }));

    return partnersMarriedUniversity;
  }

  stepFour(parseCsvData: Partner[]) {
    const partnerRiver = parseCsvData
      .filter((partner) => partner.team.toLowerCase() === 'river')
      .reduce((acc, partner) => {
        acc[partner.name] = (acc[partner.name] || 0) + 1;
        return acc;
      }, {} as { [name: string]: number });

    const sortedNames = Object.entries(partnerRiver)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name]) => name);

    return sortedNames;
  }

  stepFive(parseCsvData: Partner[]): TeamStatistics[] {
    const teams = parseCsvData.reduce((acc, partner) => {
      if (!acc[partner.team]) {
        acc[partner.team] = [];
      }
      acc[partner.team].push(partner);
      return acc;
    }, {} as { [team: string]: { name: string; age: number; team: string; civilStatus: string; levelStudy: string }[] });

    const teamStatistics = Object.keys(teams)
      .map((team) => {
        const socios = teams[team];
        const amount = socios.length;
        const edades = socios.map((socio) => socio.age);
        const totalEdades = edades.reduce(
          (acumulador, age) => acumulador + age,
          0
        );
        const averageAge = (totalEdades / amount).toFixed(2);
        const minorAge = Math.min(...edades);
        const older = Math.max(...edades);
        return { team, amount, averageAge, minorAge, older };
      })
      .sort((a, b) => b.amount - a.amount);

    return teamStatistics;
  }
}
