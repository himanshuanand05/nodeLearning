// employees = [
//     { "projectid": 123, "name": "abc" },
//     { "projectid": 234, "name": "qwerty" },
//     { "projectid": 123, "name": "test" },
//     { "projectid": 789, "name": "xyz" },
//     { "projectid": 789, "name": "test123" },
//     { "projectid": 234, "name": "hello" }
// ]

// function getProjectDetails(projectId) {
//     let x = new Promise((res, rej) => {
//         setTimeout(() => {
//             res("pId: " + projectId)
//         }, 2000)
//     })

//     return x
// }
setImmediate(()=>console.log("Hello"))
process.nextTick(()=>console.log("HI"))
Promise.resolve().then(()=>console.log("bye"))

// async  function getProjectDetailsAsync(projectId) {
//     let x = setTimeout(() => {
//             res("pId: " + projectId)
//         }, 2000)

//     return x
// }

// function getDetailsUsingForEach(employees) {
//     let projectdetailsMap = new Map()
//     employees.forEach(async emp => {
//         if (projectdetailsMap.has(emp.projectid)) {
//             console.log(projectdetailsMap[emp.projectid])
//             return projectdetailsMap[emp.projectid]
//         }
//         else {
//             debugger
//             let data = await getProjectDetails(emp.projectid)
//                 .then(res => {
//                     console.log(res, emp.name)
//                 })
//             projectdetailsMap.set(emp.projectid, data)
//         }
//     })
// }

// async function getDetailsUsingFor(employees) {
//     let projectdetailsMap = new Map()
//     for(let i=0; i<employees.length; i++)
//     {
//         if (projectdetailsMap.has(employees[i].projectid)) {
//             console.log(projectdetailsMap[employees[i].projectid])
//             return projectdetailsMap[employees[i].projectid]
//         }
//         else {
//             debugger
//             let data = await getProjectDetails(employees[i].projectid)
//                 .then(res => {
//                     console.log(res, employees[i].name)
//                 })
//             projectdetailsMap.set(employees[i].projectid, data)
//         }
//     }
// }

// var headings = document.evaluate('//h3//a/@href', document, null, XPathResult.ANY_TYPE, null );
// var arr = []
// var data = true
// while(data){
//     try{
//         debugger
//         if(headings.iterateNext() == null) data = false;
//         arr.push(headings.iterateNext().nodeValue)
//     }
//     catch(err){
//         data = false
//     }
    
// }
// arr

console.log(fetch('https://public.sn.files.1drv.com/y4mZCB2ZPFzs8RXA1QjjmNAk26SIhV0dbUHkrbBBWtAnHDDA1L1VayyYLO--Y0OCtxjPDWoI46SResGd-RmdrNzxp-rajJA0wEF-euW6nxirIu-lhjHYcWoOHsR2l7o9Gjx0t4KYtjrDj5hdJlE7NMEYS9YBRJl8tPCdm5HYNzEG3SiinDX687rGUhu5p4FyPvxYpsHg-AqevOrRW-2lqpS28XA0tscwr_pOGYUMgiIoZQ/shi.png'))

