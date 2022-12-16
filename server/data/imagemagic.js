const im = require('imagemagick')
// im.identify(['-format', '%wx%h', 'imageMagickTest.png'], function(err, output){
//     if(err){
//         throw err
//     }
//     console.log(output)
// })

const ImageMagic=(path, filename) =>{
    let img = path
    let updtImg
    // im.identify(img, function(err, features){
    //     if (err) throw err;
    //     console.log("features=>",features);
    //     // { format: 'JPEG', width: 3904, height: 2622, depth: 8 }
    //   });
    
    im.crop({srcPath: img, width: 500, height: 500},
    function(err, stdout){
        if(err)
            throw err
        console.log("Success")
        console.log("stdout=>",stdout)
    })
}

module.exports = {
    ImageMagic
}
