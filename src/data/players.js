// Oyuncu veritabanı - Güncel takımlar + Önceki takımlar (Aralık 2024)
export const PLAYERS = [
    {
        id: 1,
        name: 'Erling Haaland',
        nationality: 'NO',
        nationalityFlag: 'https://flagcdn.com/w80/no.png',
        league: 'Premier League',
        leagueLogo: 'https://media.api-sports.io/football/leagues/39.png',
        team: 'Manchester City',
        teamId: 50,
        teamLogo: 'https://media.api-sports.io/football/teams/50.png',
        previousTeams: [1, 569, 165], // Molde → Salzburg → Dortmund → Man City
        position: 'FW',
        age: 24,
        shirtNumber: 9,
    },
    {
        id: 2,
        name: 'Kylian Mbappe',
        nationality: 'FR',
        nationalityFlag: 'https://flagcdn.com/w80/fr.png',
        league: 'La Liga',
        leagueLogo: 'https://media.api-sports.io/football/leagues/140.png',
        team: 'Real Madrid',
        teamId: 541,
        teamLogo: 'https://media.api-sports.io/football/teams/541.png',
        previousTeams: [91, 85], // Monaco → PSG → Real Madrid
        position: 'FW',
        age: 25,
        shirtNumber: 9,
    },
    {
        id: 3,
        name: 'Jude Bellingham',
        nationality: 'GB',
        nationalityFlag: 'https://flagcdn.com/w80/gb-eng.png',
        league: 'La Liga',
        leagueLogo: 'https://media.api-sports.io/football/leagues/140.png',
        team: 'Real Madrid',
        teamId: 541,
        teamLogo: 'https://media.api-sports.io/football/teams/541.png',
        previousTeams: [165], // Dortmund
        position: 'MF',
        age: 21,
        shirtNumber: 5,
    },
    {
        id: 4,
        name: 'Vinicius Junior',
        nationality: 'BR',
        nationalityFlag: 'https://flagcdn.com/w80/br.png',
        league: 'La Liga',
        leagueLogo: 'https://media.api-sports.io/football/leagues/140.png',
        team: 'Real Madrid',
        teamId: 541,
        teamLogo: 'https://media.api-sports.io/football/teams/541.png',
        previousTeams: [],
        position: 'FW',
        age: 24,
        shirtNumber: 7,
    },
    {
        id: 5,
        name: 'Mohamed Salah',
        nationality: 'EG',
        nationalityFlag: 'https://flagcdn.com/w80/eg.png',
        league: 'Premier League',
        leagueLogo: 'https://media.api-sports.io/football/leagues/39.png',
        team: 'Liverpool',
        teamId: 40,
        teamLogo: 'https://media.api-sports.io/football/teams/40.png',
        previousTeams: [49, 497], // Chelsea → Roma → Liverpool
        position: 'FW',
        age: 32,
        shirtNumber: 11,
    },
    {
        id: 6,
        name: 'Kevin De Bruyne',
        nationality: 'BE',
        nationalityFlag: 'https://flagcdn.com/w80/be.png',
        league: 'Serie A',
        leagueLogo: 'https://media.api-sports.io/football/leagues/135.png',
        team: 'Napoli',
        teamId: 492,
        teamLogo: 'https://media.api-sports.io/football/teams/492.png',
        previousTeams: [49, 50], // Chelsea → Man City → Napoli
        position: 'MF',
        age: 33,
        shirtNumber: 17,
    },
    {
        id: 7,
        name: 'Bukayo Saka',
        nationality: 'GB',
        nationalityFlag: 'https://flagcdn.com/w80/gb-eng.png',
        league: 'Premier League',
        leagueLogo: 'https://media.api-sports.io/football/leagues/39.png',
        team: 'Arsenal',
        teamId: 42,
        teamLogo: 'https://media.api-sports.io/football/teams/42.png',
        previousTeams: [],
        position: 'FW',
        age: 23,
        shirtNumber: 7,
    },
    {
        id: 8,
        name: 'Rodri',
        nationality: 'ES',
        nationalityFlag: 'https://flagcdn.com/w80/es.png',
        league: 'Premier League',
        leagueLogo: 'https://media.api-sports.io/football/leagues/39.png',
        team: 'Manchester City',
        teamId: 50,
        teamLogo: 'https://media.api-sports.io/football/teams/50.png',
        previousTeams: [530], // Atletico Madrid
        position: 'MF',
        age: 28,
        shirtNumber: 16,
    },
    {
        id: 9,
        name: 'Lamine Yamal',
        nationality: 'ES',
        nationalityFlag: 'https://flagcdn.com/w80/es.png',
        league: 'La Liga',
        leagueLogo: 'https://media.api-sports.io/football/leagues/140.png',
        team: 'Barcelona',
        teamId: 529,
        teamLogo: 'https://media.api-sports.io/football/teams/529.png',
        previousTeams: [],
        position: 'FW',
        age: 17,
        shirtNumber: 19,
    },
    {
        id: 10,
        name: 'Robert Lewandowski',
        nationality: 'PL',
        nationalityFlag: 'https://flagcdn.com/w80/pl.png',
        league: 'La Liga',
        leagueLogo: 'https://media.api-sports.io/football/leagues/140.png',
        team: 'Barcelona',
        teamId: 529,
        teamLogo: 'https://media.api-sports.io/football/teams/529.png',
        previousTeams: [165, 157], // Dortmund → Bayern → Barcelona
        position: 'FW',
        age: 36,
        shirtNumber: 9,
    },
    {
        id: 11,
        name: 'Harry Kane',
        nationality: 'GB',
        nationalityFlag: 'https://flagcdn.com/w80/gb-eng.png',
        league: 'Bundesliga',
        leagueLogo: 'https://media.api-sports.io/football/leagues/78.png',
        team: 'Bayern Munich',
        teamId: 157,
        teamLogo: 'https://media.api-sports.io/football/teams/157.png',
        previousTeams: [47], // Tottenham
        position: 'FW',
        age: 31,
        shirtNumber: 9,
    },
    {
        id: 12,
        name: 'Jamal Musiala',
        nationality: 'DE',
        nationalityFlag: 'https://flagcdn.com/w80/de.png',
        league: 'Bundesliga',
        leagueLogo: 'https://media.api-sports.io/football/leagues/78.png',
        team: 'Bayern Munich',
        teamId: 157,
        teamLogo: 'https://media.api-sports.io/football/teams/157.png',
        previousTeams: [49], // Chelsea youth
        position: 'MF',
        age: 21,
        shirtNumber: 42,
    },
    {
        id: 13,
        name: 'Cole Palmer',
        nationality: 'GB',
        nationalityFlag: 'https://flagcdn.com/w80/gb-eng.png',
        league: 'Premier League',
        leagueLogo: 'https://media.api-sports.io/football/leagues/39.png',
        team: 'Chelsea',
        teamId: 49,
        teamLogo: 'https://media.api-sports.io/football/teams/49.png',
        previousTeams: [50], // Man City
        position: 'MF',
        age: 22,
        shirtNumber: 20,
    },
    {
        id: 14,
        name: 'Phil Foden',
        nationality: 'GB',
        nationalityFlag: 'https://flagcdn.com/w80/gb-eng.png',
        league: 'Premier League',
        leagueLogo: 'https://media.api-sports.io/football/leagues/39.png',
        team: 'Manchester City',
        teamId: 50,
        teamLogo: 'https://media.api-sports.io/football/teams/50.png',
        previousTeams: [],
        position: 'MF',
        age: 24,
        shirtNumber: 47,
    },
    {
        id: 15,
        name: 'Bruno Fernandes',
        nationality: 'PT',
        nationalityFlag: 'https://flagcdn.com/w80/pt.png',
        league: 'Premier League',
        leagueLogo: 'https://media.api-sports.io/football/leagues/39.png',
        team: 'Manchester United',
        teamId: 33,
        teamLogo: 'https://media.api-sports.io/football/teams/33.png',
        previousTeams: [212], // Sporting
        position: 'MF',
        age: 30,
        shirtNumber: 8,
    },
    {
        id: 16,
        name: 'Victor Osimhen',
        nationality: 'NG',
        nationalityFlag: 'https://flagcdn.com/w80/ng.png',
        league: 'Super Lig',
        leagueLogo: 'https://media.api-sports.io/football/leagues/203.png',
        team: 'Galatasaray',
        teamId: 645,
        teamLogo: 'https://media.api-sports.io/football/teams/645.png',
        previousTeams: [79, 492], // Lille → Napoli → Galatasaray
        position: 'FW',
        age: 25,
        shirtNumber: 45,
    },
    {
        id: 17,
        name: 'Son Heung-min',
        nationality: 'KR',
        nationalityFlag: 'https://flagcdn.com/w80/kr.png',
        league: 'Premier League',
        leagueLogo: 'https://media.api-sports.io/football/leagues/39.png',
        team: 'Tottenham',
        teamId: 47,
        teamLogo: 'https://media.api-sports.io/football/teams/47.png',
        previousTeams: [168], // Leverkusen
        position: 'FW',
        age: 32,
        shirtNumber: 7,
    },
    {
        id: 18,
        name: 'Virgil van Dijk',
        nationality: 'NL',
        nationalityFlag: 'https://flagcdn.com/w80/nl.png',
        league: 'Premier League',
        leagueLogo: 'https://media.api-sports.io/football/leagues/39.png',
        team: 'Liverpool',
        teamId: 40,
        teamLogo: 'https://media.api-sports.io/football/teams/40.png',
        previousTeams: [], // Southampton dahil degil
        position: 'DF',
        age: 33,
        shirtNumber: 4,
    },
    {
        id: 19,
        name: 'Arda Guler',
        nationality: 'TR',
        nationalityFlag: 'https://flagcdn.com/w80/tr.png',
        league: 'La Liga',
        leagueLogo: 'https://media.api-sports.io/football/leagues/140.png',
        team: 'Real Madrid',
        teamId: 541,
        teamLogo: 'https://media.api-sports.io/football/teams/541.png',
        previousTeams: [], // Fenerbahce dahil degil (teams listesinde yok)
        position: 'MF',
        age: 19,
        shirtNumber: 15,
    },
    {
        id: 20,
        name: 'Declan Rice',
        nationality: 'GB',
        nationalityFlag: 'https://flagcdn.com/w80/gb-eng.png',
        league: 'Premier League',
        leagueLogo: 'https://media.api-sports.io/football/leagues/39.png',
        team: 'Arsenal',
        teamId: 42,
        teamLogo: 'https://media.api-sports.io/football/teams/42.png',
        previousTeams: [48], // West Ham
        position: 'MF',
        age: 25,
        shirtNumber: 41,
    },
];


