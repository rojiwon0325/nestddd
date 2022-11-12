/**
 * @packageDocumentation
 * @module api.functional.users
 * @nestia Generated by Nestia - https://github.com/samchon/nestia 
 */
//================================================================
import { Fetcher } from "nestia-fetcher";
import type { IConnection } from "nestia-fetcher";
import TSON from "typescript-json";

import type { User } from "./../../../../src/api/user/domain/index";

export * as me from "./me";

/**
 * 사용자 회원가입 API
 * 
 * @tag user
 * @tag public
 * @param connection connection Information of the remote HTTP(s) server with headers (+encryption password)
 * @param body 사용자 계정 정보 전달
 * @returns 생성된 사용자의 세부 프로필 정보 응답
 * @throw 400 email duplicate
 * 
 * @controller UserController.create()
 * @path POST /users
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export function create
    (
        connection: IConnection,
        body: __type
    ): Promise<create.Output>
{
    return Fetcher.fetch
    (
        connection,
        create.ENCRYPTED,
        create.METHOD,
        create.path(),
        body,
        create.stringify
    );
}
export namespace create
{
    export type Input = __type;
    export type Output = User.ProfileDetail;

    export const METHOD = "POST" as const;
    export const PATH: string = "/users";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export function path(): string
    {
        return `/users`;
    }
    export const stringify = (input: Input) => TSON.stringify(input);
}

/**
 * 사용자 조회 API
 * 
 * @tag user
 * @tag public
 * @param connection connection Information of the remote HTTP(s) server with headers (+encryption password)
 * @param id 사용자 id
 * @returns 사용자 공개 프로필 정보
 * 
 * @controller UserController.findOne()
 * @path GET /users/:user_id
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export function findOne
    (
        connection: IConnection,
        id: number
    ): Promise<findOne.Output>
{
    return Fetcher.fetch
    (
        connection,
        findOne.ENCRYPTED,
        findOne.METHOD,
        findOne.path(id)
    );
}
export namespace findOne
{
    export type Output = User.Profile;

    export const METHOD = "GET" as const;
    export const PATH: string = "/users/:user_id";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export function path(id: number): string
    {
        return `/users/${encodeURIComponent(id)}`;
    }
}