const { request, response } = require('express');

const { Table } = require('../models');

const getTables = async (req = request, res = response) => {
  try {
    const tables = Table.find({ state: true });
    const total = Table.countDocuments({ state: true });

    const [resTotal, resTable] = await Promise.all([total, tables]);

    res.status(200).json({
      resTotal,
      resRole: resTable,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: `Habla con el administrador`,
    });
  }
};

const createTable = async (req = request, res = response) => {
  const { table } = req.body;

  try {
    //verificando si hay una mesa con ese nombre
    const tableDB = await Table.findOne({ table });
    if (tableDB) {
      return res.status(400).json({
        msg: `La mesa: ${table}, ya ha sido creada`,
      });
    }
    const data = {
      table,
    };
    const tableN = new Table(data);
    await tableN.save();

    res.status(201).json({
      role: tableN,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: `Habla con el administrador`,
    });
  }
};

const updateTable = async (req = request, res = response) => {
  const { table, available, state } = req.body;
  const { id } = req.params;
  const data = {};
  try {
    if (table) {
      //verificando si hay una mesa con ese numero
      const tableDB = await Table.findOne({ table });
      if (tableDB) {
        return res.status(400).json({
          msg: `La mesa: ${table}, ya ha sido creada`,
        });
      }
      data.table = table;
    }
    if (available) {
      data.available = available;
    }
    if (state) {
      data.state = state;
    }

    const tableN = await Table.findByIdAndUpdate(id, data, { new: true });

    res.status(201).json({
      tableN,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: `Habla con el administrador`,
    });
  }
};

const deleteTable = async (req = request, res = response) => {
  const { id } = req.params;

  const table = await Table.findByIdAndUpdate(
    id,
    { state: false },
    {
      new: true,
    }
  );

  res.status(200).json({
    role: table,
  });
};

module.exports = {
  getTables,
  createTable,
  updateTable,
  deleteTable,
};
