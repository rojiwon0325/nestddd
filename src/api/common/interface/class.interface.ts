/* eslint-disable @typescript-eslint/no-unused-vars */

/** static method를 interface화 하기위한 interface */
export type Implements<
  ClassInterface,
  StaticInterface,
  TypeOfClass extends StaticInterface,
> = ClassInterface;
