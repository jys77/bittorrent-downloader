'use strict';

const fs = require('fs');
const bencode = require('bencode');
const crypto = require('crypto');
const bigIntBuffer = require('bigint-buffer');

module.exports.open = (filepath) => {
    return bencode.decode(fs.readFileSync(filepath));
};

module.exports.size = torrent => {
    const size = torrent.info.files
        ? torrent.info.files.map(file => file.length).reduce((a, b) => a + b)
        : torrent.info.length;
    return bigIntBuffer.toBufferBE(size, 8);
};

module.exports.infoHash = torrent => {
    const info = bencode.encode(torrent.info);
    return crypto.createHash('sha1').update(info).digest();
};
