const request = require('request')

// encodeURIComponent serve pra retornar uma string e não quebrar o código, por exemplo, se alguém pesquisasse por '?' o código iria quebrar
// mas como utilizei o encodeURIComponent o sinal de '?' viraria '%3F' e o navegador consegue entender como '?' sem quebrar o código

const geocode = (adress, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ encodeURIComponent(adress) }.json?access_token=pk.eyJ1Ijoidml0b2l2YW4iLCJhIjoiY2tqazY1aGk1Mjg2ejJzcGRxaTcxNmYyOCJ9.A7qmmzTVIGqtKupKEQEp-A&limit=1`;

    // request - Primeiro argumento é o objeto de options, serve como parâmetro para algumas configurações de um HTTPrequest
    //           url : geocode... serve pra dizer ao request qual a url, e json: true serve pra o retorno ser um objeto literal javascript, ou seja,
    //           json: true faz o parse automático de json para objeto

    // request - Segundo argumento é a função callback que vai rodar quando o request estiver concluído
    request( { url, json:true }, (error, { body }) => {
        
            if(error){
                callback('Unable to connect to location services!', undefined)
            }
            else if(body.message === 'Not Found') {
                callback('Unable to find location, try another search', undefined)
            }
            else if(body.features.length === 0) {
                callback('Unable to find location, try another search', undefined)
            }
            else{

                const data = { 
                    latitude: body.features[0].center[1], 
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                }
                callback(undefined, data)
                
            }

    })
   
}

module.exports = geocode