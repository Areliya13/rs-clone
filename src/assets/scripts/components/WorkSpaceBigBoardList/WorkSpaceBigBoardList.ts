import { createHtmlElement } from "../../helpers/other";
import { IWork } from "../../store/types";
import { BigBoardItem } from "../BigBoardItem/BigBoardItem";
import { ModalCreateBoard } from "../ModalCreateBoard/ModalCreateBoard";

export class WorkSpaceBigBoardList {
    constructor(private workSpace: IWork, private className: string) {}

    getList() {
        const wrapper = createHtmlElement('div', {
            className: `work-space-big-board-list-wrapper ${this.className}`
        })

        const ul = createHtmlElement('ul', {
            className: `big-board-list work-space-big-board-list`,
            id: this.workSpace._id
        })

        const items = this.workSpace.boards.map((board) => {
            return new BigBoardItem(board).getItem()
        })

        const createButton = createHtmlElement('li', {
            className: `big-board-list-item work-space-big-board-list-create`,
        })

        createButton.addEventListener('click', (e) => this.handlerAddBoardClick(e))
        const createButtonText = createHtmlElement('div', {
            className: `work-space-big-board-list-create-text`,
            textContent: 'Создать доску'
        })
        createButton.append(createButtonText)
        if (items.length !== 0) {
            ul.append(...items)
        }
        ul.append(createButton)
        wrapper.append(ul)
        return wrapper
    }

    handlerAddBoardClick(e: MouseEvent) {
        if (!(e.currentTarget instanceof HTMLLIElement)) return

        const modal = document.querySelector('.createBoardModal')
        if (modal) {
        modal.remove();
        }

        const newModal = new ModalCreateBoard().getModal()

        document.body.append(newModal)
    }

}