# hcl syntax validator for github actions

### Required arguments
**Usage**

 - **HCL_FILE_PATH**: provide list of folder of file paths seprated by "," to check syntac of.

### Example actions

```yml
- uses: oxrishang/hcl-validator@v1
    with:
    HCL_FILE_PATH: ./vars, ./test/demo.hcl, ./deploy/conf.tfvars
```
