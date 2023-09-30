import Board from "../models/board.js"
import { Card } from "../models/card.js"
import List from "../models/list.js"


/* CREATE A BOARD */
export const createBoard = async (req, res) => {
    try {
        const { title, description, createdBy } = req.body
        const board = new Board({ title, description, createdBy })
        const savedBoard = await board.save()
        res.status(201).json(savedBoard)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


/* GET BOARDS */
export const getBoards = async (req, res) => {
    try {
        const { userId } = req.params
        res.status(200).json( await Board.find({ createdBy: userId }).populate('createdBy', ['username']))
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


/* GET SINGLE BOARD */
export const getSingleBoard = async (req, res) => {
    try {
        const { boardId } = req.params
        res.status(200).json( await Board.findById(boardId).populate('createdBy', ['username']) )
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


/* GET LISTS FOR BOARD */
export const getLists = async (req, res) => {
    try {
        const { boardId } = req.params
        res.status(200).json( await List.find({ boardId: boardId }) )
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


/* CREATE LISTS FOR BOARD */
export const createList = async (req, res) => {
    try {
        const { title, boardId } = req.body
        const list = new List({ title, boardId })
        const savedList = await list.save()
        res.status(201).json(savedList)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


/* GET CARDS FOR LISTS */
export const getCards = async (req, res) => {
    try {
        const { listId } = req.params
        res.status(200).json( await Card.find({ listId: listId }) )
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


/* CREATE CARDS FOR LIST */
export const createCard = async (req, res) => {
    try {
        const { title, description, listId, createdBy } = req.body
        const card = new Card({ title, description, listId, createdBy })
        const savedCard = await card.save()
        res.status(201).json(savedCard)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}