/**
 *
 * @param data nullable한 데이터로서 data가 null인지 확인한다.
 * @param mapper null이 아닌 data를 변환한다
 * @returns null or cb(data)
 */
export const if_not_null = <T, R>(
  data: T | null,
  mapper: (data: T) => R,
): R | null => {
  return data == null ? null : mapper(data);
};
