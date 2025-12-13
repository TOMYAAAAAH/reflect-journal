import type {Answer} from "./answer.type.ts";

export type Question = {
    id: number;
    day: number;
    month: number;
    question_text: string;
    playlist_id: number;
    answers: Answer[];

}