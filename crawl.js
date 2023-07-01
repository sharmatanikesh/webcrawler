const { url } = require('inspector')
const {JSDOM} = require('jsdom')


async function crawlPage(currentURL){
    console.log(`Actively crawling: ${currentURL}`)
    try{
        const resp = await fetch(currentURL)
        if(resp.status>399){
            console.log(`Error in the fetch with status code: ${resp.status} current page ${currentURL}`)
            return
        }

        const contentType = resp.headers.get('content-type')
        if(!contentType.includes('text/html')){
            console.log(`Non html response, content type: ${contentType} current page ${currentURL}`)
            return
        }
        console.log(await resp.text())
   
    }catch(error){
        console.log(`Error in the fetch ${error.message} at page ${currentURL}`)
    }


}

function getURLsFromHTML(htmlBody,baseURL){

    const urls =[]
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for(const linkElement of linkElements){
        if(linkElement.href.slice(0,1)==='/'){
            //Relative
            try{
                const url = new URL(`${baseURL}${linkElement.href}`)
                urls.push(url.href)
            }catch(error){
                console.log(error.message)
            }
            
        }else{
            try{
                const url = new URL(linkElement.href)
                urls.push(url.href)
            }catch(error){
                console.log(error.message)
            }
            
        }
        
    }

    return urls
}


function normalizeUrl(urlString){
    const urlObj = new URL(urlString)

    const hostPath= `${urlObj.hostname}${urlObj.pathname}`
    if(hostPath.length >0 && hostPath.slice(-1) ==='/'){
        return hostPath.slice(0,-1)
    }
    return hostPath
}

module.exports = {
    normalizeUrl,
    getURLsFromHTML,
    crawlPage
}