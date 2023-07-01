import fs from 'fs'

export const getFileNames = (path: string, excludePath: string | string[]) => {
  const excludePathArray = Array.isArray(excludePath)
    ? excludePath
    : [excludePath]
  const fileList = fs.readdirSync(path)

  return fileList
    .map((file) => {
      return file.replace('.tsx', '')
    })
    .filter((file) => !excludePathArray.includes(file))
}
