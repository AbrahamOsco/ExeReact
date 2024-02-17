# Use Effect 🪄
1. Podemos hacer fetching de datos, tracking, tambien para conectarte a API de react. Y muy importante
    para conectarse a API de terceros.
1. Ahora vamos a poder controlar cuando ejecutamos un bloque de codigo especifico y no cada vez que se renderiza.
1. Podemos hacer logica dentro del useEffect dependiendo del valor de nuestras dependencias. ✅ 
1. Recordando que los hooks nunca JAMAS  van dentro de un if ❌ y deben ir en el cuerpo del componente. :white_check_mark: 
1. En el **Use State** podemos pasarle un objeto tambien. EJ:
    1. ``` const [position, setPosition] = useState({x:0, y:0}) ```
    1.  Y usamos su respectivo funcion para setear el valor de las sgt manera: ```setPosition({x: clientX, y:clientY})```
1. Vemos que luego de 'desactivar el ptro' todavia nos sigue. tenemos que hacer un **cleanEffets**:
    1. Esto lo hacemos haciendo un return en el usserEffects. 
    1. Se ejecuta : 
        1. Cuando se desmonta el componente ej componente App deja de renderizarse.
        1. Cada vez que cambia la dependencia. 
1. Si no limpiamos las suscripciones vamos a tener problemas de rendimientos
1. Con getEventListeners(unObjeto) podemos ver cuantas veces se ha sucrito al elemento unObjeto
1. Mantener el min de numero de suscripciones a un elemento (por ej window) 
1. A veces es para asaber cuando el usuaro cierra un modal para eso usamos el return del use Effect. 
1. Cuando se monta /desmonenta el compoennte se limpian todas las descripciones. 
### ¿Porque al renderizar se ejecuta el effect- hace un cleanEffect y luego ejecuta el effect otra vez?
1. En el main tenemos un **React.StrictMode**:
    1. Es un componente que nos sirve mucho para : 
        1. Darnos advertencia si usamos codigo antiguo de react.
        1. hacer algo incorrecto.
        1. Al montar componentes, ejecuta el efecto, cleanup, y luego el efecto. Para asegurarse de que funcioan bien el componente.
        1. Ayuda para desarollar 👉 React.StrictMode, en produccion sacamos el React.StrictMode 🤯.

### React Developer Tools: 
1. Profiler: para rendimientos, cuanto se rendriza cada cosa. con 🔵 grabamos y con  🔴  lo detenemos. 
1. Componets: para ver el nombre de los componentes, estados de los componentes y las props. Replicar problemas, 
    Tambien podemos ver el arbol de componentes para ver quien es el hijo de quien.

