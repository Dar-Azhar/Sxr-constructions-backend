const route = require('express').Router()
const contactController = require('../Controllers/Contact/Contact.controller')

route.post('/create' ,  contactController.createContact)
route.put('/update' ,  contactController.updateContact)
route.post('/delete' ,  contactController.deleteContact)
route.get('/all' ,  contactController.getAllContacts)
route.post('/get-by-id' ,  contactController.getContactById)
route.post('/get-by-email' ,  contactController.getContactByEmail)

module.exports = route
