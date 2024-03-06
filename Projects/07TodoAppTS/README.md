# TodoApp TS 🗃️ 📮
1. Linter para typescript: npx eslint --ini
1. App lo que devuelve es un JSX.Element // mas adelante veremos que tambien podemos poner  un FC componente, function component. 
1. JSX. Elemento -> es un elemento de jsx. 
1. FC de react -> tiene que ver react y tiene mas cosas que añadir. 
1. Todo lo que podes inferir facilmente lo podes dejar asi y no tipees demasiado, porque luego sera dificil de cambiar. 
1. prop-types es una forma de validar las props a mano esto lo desactivs para que asi el linter no se queje. 
1. TS nos da una seguridad en los tipos, 
1. todo lo tenemos que tipar asi que podemos usar Type o interfaces.
1. Type es para poner un tipo y no lo podes extender facilemnte tenes que hacer uniones y cosas raras , inteface seria el contrato entre un objeto y es mas facil de extender. 
1. Se podria hacer type ListOfTodos = Todo[]  // o tambien type ListOfTodos = Array<Todo> 
1. Lo mas facil para tipear las props es hacer un interface Props. 
1. export const Todos: React.FC<Props> con esto le indicamos las formas que tienen las props, es como el parametro de los tipos, Forma correcta a dida de hoy de tipar las function component. 
1. typescript cheatsheets. Problema con React.FC<Props> en la version 17, pero todo bien en la version 18.
1. jsx no lleva props porque solo le decimos lo que devuelve
1. types.d. (types es un nombr que le pusimos .d (porque solo tendran  declaracion no tiene codigo) y el .ts porque es typescript )    
1. Recordar poner estilos en linea de golpe podemos usar: 
    ``` <li key={unTodo.id} className={`${unTodo.completed? 'completed' : ''}`  } >```
1. Lo que escupen las funciones se coloca con : a la derecha de los argumentos del aarrow function. 
1.  ```
    interface Props extends TodoType{
    onRemoveTodo: (id:string) => void
    }``` Ahora las props extiende todo el TodoType y ademas agrego el onRemoveTodo. 
1. html{ filter: invert(1)} el dark-mode pirata. 😺 😸
1. Que pasa si ahora la id debe ser un int y no un string, cambiamos todo lo que hicimos? 
    1. Lo mejor es tener los tipos de datos del negocio totalmente separado en type.d.ts. 
    1. Crear los tipos de dato de cada propiedad de la interfaz usando el Pick ej: Pick<Todo, id>
    1. Se quejadaba porque era: " ``` id:TodoId: 
    const handleRemover = (id:TodoId) :void => {
    const newTodos = todos.filter( (unTodo) => {  return unTodo.id != id } ) ``` " 
    1. Usando parametros nombrados se arregla todo. 
        const handleRemover = ({id}:TodoId) :void => {
    const newTodos = todos.filter( (unTodo) => {  return unTodo.id != id } )
1. Partial<Todo> : decis que van a venir partes del Todo pero no obligatoriamente deben ser todas, es casi como hacer un    any, interaria ser mas exacto. (aveces puede ser que este bien para actualizar una parte del estado.). 
1. Varias maneras de hacerlo:
    1. const handleCompleted = ({id, completed} : Partial<Todo>  ) :void => {...}
    1. const handleCompleted = ({id, completed} : Pick<TodoType, 'id' | 'completed'>  ) :void => {...}
    1. const handleCompleted = ({id, completed} : {id: TodoId, complete: TodoCompleted}  ) :void => {...}
1. Cuando implemetamos en el mismo onChange de un input ya tiene un contexto y el ide nos ayuda a hacer el 'event.target.checked'. Si lo hacemos afuera podemos tener mas problemas, ahora el event es un ChangeEvent del inputElement.
    1. con el handler adentro del return: 
    ``` 
    <input type="checkbox" className="toggle" checked={completed} onChange={(event) =>{
    onToggleCompleteTodo({id, completed: event.target.checked }) }} />  
    ```

    1. Si hacemos el handler afuera: 
    ``` 
    const handlerChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        onToggleCompleteTodo({ id, completed: event.target.checked })  }
    ``` en el return: 
    ``` <input type="checkbox" className="toggle" checked={completed} onChange={handlerChangeCheckBox } />  ``` 
1.  Javascript es totalmente compatible con typescript, porque typescript es super set. 
1. No hacemos un ``` import {type ChangeEvent} from 'react ```  porque hacerlo en el mismo lugar React.
    ChangeEvent<HTMLInputElement> me parece mas explicito explicitar de donde vienen las cosas. 
1. Any: tipo de dato en typescript que le podemos decir puede ser cualquier tipo. Evitarlo siempre. 
1. Muchos tipos? creamos una carpeta types y hacemos Todo.d.ts, User.d.ts, etc y asi. 
1. Al poner asConst a una cte que tiene un objeto, todas las propiedades pasan a ser de solo lectura, EL CONST inicial es 
    solo a nivel de variable y no de propiedad. (el const al lado del nombre indica que no puedes reasignar la propiedad )
    1. No usar enums en typescript por ahora estan rotos
    1. Como hacemos para que en los props para indicar los tipo filterSelect selccionados? , es decir que filterSelect tome uno  de esos valores posibles pero sin harcodearlo, porque el dia de mñanana agregamos 'parse' y tendria que cambiarlo. 
        filterSelected: 'all' | 'active' | 'completed'
    1. Entonces PODEMOS hacer magia de typescript podemos decir que:   
        filterSelected: typeof TODO_FILTERS[keyof typeof TODO_FILTERS] 
        filterSelected tomara el tipo de TODO_FILTERS[keyof typeof TODO_FILTERS] y accedemos a las claves de todo_filters.
        Aca le decimos que use alguna de las keys del tipo de TODO_FILTERS (esto puede ser ALL, active o complete, o lo nuevo que agregemos). y una vez que tengo la key la utilio para sacar el typeof del TODO_FILTER.
    1.  Pensalo como cualquier "key" del objeto TODO_FILTERS.
    1.  "keyof typeof TODO_FILTERS" Te quedas con solo las key yo quiero los valores.           
    1. Como FILTERS_BUTTONS NO es un array, tenemos que transformarlo para eso usamos Object.entries()
1. Usamos el event.preventDefault() para evitar lo que haga lo que haria por defecto.
1. Con esto:   const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)  le decimos
que queremos guardar un **conjunto de estado generico** y le pasamos que inicia con el estado ALL para arrancar. 
1. TS: a la hora de empezar un proyecto de ralentiza un monton comprobaciones, funciones. 
1. 
