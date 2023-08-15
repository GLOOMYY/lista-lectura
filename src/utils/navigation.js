const checkIsNavigationSupported = () => {
  return Boolean(document.startViewTransition)
}

const fetchPage = async (url) => {
  // Cargamos la pagina de destino mediante un fetch para traer el HTML

  const response = await fetch(url) // Pagina destino
  const json = await response.text()
  
  // Nos quedamos unicamente con el contenido dentro del HTML
  // Utilizamos una Regex para extraer
  const [, data] = text.match(/<body[^>]*>([\s\S]*)<\/body>/i)
  
  return data
}


export const startViewTransition = (event) => { 
  if (!checkIsNavigationSupported()) return

  window.navigation.addEventListener('navigate', () => {
      const toUrl = new URL(event.destination.url)

      // Si es una pagina externa no hacemos nada
      if (location.origin != toUrl.origin ) return 

      event.intercept({
        async handler () {
          const data = await fetchPage(toUrl.pathname)

          document.startViewTransition(() => {
            document.body.innerHTML = data
            console.log('funciona')
          
            // Llevamos la nueva pagina al top
            document.documentElement.scrollTop = 0 
          
          })
        }
      })

    })

}