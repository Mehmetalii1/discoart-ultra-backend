const path = require('path');
const express = require('express');
const app = express();
const userRoutes = require(path.join(__dirname, 'routes/userRoutes'));

// Body verisini JSON olarak alabilmek için
app.use(express.json());

// Kullanıcı API rotalarını kullan
app.use('/api', userRoutes);

// Ana Sayfa (Opsiyonel)
app.get('/', (req, res) => {
    res.send('DiscoArt Ultra Backend Çalışıyor!');
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
