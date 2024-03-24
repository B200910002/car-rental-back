const { CitizenIdentify } = require('./citizen_identify.model');
const { DriveLicense } = require('./drive_lisence.model');
const { User } = require('./User.model');
const { Vehicle } = require('./Vehicle.model');
const { Image } = require('./Image.model');
const { Maintenance } = require('./maintenance.model');
const { Booking } = require('./booking.model');
const { Rental } = require('./rental.model');
const { Contract } = require('./contract.model');
const { Payment } = require('./payment.model');
const { History } = require('./history.model');

// CitizenIdentify one to one USer
CitizenIdentify.hasOne(User, { foreignKey: 'registration_number' });
User.belongsTo(CitizenIdentify, { foreignKey: 'registration_number' });

// DriveLicense one to one USer
DriveLicense.hasOne(User, { foreignKey: 'license_number' });
User.belongsTo(DriveLicense, { foreignKey: 'license_number' });

// User one to many Vehicle
User.hasMany(Vehicle, { foreignKey: 'owner_id' });
Vehicle.belongsTo(User, { foreignKey: 'owner_id' });

// User one to many Booking
User.hasMany(Booking, { foreignKey: 'renter_id' });
Booking.belongsTo(User, { foreignKey: 'renter_id' });

// Vehicle one to many Image
Vehicle.hasMany(Image, { foreignKey: 'vehicle_id' });
Image.belongsTo(Vehicle, { foreignKey: 'vehicle_id' });

// Vehicle one to many Maintenance
Vehicle.hasMany(Maintenance, { foreignKey: 'vehicle_id' });
Maintenance.belongsTo(Vehicle, { foreignKey: 'vehicle_id' });

// Vehicle one to many Booking
Vehicle.hasMany(Booking, { foreignKey: 'vehicle_id' });
Booking.belongsTo(Vehicle, { foreignKey: 'vehicle_id' });

// Booking one to one Rental
Booking.hasMany(Rental, { foreignKey: 'booking_id' });
Rental.belongsTo(Booking, { foreignKey: 'booking_id' });

// Rental one to one Contract
Rental.hasMany(Contract, { foreignKey: 'rental_id' });
Contract.belongsTo(Rental, { foreignKey: 'rental_id' });

// Rental one to one Payment
Rental.hasMany(Payment, { foreignKey: 'rental_id' });
Payment.belongsTo(Rental, { foreignKey: 'rental_id' });

module.exports = {
    User,
    Vehicle,
    Image,
    Maintenance,
    Booking,
    Rental,
    Contract,
    Payment,
    History
};