// Rastgele oyuncu seç
export const getRandomPlayer = () => {
    return PLAYERS[Math.floor(Math.random() * PLAYERS.length)];
};

// Oyuncunun tüm takımlarını getir (mevcut + önceki)
export const getAllTeamsForPlayer = (player) => {
    return [player.teamId, ...player.previousTeams];
};

// İki takımda da oynamış oyuncuları bul
export const findCommonPlayers = (teamId1, teamId2) => {
    return PLAYERS.filter(player => {
        const allTeams = getAllTeamsForPlayer(player);
        return allTeams.includes(teamId1) && allTeams.includes(teamId2);
    });
};

// Common Player oyunu için rastgele iki takım seç (en az 1 ortak oyuncu olmalı)
export const getRandomCommonPlayerChallenge = () => {
    const teamIds = [...new Set(PLAYERS.flatMap(p => getAllTeamsForPlayer(p)))];

    let attempts = 0;
    while (attempts < 100) {
        const team1 = teamIds[Math.floor(Math.random() * teamIds.length)];
        const team2 = teamIds[Math.floor(Math.random() * teamIds.length)];

        if (team1 !== team2) {
            const commonPlayers = findCommonPlayers(team1, team2);
            if (commonPlayers.length > 0) {
                return { team1, team2, commonPlayers };
            }
        }
        attempts++;
    }
    return null;
};
