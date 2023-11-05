const router = require('express').Router();
const { json } = require('sequelize');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categoryData = await Category.findAll();
  return res.json(categoryData);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findOne (
      {
        where: {
          id: req.params.id
        },
        include: [
          Product
        ]
      }
    );
    return res.json(categoryData);
  } catch (error) {
    res.status(500).json(error)
  }

});

router.post('/', async (req, res) => {
  // create a new category

  const categoryData = await Category.create(req.body);
  return res.json(categoryData);
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value

  const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    return res.json(categoryData);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const categoryData = await Category.destroy ({
    where: {
      id: req.params.id,
    }
  })
  return res.json(categoryData);
});

module.exports = router;
