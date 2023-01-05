const Cat = require("../models/cat");

exports.getCats = async (req, res) => {
  try {
    const result = await Cat.find().select("color weight _id");
    if (result && result.length !== 0) {
      return res.status(200).json({
        count: result.length,
        cats: result.map((cat) => {
          return {
            ...cat.toObject(),
            request: {
              type: "GET",
              url: `http://localhost:3000/cat/${cat._id}`,
            },
          };
        }),
      });
    }
    res.status(404).json({ msg: "Cats not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

exports.getCat = async (req, res) => {
  try {
    const result = await Cat.findById(req.params.id).select("-__v");
    if (result) {
      return res.status(200).json({
        ...result.toObject(),
        request: {
          type: "GET",
          url: "http://127.0.0.1:3000/cat",
        },
      });
    }
    res.status(404).json({ msg: "Cat not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

exports.postCat = async (req, res) => {
  try {
    const cat = new Cat({
      color: req.body.color,
      weight: req.body.weight,
    });
    const result = await cat.save();
    if (result) {
      return res.status(201).json({
        message: "Your cat was created",
        createdCat: {
          ...result.toObject(),
          payload: {
            type: "GET",
            url: `http://127.0.0.1:3000/cat/${result._id}`,
          },
        },
      });
    }
    res.status(500).json({ msg: "Cat was not created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};

exports.putCat = async (req, res) => {
  try {
    const update = {
      color: req.body.color,
      weight: req.body.weight,
    };
    const result = await Cat.findByIdAndUpdate(req.params.id, update);
    if (result) {
      return res.status(200).json({
        msg: `Cat ${req.params.id} was updated`,
        request: {
          type: "GET",
          url: `http://127.0.0.1:3000/cat/${req.params.id}`,
        },
      });
    }
    res.status(500).json({ msg: "Cat could not be updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

exports.patchCat = async (req, res) => {
  try {
    const update = {};
    for (const ops of req.body) {
      update[ops.propWeight] = ops.value;
    }
    const result = await Cat.findByIdAndUpdate(req.params.id, update);
    if (result) {
      return res.status(200).json({
        msg: `Cat ${req.params.id} was updated`,
        request: {
          type: "GET",
          url: `http://127.0.0.1:3000/cat/${req.params.id}`,
        },
      });
    }
    res.status(500).json({ msg: "Cat could not be updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

exports.deleteCat = async (req, res) => {
  try {
    const result = await Cat.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).json({
        msg: `Cat ${result.color}, id: ${result._id} was deleted`,
      });
    }
    res.status(404).json({
      msg: "Cat not found",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};
