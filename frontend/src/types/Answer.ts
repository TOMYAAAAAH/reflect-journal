export type Answer = {
    answer_text: string;
    year: number;
    isExisting: boolean;
}
/*
export class Answer {
    answer_text: string;
    year: number;
    isExisting: boolean;

    constructor(answer_text: string, year: number, isExisting: boolean) {
        this.answer_text = answer_text;
        this.year = year;
        this.isExisting = isExisting;
    }

    post(answer_text: string) {
        this.answer_text = answer_text;
        this.isExisting = true;
    }

    put(answer_text: string) {
        this.answer_text = answer_text;
    }

    delete() {
        this.answer_text = "";
        this.isExisting = false;
    }
}*/