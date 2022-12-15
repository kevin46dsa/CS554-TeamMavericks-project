const im = require('imagemagick')
// im.identify(['-format', '%wx%h', 'imageMagickTest.png'], function(err, output){
//     if(err){
//         throw err
//     }
//     console.log(output)
// })

const ImageMagic=(path, filename) =>{
    let img = path
    im.identify(img, function(err, features){
        if (err) throw err;
        console.log("features=>",features);
        // { format: 'JPEG', width: 3904, height: 2622, depth: 8 }
      });
    
    im.convert([img, '-resize', '500x500', img],
    function(err, stdout){
        if(err)
            throw err
        console.log("stdout=>",stdout)
    })
}

module.exports = {
    ImageMagic
}
