const im = require('imagemagick')
// im.identify(['-format', '%wx%h', 'imageMagickTest.png'], function(err, output){
//     if(err){
//         throw err
//     }
//     console.log(output)
// })

const ImageMagicResize=(path) =>{
    
    
    im.resize({
        srcPath:  path,
        dstPath:  path ,
        width:500,
        height:500
      }, function(err, stdout, stderr){
        if (err) {
            console.log('error while resizing images' + stderr);
        };
        console.log( path + 'has been resized and replaced')
      });

    


/*
    im.crop({srcPath:  path,
        dstPath:  path , width: 25, height: 25},
    function(err, stdout){
        if(err)
            throw err
        console.log("Success")
        console.log("stdout=>",stdout)
    })
    */
}

const ImageMagicFeatures=(path) =>{
    
    //let updtImg
     im.identify(path, function(err, features){
         if (err) throw err;
         console.log("OLD features=>",features);
         // { format: 'JPEG', width: 3904, height: 2622, depth: 8 }
      });
    
    
}



module.exports = {
    ImageMagicFeatures,
    ImageMagicResize
}
