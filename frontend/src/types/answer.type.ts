export type Answer = {
    id: number;
    user_id: number;
    question_id: number;
    answer_text: string;
    year: number;
    created_at?: string;
}