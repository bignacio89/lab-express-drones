const express = require('express');
const router = express.Router();
const Drones = require('./../models/Drone.model')

// require the Drone model here

router.get('/drones', (req, res, next) => {


  Drones
    .find()
    .then(drones => res.render('drones/list', { drones }))
    .catch(err => console.log(err))
});

router.get('/drones/create', (req, res, next) => {
  res.render('drones/create-form')
});

router.post('/drones/create', (req, res, next) => {

  const { name, propellers, maxSpeed } = req.body

  Drones
    .create({ name, propellers, maxSpeed })
    .then(drone => res.redirect('/drones'))
    .catch(err => console.log(err))

});

router.get('/drones/:id/edit', (req, res, next) => {

  const { id } = req.params
  console.log(id)

  Drones
    .findById(id)
    .then(drone => res.render('drones/update-form', drone))
    .catch(err => console.log(err))


});

router.post('/drones/:id/edit', (req, res, next) => {

  const { name, propellers, maxSpeed } = req.body
  const { id } = req.params
  console.log(id)



  Drones
    .findByIdAndUpdate(id, { name, propellers, maxSpeed })
    .then(drone => res.redirect('/drones'))
    .catch(err => console.log(err))

});

router.post('/drones/:id/delete', (req, res, next) => {
  const { id } = req.params

  Drones
    .findByIdAndDelete(id)
    .then(() => res.redirect('/drones'))
    .catch(err => console.log(err))

});

module.exports = router;
