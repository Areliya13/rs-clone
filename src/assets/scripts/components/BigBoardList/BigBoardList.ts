import { createHtmlElement } from "../../helpers/other";
import { IBoard } from "../../store/types";
import { BigBoardItem } from "../BigBoardItem/BigBoardItem";

export class BigBoardList {
    constructor(private boards: IBoard[], private className: string) {}

    getList() {
        const ul = createHtmlElement('ul', {
            className: `big-board-list ${this.className}`
        })
        const noUl = createHtmlElement('span', {
            className: 'big-board-list-not',
            textContent: 'Нет досок'
        })
        const items = this.boards.map((board) => {
            return new BigBoardItem(board).getItem()
        })
        if (this.boards.length !== 0) {
            ul.append(...items)
        } else {
            ul.append(noUl)
        }
        return ul
    }
}