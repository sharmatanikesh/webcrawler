const {crawlPage} = require('./crawl.js')
function main(){
    if(process.argv.length<3){
        console.log("No website is provided")
        process.exit(1)
    }

    if(process.argv.length>3){
        console.log("Too many websites are provided")
        process.exit(1)
    }

    const baseURL = process.argv[2]

    console.log(`Starting crawl ${baseURL}`)
    crawlPage(baseURL)
}

main()

