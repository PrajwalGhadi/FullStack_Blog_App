// SDK initialization

var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_ENDPOINT_URL
});


// For URL Generation, works for both images and videos
async function generateImageUrl(imageBase24, filename, folder = '/blogsImage') {
    var response = await imagekit.upload({
        file: imageBase24,
        fileName: filename,
        folder: folder
    });

    return response;
}

module.exports = generateImageUrl