function validateUserData(userData) {
    const { ad, yas, favoriTarz } = userData;

    if (!ad || typeof ad !== 'string' || ad.length < 2) {
        throw new Error('Geçersiz ad. En az 2 karakterli bir isim girilmeli.');
    }

    if (!yas || typeof yas !== 'number' || yas < 5 || yas > 120) {
        throw new Error('Geçersiz yaş. 5 ile 120 arasında bir sayı olmalı.');
    }

    if (!favoriTarz || typeof favoriTarz !== 'string' || favoriTarz.length < 3) {
        throw new Error('Geçersiz favori tarz. En az 3 karakterli bir tanım girilmeli.');
    }

    return true;
}

module.exports = {
    validateUserData
};
