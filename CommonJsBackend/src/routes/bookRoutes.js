const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const {
  createBookHandler,
  getBooksHandler,
  getBookByIdHandler,
  updateBookHandler,
  deleteBookHandler,
} = require("../controllers/bookController.js");

const router = Router();

router.post("/", authMiddleware, createBookHandler);
router.get("/", authMiddleware, getBooksHandler);
router.get("/:id", authMiddleware, getBookByIdHandler);
router.put("/:id", authMiddleware, updateBookHandler);
router.delete("/:id", authMiddleware, deleteBookHandler);

module.exports = router;
