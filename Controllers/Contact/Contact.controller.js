const Contact = require('../../Models/Contact');

const CreateEpocId = (name) => {
    const currentTime = new Date().getTime();
    return (`${name}-${currentTime}`);
};

const createContact = async (req, res) => {
    try {
        const newContact = new Contact({
            contactId: CreateEpocId(req.body.name),
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
        });
        await newContact.save();
        res.status(201).json('Contact created successfully');
    } catch (error) {
        res.status(500).json({ message: 'Failed to create new contact', error: error.message });
        console.log(error);
    }
};

const updateContact = async (req, res) => {
    try {
        const { contactId, ...updatedData } = req.body;
        const contact = await Contact.findOne({ contactId: contactId });
        if (!contact) return res.status(404).json('Contact not found');

        await contact.updateOne({ $set: updatedData });
        res.status(200).json('Contact updated!');
    } catch (error) {
        res.status(500).json({ message: 'Failed to update contact', error: error.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findOne({ contactId: req.body.contactId });
        if (!contact) return res.status(404).json('Contact not found');

        await Contact.deleteOne({ contactId: req.body.contactId }); // Correct usage
        res.status(200).json('Contact deleted!');
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete contact', error: error.message });
    }
};

const getAllContacts = async (req, res) => {
    try {
        const allContacts = await Contact.find(); // Await the query
        if (allContacts.length === 0) return res.status(200).json('No contacts found');

        res.status(200).json(allContacts); // Respond with the contacts
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contacts', error: error.message });
        console.log(error);
    }
};

const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findOne({ contactId: req.body.contactId }); // Await the query
        if (!contact) return res.status(404).json('Contact not found');

        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contact', error: error.message });
    }
};

const getContactByEmail = async (req, res) => {
    try {
        const contacts = await Contact.find({ email: req.body.email }); // Await the query
        if (contacts.length === 0) return res.status(404).json('No contacts found with that email');

        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contacts', error: error.message });
    }
};

module.exports = { createContact, updateContact, deleteContact, getAllContacts, getContactByEmail, getContactById };
