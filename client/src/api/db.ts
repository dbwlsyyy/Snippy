import Dexie, { type Table } from 'dexie';
import type { Snippet } from '../models/Snippet';
import type { Note } from '../models/Note';

export class AppDB extends Dexie {
    // 데이터베이스 안에 저장할 '객체 스토어' (Object Store)들을 정의
    //    '!'는 TypeScript에서 이 변수가 나중에 반드시 초기화될 것이라고 알려주는 'Non-null Assertion' 연산자
    //    <Note>나 <Snippet>은 이 객체 스토어에 들어갈 데이터의 '타입'을 명시
    notes!: Table<Note>;
    snippets!: Table<Snippet>; // Snippet 타입 데이터를 저장할 'snippets' 객체 스토어

    // 생성자(constructor) 함수에서 데이터베이스 이름과 스키마(구조)를 정의
    constructor() {
        // 'notebook-db'는 데이터베이스 이름
        super('notebook-db');

        // 데이터베이스 '버전'과 '스키마'를 정의
        //    'stores' 메서드 안에는 각 객체 스토어의 이름을 지정, 해당 스토어의 '키 경로'와 '인덱스'를 정의
        this.version(1).stores({
            // notes 객체 스토어 정의:
            // '++id': 'id' 필드를 기본 키(Primary Key)로 사용하고, 자동으로 1씩 증가(auto-increment)
            // 'title, createdAt, updatedAt': 'title', 'createdAt', 'updatedAt' 필드에 인덱스를 걸어줌
            // '*tags': 'tags' 필드가 배열일 때 사용하는 문법. 배열 안에 있는 각각의 값(태그 하나하나)에 인덱스를 걸어줌
            notes: '++id, title, *tags, createdAt, updatedAt',
            snippets:
                '++id, title,description, language, *tags, createdAt, updatedAt',
        });
    }
}

export const db = new AppDB();
