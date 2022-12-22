/**
 * data가 null이 아니라면 mapper(data)를 반환한다.
 * @param data nullable한 데이터
 * @param mapper NonNullable한 데이터를 인자로 받아 변형하는 함수
 * @returns null or mapper(data)
 */
export const map = <T, R>(data: T, mapper: (data: NonNullable<T>) => R) => {
  if (data == null) {
    return null;
  }
  return mapper(data);
};
