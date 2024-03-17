const axios = require("axios");
const xapi = require("../models/xapi-schema");
const os = require("os-utils");
const fs = require("fs");
const diskusage = require("diskusage");
const si = require("systeminformation");
const { promise } = require("bcrypt/promises");
const { fromUrlQueryParameter } = require("passport-jwt/lib/extract_jwt");
class xapiService {
  async create(request, response) {
    try {
      const ipApiResponse = await axios.get(
        "http://ip-api.com/json/?fields=61439"
      );
      // const ipcheckmate = await axios.get(
      //   "http://ip-api.com/json/?fields=61439"
      // );
      console.log("Check mate IP:", ipcheckmate.data);
      // console.log("IP details", ipApiResponse.data);
      const userIP = ipApiResponse.data.query;
      const userlat = ipApiResponse.data.lat;
      const userlon = ipApiResponse.data.lon;
      const userarea = ipApiResponse.data.city;
      const cpuUsageValue = await new Promise((resolve) => {
        os.cpuUsage((v) => {
          const cpuUsagePercentage = Math.floor(v * 100);
          resolve(cpuUsagePercentage);
          //   resolve(v * 100) + "%";
        });
      });
      // console.log("CPU Usage", cpuUsageValue);
      const totalMemory = os.totalmem();
      const freeMemory = os.freemem();
      const usedMemory = totalMemory - freeMemory;
      const ramUsageValue = Math.floor((usedMemory / totalMemory) * 100);
      // console.log("RAM Usage", ramUsageValue);
      //   console.log("FreeMemory", freeMemory);
      //   console.log("TotalMemory", totalMemory);
      const diskUsage = await new Promise((resolve) => {
        diskusage.check("/", (err, info) => {
          if (err) {
            // console.error("Failed to get disk usage:", err);
            resolve(0);
          } else {
            const totalDiskSpace = info.total;
            const usedDiskSpace = info.total - info.available;
            const diskUsageValue = Math.floor(
              (usedDiskSpace / totalDiskSpace) * 100
            );
            // console.log("Disk Usage", diskUsageValue);
            resolve(diskUsageValue);
          }
        });
      });

      // const networkStatsStart = await si.networkStats();
      // await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
      // const networkStatsEnd = await si.networkStats();

      // const totalSentStart = networkStatsStart[0].tx_bytes;
      // const totalReceivedStart = networkStatsStart[0].rx_bytes;
      // const totalSentEnd = networkStatsEnd[0].tx_bytes;
      // const totalReceivedEnd = networkStatsEnd[0].rx_bytes;

      //   console.log("networkStarts", networkStatsStart);
      //   console.log("networkEnds", networkStatsEnd);

      //   console.log("Total Sentstarts (bytes/sec):", totalSentStart);
      //   console.log("Total Receivedstarts (bytes/sec):", totalReceivedStart);
      //   console.log("Total SentEnd (bytes/sec):", totalSentEnd);
      //   console.log("Total ReceivedEnd (bytes/sec):", totalReceivedEnd);

      // const totalSentBytes = totalSentEnd - totalSentStart;
      // const totalReceivedBytes = totalReceivedEnd - totalReceivedStart;

      // const totalSentBits = totalSentBytes * 8;
      // const totalReceivedBits = totalReceivedBytes * 8;

      // const toMbps = (bitsPerSecond) => bitsPerSecond / 1e6;

      // const totalSentMbps = toMbps(totalSentBits);
      // const totalReceivedMbps = toMbps(totalReceivedBits);

      // console.log("Total Sent (Mbps):", totalSentMbps);
      // console.log("Total Received (Mbps):", totalReceivedMbps);

      // const bandwidthMbps = Math.min(
      //   Math.max(totalSentMbps, totalReceivedMbps, 10),
      //   25
      // );

      const client = new iperf.Client();
      client.server("serverHostnameOrIP", 5201);
      try {
        const downloadResult = await client.download();
        const uploadResult = await client.upload();

        const downloadSpeedMbps =
          downloadResult.speed_bits_per_second / 1000000; // Convert bits to megabits
        const uploadSpeedMbps = uploadResult.speed_bits_per_second / 1000000; // Convert bits to megabits

        console.log("Download speed:", downloadSpeedMbps.toFixed(2), "Mbps");
        console.log("Upload speed:", uploadSpeedMbps.toFixed(2), "Mbps");
        console.log(
          "Total network speed:",
          (downloadSpeedMbps + uploadSpeedMbps).toFixed(2),
          "Mbps"
        );
      } catch (error) {
        console.error("Error:", error);
      }

      // console.log("Bandwidth (Mbps):", bandwidthMbps);

      const osInfo = await si.osInfo();
      const graphicsInfo = await si.graphics();
      // console.log("OS Information:", osInfo.platform);
      // console.log("Graphics Information vendor:", graphicsInfo.controllers);
      //   console.log("Graphics Information model:", graphicsInfo.controllers);

      const elements = new xapi({
        IP: userIP,
        Latitude: userlat,
        Longitude: userlon,
        Area: userarea,
        CpuUsage: cpuUsageValue,
        // GpuUsage: gpuUsage,
        RamUsage: ramUsageValue,
        DiskUsage: diskUsage,
        Bandwidth: bandwidthMbps,
        OsInfo: osInfo.platform,
        GraphicsInfo: graphicsInfo.controllers[0].model,
      });

      const savedElement = await elements.save();
      response.json(savedElement);
    } catch (error) {
      response.status(500).json({ error: "Failed to Save  IP" });
    }
  }

  async get(req, res) {
    try {
      const ipAddresses = await xapi.find();
      res.json(ipAddresses);
    } catch (error) {
      res.status(500).json({ error: "Failed to Get IP" });
    }
  }
}

module.exports = xapiService;
