import Board from "../models/board.js"
import Card from "../models/card.js"
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


/* DELETE SINGLE BOARD */
export const deleteSingleBoard = async (req, res) => {
    try {
        const { boardId } = req.params
        const board = await Board.findById(boardId)

        await board.deleteOne()
        res.status(200).json({ message: 'Deleted Successfully' })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


/* GET LISTS FOR BOARD */
export const getLists = async (req, res) => {
    try {
        const { boardId } = req.params
        res.status(200).json( await List.find({ boardId: boardId }).populate('cards').exec() )
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


/* DELETE LIST */
export const deleteList = async (req, res) => {
    try {
        const { listId } = req.params
        const list = await List.findById(listId)

        await list.deleteOne()
        res.status(200).json({ message: 'Deleted Successfully' })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


/* GET CARDS */
export const getCards = async (req, res) => {
    try {
        const { cardId } = req.params
        res.status(200).json( await Card.findById(cardId))
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


/* DELETE CARDS */
export const deleteCard = async (req, res) => {
    try {
        const { cardId } = req.params
        const card = await Card.findById(cardId)

        await card.deleteOne()
        res.status(200).json({ message: 'Deleted Successfully' })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


/* CREATE CARDS FOR LIST */
export const createCard = async (req, res) => {
    try {
        const { title, createdBy, listId } = req.body
        
        const card = new Card({ title, createdBy })
        await card.save()

        // Add the card to the list's 'cards' array
        const list = await List.findByIdAndUpdate(
            listId,
            { $push: { cards: card._id } },
            { new: true }
        )

        res.status(200).json({ card, list })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


/* PATCH CARDS FOR LIST */
export const patchCard = async (req, res) => {
    try {
        const { title, description } = req.body
        const { cardId } = req.params
        
        const card = await Card.findById(cardId)
        
        if (!card) {
            res.status(404).json({ message: 'Card not found!' })
        }

        await card.updateOne({ title, description })

        res.status(201).json(card)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


/* UPDATE CARDS FOR LIST */
export const putCard = async (req, res) => {
    try {
        const updatedCard = await Card.findByIdAndUpdate(
            req.params.cardId,
            req.body, {
                new: true
            }
        )

        if (!updatedCard) {
            return res.status(404).json({ error: 'Card not found!' });
        }

        res.status(201).json(updatedCard)
    } catch (error) {
        res.status(500).json({ message: err.message })
    }
}