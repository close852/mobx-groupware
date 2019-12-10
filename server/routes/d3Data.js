import express from 'express'
import java from 'java'

const router = express.Router();
const jarPath = __dirname + '\\lib\\cjhm-resource.jar';

java.classpath.push(jarPath);
const instance = java.import('com.cjhm.ResourceAPI');

router.get('/resource', async (req, res) => {
    console.log('system', __dirname)
    console.log(instance.getTotalRamSync());
    console.log(instance.getUsageRamSync());
    console.log(instance.getSystemCpuSync());

    // total: instance.getTotalRamSync() / 1024 / 1024 / 1024,
    // usage: instance.getUsageRamSync(),
    // cpu: instance.getSystemCpuSync()
    res.send([
        { text: 'RAM', value: instance.getUsageRamSync() },
        { text: 'CPU', value: instance.getSystemCpuSync() },
    ])
})
export default router;
