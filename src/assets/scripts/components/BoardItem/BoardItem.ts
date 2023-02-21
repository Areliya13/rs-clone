import { createHtmlElement } from "../../helpers/other";
import { IBoard, IReadUser } from "../../store/types";
import { store } from "../../store/store";
import { createUserPutData } from "../../api/rest/utils/createPutData";
import { Path } from "../../api/types";
import { updateOne } from "../../api/rest/updateOne";
import { readAll } from "../../api/rest/readAll";
import { updateStore } from "../../store/updateStore";

export class BoardItem {
    constructor(private board: IBoard) {

    }

    private findFavorite(id: string) {
        const favoriteBoards = store.user.favoriteBoards
        const board = favoriteBoards.find(board => board._id === id)
        if (!board) return false
        return true
    }

    getItem() {
        const li = createHtmlElement('li', {
            className: 'right-item'
        })
        const iconImage = createHtmlElement('img', {
            src: this.board.image ? this.board.image : '',
            className: 'right-item-icon right-item-image'
        })
        const iconBackground = createHtmlElement('div', {
            className: 'right-item-icon right-item-background',
            style: `background-color: ${this.board.color}`
        })
        const contentWrapper = createHtmlElement('div', {
            className: 'right-item-content'
        })
        const name = createHtmlElement('span', {
            className: 'right-item-header',
            textContent: this.board.title
        })
        const description = createHtmlElement('span', {
            className: 'right-item-description',
            textContent: 'Рабочее пространство Trello'
        })
        const buttonWrapper = createHtmlElement('div', {
            className: this.findFavorite(this.board._id) ? 'right-item-favoriteButton icon-img' : 'right-item-button icon-img',
            id: this.board._id
        })

        buttonWrapper.addEventListener('click', this.favoriteHandleClick)

        contentWrapper.append(name, description)
        if (this.board.image) {
            li.append(iconImage)
        } else {
            li.append(iconBackground)
        }
        li.append(contentWrapper, buttonWrapper)
        return li
    }

    private async favoriteHandleClick(e: Event) {
        if (!(e.currentTarget instanceof HTMLDivElement)) return
        const boardId =  e.currentTarget.id
        const isFavorite = store.user.favoriteBoards.find(board => board._id === boardId)
        const users: IReadUser[] = await readAll(Path.user, '')
        if (!users) return
        const user = users.find(user => user._id === store.user._id)
        if (!user) return
        const favoriteArr = user.favoriteBoards
        if (isFavorite) {
            const newFavoriteArr = favoriteArr.filter(id => id !== boardId)
            await updateOne(Path.user, store.user._id, createUserPutData({favoriteBoards: JSON.stringify(newFavoriteArr)}))
        } else {
            const newFavoriteArr = favoriteArr.push(boardId)
            await updateOne(Path.user, store.user._id, createUserPutData({favoriteBoards: JSON.stringify(newFavoriteArr)}))
        }
        await updateStore()   
    }
}