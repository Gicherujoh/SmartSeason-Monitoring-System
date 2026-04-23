const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  createField,
  getFields,
  updateField,
} = require("../controllers/fieldController");

router.post("/", auth, createField);
router.get("/", auth, getFields);
router.put("/:id", auth, updateField);

module.exports = router; // ✅ MUST EXIST