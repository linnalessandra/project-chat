
let APIKEY = 'JLhzAVnzYYryaf8526zq7ojhLBZDmOs2'


async function searchGif(message) {
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=1&q=${message}`;
    console.log(url)

    const response = await fetch(url)
    const result = await response.json()

    console.log(result)
    return result.data[0].images.downsized.url
}



