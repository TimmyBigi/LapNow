import mongoose from "mongoose"; 
const laptopSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    brand: {
        type: String,
    },
    model: {
        type: String,
    },
    processor: {
        type: String,
    },
    ram: {
        type: String,
    },
    storage: {
        type: String,
    },
    price: {
        type: String,
    },
    image: {
        type: String,
    },
    status: {
        type: String,
        enum: ["available", "unavailable"],
        default: "available",
    },
    },
    {
    timestamps: true,
    versionKey: false,
    }
    );

    export default mongoose.model("Laptop", laptopSchema);