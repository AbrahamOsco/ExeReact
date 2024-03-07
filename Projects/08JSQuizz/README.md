# 07- JavaQuiz
### Diferencias entre Redux y  Zustand
1. Redux: 
    1. Tiene mucho boilerplate: Para generar algo en redux tienes que escribir mucho codigo y siempre se va repitiendo.
    1. Con reduxTolkit mejoro pero igual seguis generando mucho codigo. 
    1. Ocupa 20kb. (lo vemos con bublephobia.)
    1. Opinionado: lo que hacen los framework tiene una opiniion que te obliga a seguirla. NextJs es opiniado, porque
    te dice como tienes que crear las rutas para poder utilizarlo, REDUX es opinionado porque te dice como actualizar el estado.   
    1.  Para proyectos mediano-grande , tampoco muy grandes, (netflix, facebook -> usar relat, apolo).
    1. Provider es obligatorio segun el scope que necesites. 
1. Zustand
    1. Muy simple no tiene ni provider. 
    1. 0 boilerplate, sin configuracion. 
    1. ocupa ~1kb. 
    1. Hay que usar mutabilidad (copias)
    1. Usarlo siempre que se upa escala muy bien. 
    1. No lo usaria para apliaciones muy grandes y para todo el estado global.  (SI es muy grande usar apolo, relat)
    1. Puede funcionar sin ningun tipo de provider envuelto en el main.jsx
    1. Porque le pasamos el estado? porque si quieres leer el state lo recibes  y lo usas.sino no lo pases. 
1. React Context:
    1. para cosas que cambian poco o nada. EJ: tema de la web, esado del usuario,etc.
1. SWC: transpilar el codigo a js. (alternativa a babel) 
### MaterialUI: 
1. wiki: Permite a los desarrolladores crear interfaces de usuario atractivas y funcionales con facilidad, mientras mantiene una consistencia en la apariencia y la experiencia de usuario
1. basicamente  es un catalogo de componentes que esta basado en material UI de android. (MUI)
1. Instalacion MaterialUI:
  1. npm install @mui/material @emotion/react @emotion/styled
  1. npm install @fontsource/roboto @mui/icons-material -E // import '@fontsource/roboto/300.css' importanmos fuente.
1. Para instalar linter:
  1. npm install ts-standard -D   : conjunto de reglas para trabajar con typescript con react.  
  1. agregar en .eslintrc.cjs que nos crea el vite en la propiedad extends: 
    1. './node_modules/ts-standard/eslintrc.json'
1. Tiene tipografia donde le indicamos la variante a utilizar y que componente queremos renderizar con ese estilo.
    ```<Typography variant='h2' component='h1'> ```
1. Podemos usar stack para apilar de forma vertical u horizontal.  

## Zustand 🧸
1. npm install zustand -E   . Instalamos Zustand.
1. Store -> carpeta donde guardamos nuestro estado global. (crearlo dentro de src obviamente)
1. Todas las interfaces en type.d.ts y dentro de src, 
1. Cada Estado tendra su interface, asi tipamos el estado de una manera muy facil, basicamente aca describirmos el ESTADO.  
1. fetchQuestion para cambiar el estado (no retorna las preguntas) 
1. El create tiene que recibir un callback, y en el callback tienes que devolver el objeto que sera el
    "estado globa", la "store" donde no solo tendras el estado sino las formas para actualizar el estado, 
1. Aca por ej podemos devolver el estado inicial del estado global question.   
1. Solo con el useQuestionStore ya estamos creando el estado global, sin usar reducer, ni action ni nada y podemos 
    ir a App y usarlo. 🤯 🤯 🦸 
1. En realidad podemos recibir dos parametros ``` export const useQuestionStore = create<State>( (set, get) => {..xad} ```  
    1. el set -> para actualizar el estado, basicamente funciona como e el setState. 
    1. get -> para leer el estado. 
    1. Dentro del arrow function podemos tanto leer el estado como actualizarlo, 
1. para actualizar la pregunta le podmeos pasar: 
    1. set( {questions:[{...}] , currentQuestion:4} ) // actualizame el objeto question con este nuevo array que tiene 1 elemento, etc.
    1. como fetchQuestions es async desactivamos el linter para q no chille las reglas
1. truco para desordenar elementos de json. y limitar la cantidad la cantida de resultados: 
    1. ``` json.sort( () => {return Math.random() - 0.5 }).slice(0, limit) ``` 
    1. Si creamos una nueva variable con distinto nombre lo seteariamos asi: 
    ```
        const aQuestions = json.sort( () => {return Math.random() - 0.5 }).slice(0, limit)
        console.log(aQuestions)
        set({question:aQuestions} )
    ``` 
    1. Si tiene igual nombre es suficiente: 
    ```
        const question = json.sort( () => {return Math.random() - 0.5 }).slice(0, limit)
        console.log(question)
        set({question} )
    ``` 
1. Si tenemos dentro de public en nuestro proyecto un data.json al mismo nivel que src. podemos acceder a el usando: 
    http://localhost:5173/data.json 🤯 🤯 ❗
