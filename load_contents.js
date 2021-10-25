const fs = require('fs');
const path = './data/output.json';

const getFileContents = (path) => {
  return new Promise((resolve, reject) => {
    fs.exists(path, (exists) => {
      if(!exists) {
          reject(new Error('File does not exist'))
      } else {
          fs.stat(path, (err, stats) => {
              resolve( new Promise((resolve, reject) => {
                  if(err) {
                      reject(new Error('Error trying to get stats'))
                  } else {
                    if (stats.size > 0) { 
                        fs.readFile(path, (err, buffer) => {
                            resolve(new Promise((resolve, reject) => {
                                if(err) {
                                    reject(new Error('Error trying to get stats'))
                                } else {
                                    resolve(buffer)
                                }
                            }))
                        })
                    } else {
                        reject(new Error('File exists but there is no content'))
                    }
                  }
              }))
          })
      }
    })
  })
  
}


getFileContents(
    path
).then((content) => {
    console.info('File was found and the contents were loaded', JSON.parse(content));
}).catch((error) => {
    console.log(error.message)
})