const ImageKit = require('imagekit');

let imagekit = new ImageKit({
    // publicKey : process.env.IMAGEKIT_PUBLICKEY,
    // privateKey : process.env.IMAGEKIT_PRIVATEKEY,
    // urlEndpoint : process.env.IMAGEKIT_URL

    publicKey : "public_xlYyb9/3+H6ilmw0wPClAxmLuys=",
    privateKey : "private_AS3/NsSvN8ayLXAI6jCawBbYhd0=",
    urlEndpoint : "https://ik.imagekit.io/molusxoy/"
});

module.exports = imagekit;