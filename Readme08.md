# 07- JavaQuiz
## Diferencias entre Redux y  Zustand
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

1. React Context:
    1. para cosas que cambian poco o nada. EJ: tema de la web, esado del usuario,etc.


