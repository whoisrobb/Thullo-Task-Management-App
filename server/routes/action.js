import express from 'express'
import { createBoard, createCard, createList, getBoards, getCards, getLists, getSingleBoard, patchCard, putCard } from '../controllers/action.js'

const router = express.Router()


/* CREATE A BOARD */
router.post('/create', createBoard)


/* GET BOARDS */
router.get('/all/:userId', getBoards)


/* GET SINGLE BOARD */
router.get('/:boardId', getSingleBoard)


/* GET LISTS IN BOARD */
router.get('/lists/:boardId', getLists)


/* CREATE LISTS IN BOARD */
router.post('/lists/create', createList)


/* GET CARDS IN LIST */
router.get('/cards/:cardId', getCards)


/* CREATE CARDS IN LISTS */
router.post('/cards/create', createCard)


/* PATCH CARDS IN LISTS */
router.patch('/cards/patch/:cardId', patchCard)


/* UPDATE CARDS FOR LIST */
router.put('/cards/put/:cardId', putCard)


export default router