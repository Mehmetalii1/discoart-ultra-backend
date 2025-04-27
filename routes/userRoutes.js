const express = require('express');
const router = express.Router();
const { addUser, getUser, updateUser } = require('../services/memoryService');
const { validateUserData } = require('../utils/validateUserData');

// Kullanıcı kaydı (Register)
router.post('/register', (req, res) => {
    try {
        const userData = req.body;
        validateUserData(userData);

        const userId = generateUniqueId();
        const yeniKullanici = {
            profil: {
                ad: userData.ad,
                yas: userData.yas,
                favoriTarz: userData.favoriTarz,
                kayitTarihi: new Date().toISOString()
            },
            teknikSeviye: {
                perspektif: 1,
                anatomi: 1,
                ifade: 1,
                kompozisyon: 1
            },
            gelisimKaydi: [],
            moralTakibi: [],
            aktifGorev: {}
        };

        addUser(userId, yeniKullanici);

        res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu.', userId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Kullanıcı bilgilerini getir
router.get('/user/:id', (req, res) => {
    try {
        const user = getUser(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Sunucu hatası.' });
    }
});

// Kullanıcı güncelle
router.put('/update/:id', (req, res) => {
    try {
        const updateData = req.body;
        updateUser(req.params.id, updateData);
        res.json({ message: 'Kullanıcı başarıyla güncellendi.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Benzersiz kullanıcı ID üretici
function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}

module.exports = router;
