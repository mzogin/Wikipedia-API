const url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch='

const form = document.querySelector('.form')
const input = document.querySelector('.form-input')
const results = document.querySelector('.results')

form.addEventListener('submit', (e) => {
  // handle event on our own via JS
  e.preventDefault()
  const value = input.value
  // check invalid search
  if (!value) {
    results.innerHTML = '<div class="error"> please enter valid search</div>'
    return
  }
  fetchPages(value)
})

const fetchPages = async (searchVal) => {
  results.innerHTML = '<div class="loading"></div>'
  try {
    const response = await fetch(`${url}${searchVal}`)
    const data = await response.json()
    const fetchResults = data.query.search
    // check no results
    if (fetchResults.length <= 0) {
      results.innerHTML = '<div class="error">oops, no results found :(</div>'
      return
    }
    renderPages(fetchResults)
  } catch (error) {
    results.innerHTML = '<div class="error">oops, there was an error...</div>'
  }
}

const renderPages = (list) => {
  const cards = list
    .map((item) => {
      const { title, snippet, pageid } = item
      return `<a href="http://en.wikipedia.org/?curid=${pageid}" target="_blank">
            <h4>${title}</h4>
            <p>
              ${snippet}
            </p>
          </a>`
    })
    .join('')
  results.innerHTML = `<div class="articles">${cards}</div>`
}
