// Takım veritabanı
export const TEAMS = {
    // Premier League
    50: { id: 50, name: 'Manchester City', logo: 'https://media.api-sports.io/football/teams/50.png', league: 'Premier League' },
    40: { id: 40, name: 'Liverpool', logo: 'https://media.api-sports.io/football/teams/40.png', league: 'Premier League' },
    42: { id: 42, name: 'Arsenal', logo: 'https://media.api-sports.io/football/teams/42.png', league: 'Premier League' },
    33: { id: 33, name: 'Manchester United', logo: 'https://media.api-sports.io/football/teams/33.png', league: 'Premier League' },
    49: { id: 49, name: 'Chelsea', logo: 'https://media.api-sports.io/football/teams/49.png', league: 'Premier League' },
    47: { id: 47, name: 'Tottenham', logo: 'https://media.api-sports.io/football/teams/47.png', league: 'Premier League' },
    66: { id: 66, name: 'Aston Villa', logo: 'https://media.api-sports.io/football/teams/66.png', league: 'Premier League' },
    48: { id: 48, name: 'West Ham', logo: 'https://media.api-sports.io/football/teams/48.png', league: 'Premier League' },
    34: { id: 34, name: 'Newcastle', logo: 'https://media.api-sports.io/football/teams/34.png', league: 'Premier League' },

    // La Liga
    541: { id: 541, name: 'Real Madrid', logo: 'https://media.api-sports.io/football/teams/541.png', league: 'La Liga' },
    529: { id: 529, name: 'Barcelona', logo: 'https://media.api-sports.io/football/teams/529.png', league: 'La Liga' },
    530: { id: 530, name: 'Atletico Madrid', logo: 'https://media.api-sports.io/football/teams/530.png', league: 'La Liga' },
    536: { id: 536, name: 'Sevilla', logo: 'https://media.api-sports.io/football/teams/536.png', league: 'La Liga' },

    // Bundesliga
    157: { id: 157, name: 'Bayern Munich', logo: 'https://media.api-sports.io/football/teams/157.png', league: 'Bundesliga' },
    165: { id: 165, name: 'Borussia Dortmund', logo: 'https://media.api-sports.io/football/teams/165.png', league: 'Bundesliga' },
    168: { id: 168, name: 'Bayer Leverkusen', logo: 'https://media.api-sports.io/football/teams/168.png', league: 'Bundesliga' },
    173: { id: 173, name: 'RB Leipzig', logo: 'https://media.api-sports.io/football/teams/173.png', league: 'Bundesliga' },

    // Serie A
    489: { id: 489, name: 'AC Milan', logo: 'https://media.api-sports.io/football/teams/489.png', league: 'Serie A' },
    492: { id: 492, name: 'Napoli', logo: 'https://media.api-sports.io/football/teams/492.png', league: 'Serie A' },
    496: { id: 496, name: 'Juventus', logo: 'https://media.api-sports.io/football/teams/496.png', league: 'Serie A' },
    505: { id: 505, name: 'Inter Milan', logo: 'https://media.api-sports.io/football/teams/505.png', league: 'Serie A' },
    497: { id: 497, name: 'AS Roma', logo: 'https://media.api-sports.io/football/teams/497.png', league: 'Serie A' },

    // Ligue 1
    85: { id: 85, name: 'PSG', logo: 'https://media.api-sports.io/football/teams/85.png', league: 'Ligue 1' },
    91: { id: 91, name: 'Monaco', logo: 'https://media.api-sports.io/football/teams/91.png', league: 'Ligue 1' },

    // Super Lig
    645: { id: 645, name: 'Galatasaray', logo: 'https://media.api-sports.io/football/teams/645.png', league: 'Super Lig' },

    // Portekiz
    212: { id: 212, name: 'Sporting CP', logo: 'https://media.api-sports.io/football/teams/212.png', league: 'Primeira Liga' },
    211: { id: 211, name: 'Benfica', logo: 'https://media.api-sports.io/football/teams/211.png', league: 'Primeira Liga' },

    // Diğer
    1: { id: 1, name: 'Molde', logo: 'https://media.api-sports.io/football/teams/1.png', league: 'Eliteserien' },
    569: { id: 569, name: 'RB Salzburg', logo: 'https://media.api-sports.io/football/teams/569.png', league: 'Austrian Bundesliga' },
    80: { id: 80, name: 'Lyon', logo: 'https://media.api-sports.io/football/teams/80.png', league: 'Ligue 1' },
    79: { id: 79, name: 'Lille', logo: 'https://media.api-sports.io/football/teams/79.png', league: 'Ligue 1' },
};

export const getTeamById = (id) => TEAMS[id] || null;
