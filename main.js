document.addEventListener('DOMContentLoaded', () => {
  const search = document.querySelector('header input')
  const main = document.querySelector('main')

  const APILINK =
    'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=97e64ceadf5d68cc5bb441a54b2b62b0&page=1'
  const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
  const SEARCHAPI =
    'https://api.themoviedb.org/3/search/movie?&api_key=97e64ceadf5d68cc5bb441a54b2b62b0&query='

  const myFunction = async url => {
    try {
      const req = await fetch(url)

      const res = await req.json()
      console.log(req, res, res.results[0])
      function data (res) {
        res.forEach(element => {
          const img = document.createElement('img')
          const center = document.createElement('center')
          const title = document.createElement('p')
          const movie = document.createElement('div')

          img.src = IMG_PATH + element.poster_path
          title.innerHTML = `${element.title}`

          title.classList.add('title')
          center.classList.add('center')
          img.classList.add('img')
          movie.classList.add('movie')

          center.append(img)
          movie.append(center)
          movie.append(title)
          main.append(movie)
        })
      }
      data(res.results)
    } catch (error) {
      console.error('Error fetching data:', error.message)
    }
  }
  myFunction(APILINK)

  function data (el) {
    main.innerHTML = ''
    el.forEach(element => {
      const img = document.createElement('img')
      const center = document.createElement('center')
      const title = document.createElement('p')
      const movie = document.createElement('div')

      img.src = IMG_PATH + element.poster_path
      title.innerHTML = `${element.title}`

      title.classList.add('title')
      center.classList.add('center')
      img.classList.add('img')
      movie.classList.add('movie')

      center.append(img)
      movie.append(center)
      movie.append(title)
      main.append(movie)
    })
  }
  const searchFunction = async () => {
    const query = search.value.trim()

    if (query === '') return
    const url = SEARCHAPI + encodeURIComponent(query)
    const req = await fetch(url)

    return await req.json()
  }
  search.addEventListener('keyup', () => {
    searchFunction().then(res => {
      if (res && res.results) {
        console.log(res.results)
        data(res.results)
      }
    })
  })
})
