import  swaggerAutogen  from  "swagger-autogen" ;

const swaggerRunner = swaggerAutogen()
const outputFile = './swaggerOptions.json'
const endpointsFile = ['../server']
const doc = {}

const exec = async () => {
  await  swaggerRunner(outputFile, endpointsFile, doc)
  
}

exec()