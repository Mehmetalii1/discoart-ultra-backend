const fs = require('fs');
const path = require('path');

const memoryPath = path.resolve(__dirname, '../memory/memory.json');

// Hafızayı oku
function readMemory() {
    try {
        const data = fs.readFileSync(memoryPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Memory okunamadı, boş obje dönüldü:', error.message);
        return { kullanıcılar: {} };
    }
}
}

// Hafızaya yaz
function writeMemory(newData) {
    fs.writeFileSync(memoryPath, JSON.stringify(newData, null, 2), 'utf8');
}

// Yeni kullanıcı ekle
function addUser(userId, userData) {
    const memory = readMemory();
    if (memory.kullanıcılar[userId]) {
        throw new Error('Bu kullanıcı zaten kayıtlı.');
    }
    memory.kullanıcılar[userId] = userData;
    writeMemory(memory);
}

// Kullanıcı getir
function getUser(userId) {
    const memory = readMemory();
    return memory.kullanıcılar[userId];
}

// Kullanıcı güncelle
function updateUser(userId, updateData) {
    const memory = readMemory();
    if (!memory.kullanıcılar[userId]) {
        throw new Error('Kullanıcı bulunamadı.');
    }
    memory.kullanıcılar[userId] = { ...memory.kullanıcılar[userId], ...updateData };
    writeMemory(memory);
}

module.exports = {
    readMemory,
    writeMemory,
    addUser,
    getUser,
    updateUser
};
