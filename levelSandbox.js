/* ===== Persist data with LevelDB ===================================
|  Learn more: level: https://github.com/Level/level     |
|  =============================================================*/

const level = require('level');
const chainDB = './chaindata';
const db = level(chainDB);
//var count = 0;
// Add data to levelDB with key/value pair
function addLevelDBData(key,value){
  let self = this;
  return new Promise(function(resolve, reject) {
       db.put(key, value, function(err) {
          if (err) {
              console.log('Block ' + key + ' submission failed', err);
              reject(err);
          }
          console.log('skata'+key)
          console.log('Block ' + key + ' submission succeedded with data' + value);
          resolve(value);
      });
  });
}

// Get data from levelDB with key
function getLevelDBData(key){
  let self = this;
  return new Promise((resolve, reject) => {
        db.get(key, function(err, value) {
            if (err) return console.log('Not found!', err);
            resolve(value);
        });
    })
}

// Add data to levelDB with value
function addDataToLevelDB(height,value) {
    let i = 0;
    let self = this;
    return new Promise(function(resolve, reject){
      db.createReadStream()
            .on('data', function(data) {
              i++;
          }).on('error', function(err) {
              return console.log('Unable to read data stream!', err)
              reject(err);
          }).on('close', function() {
            console.log('Block #' + i);
            addLevelDBData(height, value).then((value)=>{
              resolve(value);
            }).catch((err)=>{
              console.log(err);
            });
            //resolve(i);
          });
    })
}

function getBlocksCount() {
  let self = this;
  return new Promise(function(resolve, reject){
        var count=0;
      	db.createReadStream()
                .on('data', function (data) {
                      // Count each object inserted
              		count++;
                  })
                .on('error', function (err) {
                    // reject with error
            			reject(err);
                 })
                .on('close', function () {
                  //resolve with the count value
            			resolve(count);
                });
        });

}

function getDBdataArray(){
  let self = this;
  return new Promise(function(resolve, reject){
        var dataArray=[];
        db.createReadStream()
            .on('data', function (data) {
                dataArray.push(JSON.parse(data));
            })
            .on('error', function (err) {
                reject(err)
            })
            .on('close', function () {
                resolve(dataArray);
            });
        });
}

/* ===== Testing ==============================================================|
|  - Self-invoking function to add blocks to chain                             |
|  - Learn more:                                                               |
|   https://scottiestech.info/2014/07/01/javascript-fun-looping-with-a-delay/  |
|                                                                              |
|  * 100 Milliseconds loop = 36,000 blocks per hour                            |
|     (13.89 hours for 500,000 blocks)                                         |
|    Bitcoin blockchain adds 8640 blocks per day                               |
|     ( new block every 10 minutes )                                           |
|  ===========================================================================*/

//Create a chain with 10 blocks synchronously given that callbacks are utilized.
// (function theLoop (i) {
//   setTimeout(function () {
//     addDataToLevelDB('Testing data');
//     if (--i) theLoop(i);
//   }, 100);
// })(10);

//Create a chain with 10 blocks asynchronously given that promises are utilized for persistance.
let blockchain = new Blockchain()
(function theLoop (i) {
	setTimeout(function () {
		let blockTest = new Block("Test Block - " + (i + 1));
		blockchain.addBlock(blockTest).then((result) => {
			console.log(result);
			i++;
			if (i < 10) theLoop(i);
		});
	}, 10000);
})(0);
