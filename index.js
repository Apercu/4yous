// Check if we are on a thread
const stats = document.getElementsByClassName('thread-stats')
if (!stats.length) { throw new Error('not a thread') }

// Get some basic classes
var style = document.createElement('style')
style.type = 'text/css'
style.innerHTML = '.hide { display: none !important; } .right { float: right; }'
document.getElementsByTagName('head')[0].appendChild(style)

// Create the range input
const numberInput = document.createElement('input')
numberInput.type = 'range'
numberInput.min = 0
numberInput.max = 10
numberInput.value = 0
numberInput.className = 'right'
numberInput.style = 'margin-top: -1px;'

// Create the range info
const numberInfo = document.createElement('span')
numberInfo.innerText = '0'
numberInfo.className = 'right'
numberInfo.style = 'margin-left: 5px;'

// Append them to the page
stats[0].parentNode.insertBefore(numberInfo, stats[0])
stats[0].parentNode.insertBefore(numberInput, stats[0])

let value = 0

// The actual filtering method
const filterPosts = () => {

  const posts = document.querySelectorAll('.post.reply:not(.preview)')

  posts.forEach(post => {
    if (value === 0) { return post.parentNode.classList.remove('hide') }
    const replies = post.querySelectorAll('.desktop .backlink span').length
    post.parentNode.classList[replies < value ? 'add' : 'remove']('hide')
  })

}

// Listen for value changes and refresh filtering
numberInput.addEventListener('change', (e) => {
  value = e.target.value
  numberInfo.innerText = value
  filterPosts()
})

// Observe new posts and recall filtering
const observer = new MutationObserver(mutations => {

  mutations.forEach(mutation => {
    if (!mutation.addedNodes.length) { return }
    filterPosts()
  })

})

const thread = document.getElementsByClassName('thread')[0]
observer.observe(thread, { childList: true })
