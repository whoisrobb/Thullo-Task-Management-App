import express from 'express'
import { createBoard, createCard, createList, getBoards, getCards, getLists, getSingleBoard, deleteSingleBoard, patchCard, putCard, deleteCard, deleteList, search } from '../controllers/action.js'

const router = express.Router()


/* SEARCH FUNCTIONALITY */
router.get('/search', search)


/* CREATE A BOARD */
router.post('/create', createBoard)


/* GET BOARDS */
router.get('/all/:userId', getBoards)


/* GET SINGLE BOARD */
router.get('/:boardId', getSingleBoard)


/* DELETE SINGLE BOARD */
router.delete('/:boardId', deleteSingleBoard)


/* GET LISTS IN BOARD */
router.get('/lists/:boardId', getLists)


/* CREATE LISTS IN BOARD */
router.post('/lists/create', createList)


/* DELETE CARD IN LISTS */
router.delete('/lists/:listId', deleteList)


/* GET CARDS IN LIST */
router.get('/cards/:cardId', getCards)


/* CREATE CARDS IN LISTS */
router.post('/cards/create', createCard)


/* DELETE SINGLE BOARD */
router.delete('/:boardId', deleteSingleBoard)


/* DELETE CARD IN LISTS */
router.delete('/cards/:cardId', deleteCard)


/* UPDATE CARDS FOR LIST */
router.put('/cards/put/:cardId', putCard)


export default router