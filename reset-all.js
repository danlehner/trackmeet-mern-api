const db = require('./models')

db.User.deleteMany({}, (err, deletedSongs) => {
  db.Genre.deleteMany({}, (err, deletedGenres) => {
    db.Artist.deleteMany({}, (err, deletedArtists) => {
      db.Song.deleteMany({}, (err, deleedSongs) => {
        if (err) console.log(err); 

        console.log('all data reset')

        process.exit()
      }) 
    }) 
  }) 
})