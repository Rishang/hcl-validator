const actions = require('@actions/core')
const fs = require('fs')
const hcl = require("js-hcl-parser")

let hcl_data
let file_paths = actions.getInput('HCL_FILE_PATH') ||  process.env.HCL_FILE_PATH

// remove spaces and get list of paths seprated by ","
file_paths = file_paths.replace(' ','').split(',')

function check_ext(file_path) {
    let valid = ["hcl","tf","tfvars"]
  
    let f_ext = file_path.split('/').at(-1).split('.').at(-1)
  
    if (valid.includes(f_ext)) {
      return true
    }
    else {
      return false
    }
}


function check_hcl(file_path) {

    try {
        hcl_data = fs.readFileSync(file_path, 'utf8')
    } catch (err) {
        console.error(err)
    }
    
    let hcl_string = hcl.parse(hcl_data)
    
    
    if (hcl_string.includes("unable to parse JSON")) {
        let message = `FILE: ${file_path} | ${hcl_string}`
        throw new Error(message)
    }
    else {
        console.log(`SUCESS: ${file_path} is valid hcl file.`)
    }
}



// console.log(file_paths)

for (let path of file_paths) {

    if (fs.statSync(path).isDirectory()) {
        _sub_fs = fs.readdirSync(path)

        for (let _f of _sub_fs) {
            let f = `${path}/${_f}`

            if (fs.statSync(f).isFile() && check_ext(f)) {
                check_hcl(f)
            }
        }
    }
    else if (fs.statSync(path).isFile() && check_ext(path)) {
        check_hcl(path)
    }
}
