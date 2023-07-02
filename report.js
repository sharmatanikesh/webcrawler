function printReport(pages){
    console.log("===========")
    console.log("REPORT")
    console.log("===========")

    const sortedPages = sortPages(pages)
    for(const sortedPage of sortedPages){
        const url = sortedPage[0]
        const hits = sortedPage[1]
        console.log(`Found ${hits} link to page ${url}`)
    }

    console.log("===========")
    console.log("REPORT ENDS")
    console.log("===========")


}
function sortPages(page){
    const pagesArray = Object.entries(page)
    pagesArray.sort((a,b)=>{
        aHits = a[1]
        bHits = b[1]
        return b[1]-a[1]
    })
    return pagesArray
}

module.exports ={
    sortPages,
    printReport
}