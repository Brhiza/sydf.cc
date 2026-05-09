/**
 * 仅用于项目里的可序列化数据深拷贝。
 * 优先使用 structuredClone；若遇到 Vue 代理等不可克隆对象，则回退到 JSON 克隆。
 */
export function cloneSerializable<T>(value: T): T {
  if (value === undefined) {
    return value;
  }

  try {
    return structuredClone(value);
  } catch {
    return JSON.parse(JSON.stringify(value)) as T;
  }
}
