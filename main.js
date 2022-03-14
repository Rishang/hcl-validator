const actions = require('@actions/core')
const fs = require('fs')
const hcl = require("js-hcl-parser")

let hcl_data
const file_path = actions.getInput('HCL_FILE_PATH') ||  process.env.HCL_FILE_PATH

try {
    hcl_data = fs.readFileSync(file_path, 'utf8')
} catch (err) {
    console.error(err)
}

let hcl_string = hcl.parse(hcl_data)


if (hcl_string.includes("unable to parse JSON")) {
    throw new Error(`FILE: ${file_path} | ${hcl_string}`)
}
else {
    console.log(`SUCESS: ${file_path} is valid hcl file.`)
}

