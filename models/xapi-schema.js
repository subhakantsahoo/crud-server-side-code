const mongoose = require("mongoose");
const xschemas = require("../routes");
const xapiSchema = mongoose.Schema(
  {
    IP: { type: String, required: true },
    Latitude: { type: Number },
    Longitude: { type: Number },
    Area: { type: String },
    CpuUsage: { type: Number },
    GpuUsage: { type: Number },
    RamUsage: { type: Number },
    DiskUsage: { type: Number },
    Bandwidth: { type: Number },
    OsInfo: { type: String },
    GraphicsInfo: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("xschemas", xapiSchema);
