const {normalizeUrl , getURLsFromHTML} = require('./crawl')
const {test,expect} =require('@jest/globals')

test('normalizeUrl strip trailing',()=>{
    const input ='https://blog.boot.dev/path'
    const actual =normalizeUrl(input)
    const expected ='blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl strip trailing slash',()=>{
    const input ='https://blog.boot.dev/path/'
    const actual =normalizeUrl(input)
    const expected ='blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl capitals',()=>{
    const input ='https://BLOG.boot.dev/path/'
    const actual =normalizeUrl(input)
    const expected ='blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl strip http',()=>{
    const input ='http://blog.boot.dev/path/'
    const actual =normalizeUrl(input)
    const expected ='blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLFromHTML absolute',()=>{
    const inputHTMLBody =`
    <html>
        <body>
            <a href="https://blog.boot.dev/path/"> 
            blog.dev boot
            </a>
        </body>
    </html>`
    const inputBaseURL ='https://blog.boot.dev/path/'
    const actual =getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected =['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})

test('getURLFromHTML relative',()=>{
    const inputHTMLBody =`
    <html>
        <body>
            <a href="/path/"> 
            blog.dev boot
            </a>
        </body>
    </html>`
    const inputBaseURL ='https://blog.boot.dev'
    const actual =getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected =['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})

test('getURLFromHTML both',()=>{
    const inputHTMLBody =`
    <html>
        <body>
        <a href="https://blog.boot.dev/path1/"> 
            blog.dev boot
            </a>
            <a href="/path2/"> 
            blog.dev boot
            </a>
        </body>
    </html>`
    const inputBaseURL ='https://blog.boot.dev'
    const actual =getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected =['https://blog.boot.dev/path1/','https://blog.boot.dev/path2/']
    expect(actual).toEqual(expected)
})

test('getURLFromHTML invalid',()=>{
    const inputHTMLBody =`
    <html>
        <body>
        <a href="haa"> 
            blog.dev boot
            </a>
            
        </body>
    </html>`
    const inputBaseURL ='https://blog.boot.dev'
    const actual =getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected =[]
    expect(actual).toEqual(expected)
})
