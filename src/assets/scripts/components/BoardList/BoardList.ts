import { createHtmlElement } from "../../helpers/other";
import { IBoard } from "../../store/types";
import { BoardItem } from "../BoardItem/BoardItem";

export class BoardList {
    constructor(private boards: IBoard[]) {
        
    }

    getList() {
        const ul = createHtmlElement('ul', {
            className: 'right-list-ul'
        })
        const noUl = createHtmlElement('span', {
            className: 'right-list-p',
            textContent: 'Нет избранных досок'
        })
        const items = this.boards.map((board) => {
            return new BoardItem(board).getItem()
        })
        if (this.boards.length !== 0) {
            ul.append(...items)
        } else {
            ul.append(noUl)
        }
        return ul
    }
}