const db = require('./models')
const data = require('./songSeeds.json')

db.Song.deleteMany({}, (err, deletedSongs) => {
  db.Song.create(data.songs, (err, seededSongs) => {
    if (err) console.log(err); 
  
    console.log(data.songs.length, 'created five songs successfully'); 
  
    process.exit(); 
  })
})