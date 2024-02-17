## API:
1. APIs:
1. Facts Random: https://catfact.ninja/fact
1. Imagen random: https://cataas.com/cat/says/hello
En Json: 
    1. https://cataas.com/cat/says/hello?fontSize=50&fontColor=red&json=true

### Tareas (tasks): 
1. Recupera un hecho aleatorio de gatos de la primera API
1. Recuperar la primera palabra del hecho
1. Muestra una imagen de un gato con la primera palabra.


### Prueba tecnicas, fetchs 📬
1. No podemos hacer el fetch dentro del cuerpo de un componente, 
porque se ejecutaria cada vez que se renderiza el componente se cambia el estado hariamos un loop infinito.
1. usamos el Use effect con las dependencia vacia [] (se ejecuta solo una vez). 
1. Recordando cosas basicas de fetchs: 
    1. en el fetch data seria el json:
     { "fact": "The way you treat kittens in the early stages of it's life will render it's personality traits later in life.",
       "length": 109
    }
    1. y al hacer data.fact obtendriamos el valor asociado a la clave "fact".
1. Renderizado condicional: ejemplo un and entre una cte de state y un elemento ej <p> ej: 
    {fact && <p> {fact} </p> }
1. No se puede usar el async await en el useEffect. La funcion que recibe **siempre debe ser una funcion asincrona**
1. Ojo si hacemos: 
    ```  useEffect( () => {
        console.log("effect")
        fetch(CAT_ENDPOINT_RANDOM_FACT)
        .then( (res) => { return res.json() })
        .then( (data) => { return setFact(data.fact) } )
    })
    ``` 
    Como cambio el estado con set entonces se vuelve a renderizar el componente y vuelve a entrara al useEffect y vuelve 
    a cambiar el estado y vuelve a renderizar y asi. infinitamente: 
    **GET https://catfact.ninja/fact 429 (Too Many Requests)**
    1. Solucion ? -> Agregar un [] al useEffect como argumento. 
1. 

