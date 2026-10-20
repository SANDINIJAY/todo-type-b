const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Todo = require("../models/Todo");


//************************** */ get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch TODOs",
    });
  }
});



//*********************** */ post a new todo
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validate the title
    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    // Validate the optional description
    if (description !== undefined && typeof description !== "string") {
      return res.status(400).json({
        message: "Description must be text",
      });
    }

    // Create a new TODO
    const newTodo = new Todo({
      title: title.trim(),
      description: description?.trim() || "",
    });

    // Save toDB
    const savedTodo = await newTodo.save();

    return res.status(201).json(savedTodo);
  } catch (error) {
    console.error("Error creating TODO:", error.message);

    return res.status(500).json({
      message: "Failed to create TODO",
    });
  }
});



//*********************** **********/ edit todo
router.put("/:id", async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validate the TODO ID
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid TODO ID",
      });
    }

    const updates = {};

    if (title !== undefined) {
      if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
          message: "Title cannot be empty",
        });
      }
      updates.title = title.trim();
    }

    if (description !== undefined) {
      if (typeof description !== "string") {
        return res.status(400).json({
          message: "Description must be text",
        });
      }
      updates.description = description.trim();
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "Provide a title or description to update",
      });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        message: "TODO not found",
      });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error updating TODO:", error.message);

    res.status(500).json({
      message: "Failed to update TODO",
    });
  }
});



// done/undone toggle
router.patch("/:id/done", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid TODO ID",
      });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        message: "TODO not found",
      });
    }

    todo.done = !todo.done;

    await todo.save();

    return res.status(200).json(todo);
  } catch (error) {
    console.error("Error toggling TODO:", error.message);

    return res.status(500).json({
      message: "Failed to update TODO status",
    });
  }
});



//deete
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid TODO ID",
      });
    }

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({
        message: "TODO not found",
      });
    }

    return res.status(200).json({
      message: "TODO deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting TODO:", error.message);

    return res.status(500).json({
      message: "Failed to delete TODO",
    });
  }
});
module.exports = router;

