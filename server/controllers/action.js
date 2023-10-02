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
        res.status(200).json( await List.find({ boardId: boardId }).populate('cards').exec() )
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
    // try {
    //     const listsWithCards = await List.find()
    //       .populate('cards') // Populate the 'cards' field in the List model
    //       .exec();
    
    //     res.json(listsWithCards);
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Server error' });
    //   }
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


/* GET CARDS */
export const getCards = async (req, res) => {
    try {
        const { cardId } = req.params
        res.status(200).json( await Card.findById(cardId))
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