1. Ojo creamos un componente Question donde recibe una estructura info que es de tipo Question pero hace conflicto con el  
    componente lo fixeamos: 
     ``` import { type Question as QuestionType  } from "./types"``` 
    1. Ahora si recibe un {info} como parametro tenemos que hacer un {info : QuestionType} para pasarle tipo a todos los 
        argumentos dentro de {} 
     ```const Question = ({info} : { info : QuestionType} ) => { } ```
### react-syntax-highlighter
1. Componente para  hacer que el codigo se vea como un editor.
1. npm react-syntax-highlighter -E. ( el -E para que no nos ponga el ^ loco ese.) para usarlo luego hacemos: 
    1. ``` 
            import SyntaxHighlighter from 'react-syntax-highlighter';
            import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
       ```
1. Cuando creamos un componente **Card** usando  **sx** como prop podemos decirle todas las propiedades que queramos 
    ej: textAlign, padding(p),  
1. dark-mode mui -> import { ThemeProvider, createTheme } from '@mui/material/styles'; import CssBaseline from '@mui/material/CssBaseline'; y ademas debemos crear la paleta
1. Envolvemos nuestro app con el ThemeProvider le pasamos la paleta y antes de llamar a App usamos  CssBaseline
1. Hacemos la lista de respuesta usamos el componente List y para los items ListItem, aca si podemos usar el index. porque  
    las respuesta no van a cambiar de orden ni desaparecer ni nada. (podriamos usar un useId) 
1. divider como prop de ListItem para separar los items.  
1. Handleres Clicks en los botones podemos hacerlo de 2 maneras: 
    1. Manera uno creando una funcion q te escupe otra funcion (handlerClick) (queda mas prolijo el onClick): 
        ```const createHandler = (answerIndex: number) => { return ((event)=> { 
        selectAnswer(info.id, answerIndex)})  }  //aca en esta ultima funcin llega el event. 
        .... =>  <ListItemButton onClick={createHandler(index)}  >
        ``` 
    1. Todo directo en el onClick: 
        ``` 
        .... =>  <ListItemButton onClick={ (event)=> {selectAnswer(info.id, answerIndex) }  }  >
        ```     
1. Confetti: 
    1. npm install canvas-confetti -E. y npm i --save-dev @types/canvas-confetti AMBAS. 
    1. Si la dejamos dentro el conffeti en la funcion getBacrkogundColor y tenemos 80 componentes dentro se renderizara 80 veces.
1. Una gran duda, porque hacer: 
    1. ``` 1️⃣
        import { useQuestionStore } from "../store/questions"
        const questions = useQuestionStore( (state) => {return state.questions})
       ``` 
    1. Y no hacer algo asi ? 2️⃣ 
    1. ```
        import { useQuestionStore } from "../store/questions"
        const {questions} = useQuestionStore( (state) => {return state.questions})
       ``` 
    1. Porque en en el segundo le estamos diciendo a zustand que nos informe de cualquier cambio que haya en el objeto 
        state. (TODO el estado) cualquier cambie y el componente se vuelve a renderizar, podrias usar shallow pero nunca lo 
        hagas ya es demasiado complejo. Haces muchos renderizados innecesarios.  
    1. Siempre que puedas saca de a uno solo del estado lo que realmente necesitas, asi tenes mendos renderizados inncesarios. 

## Persistencia de localStorage con zustand 🤯 
1. Podemos persistir en el localStorage usando zustand, y ademas podemos crear tantos middleware como queramos con zustand.  
1. Middleware: cada vez que se vaya a cambiar algo del store que hago algo. 
1. persits: captura todos los cambios del que haces en el storage y lo sincroniza con el localStorage, seccion storage , o lo que vos quieras.  
1. persiste envuelve la funcion que reciba (get,set) que hicimos antes:
    1. persist( (set,get) => { return {...} } , {name:"question", getStorage: () => localStorage  }   ) # podemos indicar donde lo queremos meter 
        en seccionStorage, localStorage, el default es localStorage. 
1. como el persits devuelve una funcion debmos ponerle un () antes del persits. ->  create<State>()(persist( (set, get) => {return {...}}, {name:questinn}) )
1. Como cuernos "veo" el local storage? 
    1. F12 ->application
    1. Local Storage : http://localhost:5173
1.  Diferencias con swr? , swr: es para manejar estados asincronos globales. y zustand, es para estados asincronos o no globales.
1. Middleware creacion usa const logger = (config) => (set, get, api) => { return set,get,api  }
    podemos "envolver el set" para hacer un playing  , 
1. usando redux devtool importar de zustand:  "devtools"  , bajarse en chrome la extension : redux-devtools
1. Si queremos cambiar los anoymous tenemos que poner en los sets en nuestro useQuestionStore (dentro del return). ej: 
    1. es decir hacer:  set({questions}, false, 'FETCH_QUESTION')
    1. set({questions: newQuestions}, false , 'SELECT_ANSWER  )
    1. set({questions: newQuestions}, false , 'GO_NEXT_QUESTION  )
    1. solo si quieres usar dev-tools y queres tener nombrada las acciones. 

