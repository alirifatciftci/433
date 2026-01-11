# FootyQuiz - Football Quiz Game

Modern futbol quiz oyunu. Docker, PostgreSQL, React ve Node.js ile geliştirilmiştir.

## 🚀 Özellikler

### 🎮 Oyun Modları

- **Guess the Player**: Oyuncu tahmin oyunu
- **Common Player**: İki takım arası ortak oyuncu bulma
- **Grid Game**: Futbol grid oyunu
- **Transfer Trivia**: Transfer bilgi yarışması
- **Daily Challenge**: Günlük meydan okuma sistemi

### 🏆 Daily Challenge Sistemi

- Her gün yeni challenge
- Kullanıcı skor sistemi
- Günlük/haftalık/tüm zamanlar leaderboard
- Gerçek zamanlı sıralama

### 🛠 Teknoloji Stack

- **Frontend**: React, Styled Components, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose
- **Future**: RabbitMQ, Kubernetes

## 📦 Kurulum

### Gereksinimler

- Docker Desktop
- Git

### Hızlı Başlangıç

1. **Repository'yi klonlayın:**

```bash
git clone <repository-url>
cd footyquiz
```

2. **Docker container'ları başlatın:**

```bash
docker-compose up -d
```

3. **Uygulamayı açın:**

- Web App: http://localhost:3000
- API: http://localhost:5000
- Database Admin: http://localhost:8081

### Veritabanı Bilgileri

- **Host**: localhost:5432
- **Database**: footyquiz
- **Username**: footyquiz_user
- **Password**: footyquiz_pass

## 🏗 Proje Yapısı

```
footyquiz/
├── footyquiz-web/          # React Frontend
│   ├── src/
│   │   ├── components/     # React bileşenleri
│   │   ├── services/       # API servisleri
│   │   └── data/          # Statik veriler
│   ├── Dockerfile
│   └── package.json
├── footyquiz-api/          # Node.js Backend
│   ├── server.js          # Express server
│   ├── Dockerfile
│   └── package.json
├── init-db/               # PostgreSQL init scripts
│   ├── 01-create-tables.sql
│   ├── 02-insert-sample-data.sql
│   ├── 03-insert-all-players.sql
│   ├── 04-performance-optimizations.sql
│   ├── 05-add-missing-teams.sql
│   ├── 06-user-system.sql
│   └── 07-sample-scores.sql
└── docker-compose.yml     # Docker orchestration
```

## 🎯 API Endpoints

### Oyuncular

- `GET /api/players` - Tüm oyuncular
- `GET /api/players/random` - Rastgele oyuncu
- `GET /api/players/team/:teamId` - Takıma göre oyuncular
- `GET /api/players/common/:team1/:team2` - Ortak oyuncular

### Daily Challenge

- `GET /api/daily-challenge` - Bugünün challenge'ı
- `POST /api/daily-challenge/result` - Sonuç kaydet
- `GET /api/users/:userId/daily-status` - Kullanıcı durumu

### Leaderboard

- `GET /api/leaderboard/daily` - Günlük sıralama
- `GET /api/leaderboard/weekly` - Haftalık sıralama
- `GET /api/leaderboard/all-time` - Tüm zamanlar

### Kullanıcılar

- `POST /api/users` - Kullanıcı oluştur/getir
- `GET /api/users/:username` - Kullanıcı bilgileri

## 🗄 Veritabanı Şeması

### Tablolar

- **users**: Kullanıcı bilgileri
- **players**: Oyuncu verileri (50 oyuncu)
- **teams**: Takım verileri (38 takım)
- **daily_challenges**: Günlük challenge'lar
- **user_daily_results**: Kullanıcı sonuçları
- **game_scores**: Genel oyun skorları

## 🔧 Development

### Container'ları Yeniden Build Etme

```bash
docker-compose up --build -d
```

### Logları İzleme

```bash
docker-compose logs -f web
docker-compose logs -f api
docker-compose logs -f postgres
```

### Veritabanına Bağlanma

```bash
docker exec -it footyquiz-postgres psql -U footyquiz_user -d footyquiz
```

## 🚀 Gelecek Özellikler

- [ ] RabbitMQ entegrasyonu (gerçek zamanlı güncellemeler)
- [ ] Kubernetes deployment
- [ ] Kullanıcı authentication sistemi
- [ ] Sosyal özellikler (arkadaş ekleme, paylaşım)
- [ ] Mobil uygulama (React Native)
- [ ] Çoklu dil desteği
- [ ] Gelişmiş istatistikler

## 📊 Performans

- **50 oyuncu** verisi optimize edilmiş indekslerle
- **Tüm sorgular 1ms altında** çalışıyor
- **500+ oyuncuya** kadar ölçeklenebilir
- **PostgreSQL connection pooling** hazır

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**Ali Rıfat Çiftçi**

- LinkedIn: [alirifatciftci](https://www.linkedin.com/in/alirifatciftci)

---

⚽ **FootyQuiz** - Futbol tutkunları için modern quiz deneyimi!
