document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('formid').addEventListener('submit', (e) => {
        e.preventDefault()  
        searchPlace()
    })
})
const searchPlace = () => {

    const dataDiv = document.getElementById('divData')
    dataDiv.classList.add('active')
    document.getElementById('formid').classList.remove('activeform')
    dataDiv.innerHTML = '<h3>Carregando ...<h3>'

    document.getElementById('btn').disabled = true
    const place = document.getElementById('inputid').value
    fetch(`/weather?adress=${ place }`).then( (response) => {

        response.json().then( (data) => {

            if (data.error){
                console.log(data.error)
                dataDiv.classList.add('active')
                dataDiv.innerHTML = data.error
            }
            else{

                //local, temperature, description, feelslike
                console.log(data);
                const local = document.createElement('h2')
                const temperature = document.createElement('h2')
                const description = document.createElement('h2')
                const feelslike = document.createElement('h2')
    
                local.innerHTML = `Local: ${data.local}`
                description.innerHTML = `${data.description}`
                temperature.innerHTML = `Temperature: ${data.temperature} °C`
                feelslike.innerHTML = `Feels like: ${data.feelslike} °C`
                
                dataDiv.innerHTML = ''
                dataDiv.appendChild(local)
                dataDiv.appendChild(description)
                dataDiv.appendChild(temperature)
                dataDiv.appendChild(feelslike)
                
                document.getElementById('footerid').insertAdjacentElement('beforebegin', dataDiv)
            }
        })
    })
}