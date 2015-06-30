"use strict";
var cluster = require("cluster");
var config = require("config");
var debug = require("debug")("mr_cluster");
var entryPoint = config.clustering.entryPoint;

if (!entryPoint) {
  throw new Error("entry point location must be defined in config stack");
}

function startMaster () {
    var cpuCount = require("os").cpus().length;
    var workerCount = config.clustering.workerLimit || cpuCount;
    debug("Spawning " + workerCount + " workers");
    var i = 0;
    for (i = 0; i < workerCount; i += 1) {
        cluster.fork();
    }
    cluster.on("exit", function (worker, code, signal) {
        debug("worker %d died (%s). restarting...", worker.process.pid, signal || code);
        cluster.fork();
    });
}

function startApplication () {
    debug("starting application at entry point " + entryPoint);
    require(entryPoint);
}
var isClusterMaster = config.clustering.workerLimit > 0 && cluster.isMaster;
if (isClusterMaster) {
    startMaster();
} else {
    startApplication();
}
