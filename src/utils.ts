import 'reflect-metadata'
export const getMetadata = (
  value: any,
  key: string | symbol,
  propertyKey?: any
) => {
  return Reflect.getMetadata(key, value, propertyKey)
}
export const setMetadata = (
  value: any,
  key: string | symbol,
  data: any,
  propertyKey?: any
) => {
  return Reflect.defineMetadata(key, data, value, propertyKey)
}

/**
 * 从请求URL中提取查询参数，或者以对象形式返回所有查询参数。
 *
 * @param {Request} req - 包含URL的请求对象
 * @param {string} name - 要提取的查询参数的名称（如果提供）
 * @return {any} 指定查询参数的值或包含所有查询参数的对象
 */
export function extractQuery(req: Request, name: string): any {
  const url = new URL(req.url)
  if (name) {
    return url.searchParams.get(name)
  } else {
    return Object.fromEntries(url.searchParams)
  }
}

/**
 * 如果提供了name'，则从body对象中提取并返回指定的属性'name'，否则返回body对象本身。
 *
 * @param {any} body - 要提取属性的对象。
 * @param {string} name - 要从body对象中提取的属性名称。
 * @return {Promise<any>} 如果提供了name'，则返回提取的属性，否则返回body对象。
 */
export async function extractBody(body: any, name: string): Promise<any> {
  return name ? body[name] : body
}
