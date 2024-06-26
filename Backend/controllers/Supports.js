

const Support = require('../models/Supports');

// Get support information
exports.getSupportInfo = async (req, res) => {
    try {
        const supportInfo = await Support.findOne();
        res.json(supportInfo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create support information
exports.createSupportInfo = async (req, res) => {
    const support = new Support({
        hospitalNumber: req.body.hospitalNumber,
        emergencyNumber: req.body.emergencyNumber,
        email: req.body.email
    });

    try {
        const newSupport = await support.save();
        res.status(201).json(newSupport);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update support information
exports.updateSupportInfo = async (req, res) => {
    try {
        const updatedSupport = await Support.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedSupport);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete support information
exports.deleteSupportInfo = async (req, res) => {
    try {
        await Support.findByIdAndDelete(req.params.id);
        res.json({ message: 'Support information deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
