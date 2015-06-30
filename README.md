# Mr. Cluster

Stupid, simple, config-based clustering

# Usage
* Mr. Cluster requires node-config (https://github.com/lorenwest/node-config node-config). 
* 
Config Keys: 
* **clustering.entryPoint** - The absolute path of your application's main script. 
* **clustering.workerLimit** (**default**: os.cpus().length) - The number of workers the cluster may spawn. If set to zero, clustering is disabled.
