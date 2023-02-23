import { createHtmlElement } from "../../helpers/other";
import { IBoard, IReadUser } from "../../store/types";
import { store } from "../../store/store";
import { createUserPutData } from "../../api/rest/utils/createPutData";
import { Path } from "../../api/types";
import { updateOne } from "../../api/rest/updateOne";
import { readAll } from "../../api/rest/readAll";
import { updateStore } from "../../store/updateStore";
import { getAddress } from "../../helpers/functions";
import { PageIds, spaceMode } from "../../types/enum";

export class BigBoardItem {
    constructor(private board: IBoard) {}

    private findFavorite(id: string) {
        if (!store.user._id) return
        const favoriteBoards = store.user.favoriteBoards
        const board = favoriteBoards.find(board => board._id === id)
        if (!board) return false
        return true
    }

    getItem() {
        const li = createHtmlElement('li', {
            className: 'big-board-list-item',
            id: this.board._id
        })
        const image = createHtmlElement('img', {
            src: this.board.image ? this.board.image : '',
            className: 'big-board-list-item-image',
            width: 190,
            height: 112,
        })
        const background = createHtmlElement('div', {
            className: 'big-board-list-item-background',
            style: `background-color: ${this.board.color}`
        })
        const contentWrapper = createHtmlElement('div', {
            className: 'big-board-list-item-content'
        })
        const name = createHtmlElement('span', {
            className: 'big-board-list-item-header',
            textContent: this.board.title
        })
        const description = createHtmlElement('span', {
            className: 'big-board-list-item-description',
            textContent: 'Рабочее пространство Trello'
        })
        const buttonWrapper = createHtmlElement('div', {
            className: this.findFavorite(this.board._id) ? 'right-item-favoriteButton icon-img big-board-list-item-icon' : 'right-item-button icon-img big-board-list-item-icon'
        })

        buttonWrapper.addEventListener('click', this.favoriteHandleClick)
        li.addEventListener('click', this.recentlyHandleClick.bind(this))

        contentWrapper.append(name)
        if (this.board.image) {
            li.append(image)
        } else {
            li.append(background)
        }
        li.append(contentWrapper, buttonWrapper)
        return li
    }

    private async favoriteHandleClick(e: Event) {
        e.stopPropagation()
        if (!(e.currentTarget instanceof HTMLDivElement)) return
        const boardId =  e.currentTarget.parentElement.id
        if (!boardId) return
        const users: IReadUser[] = await readAll(Path.user, '')
        if (!users) return
        const user = users.find(user => user._id === store.user._id)
        if (!user) return
        const favoriteArr = user.favoriteBoards
        const isFavorite = store.user.favoriteBoards.find(board => board._id === boardId)
        if (isFavorite) {
            const newFavoriteArr = favoriteArr.filter(id => id !== boardId)
            await updateOne(Path.user, user._id, createUserPutData({favoriteBoards: JSON.stringify(newFavoriteArr)}))
        } else {
            const newFavoriteArr = [...favoriteArr]
            newFavoriteArr.push(boardId)
            await updateOne(Path.user, user._id, createUserPutData({favoriteBoards: JSON.stringify(newFavoriteArr)}))
        }
        await updateStore()   
    }

    private recentlyHandleClick(e: Event) {
        e.preventDefault()
        if (!(e.currentTarget instanceof HTMLLIElement )) return
        const boardId =  e.currentTarget.id
        if (!boardId) return

        const options = new Map(
            Object.entries({
              mode: spaceMode.board,
              workspaceID: this.board.workSpaceId,
              boardID: this.board._id,
            })
        );
        
        const link = getAddress(PageIds.SpacePage, options)
        location.hash = link 
    }
}

