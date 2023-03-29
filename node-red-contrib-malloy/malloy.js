const malloy = require("@malloydata/malloy");
const duckdb = require("@malloydata/db-duckdb");

module.exports = function(RED) {
    function MalloyNode(config) {
        
        RED.nodes.createNode(this, config);
        
        var node = this;
        node.model = config.model;
        node.query = config.query;
        
        node.on('input', async function(msg) {
            // Ignore payload
            // msg.payload

            try {
                const connection = new duckdb.DuckDBConnection();
                const runtime = new malloy.SingleConnectionRuntime(connection);
                const model = runtime.loadModel(node.model);
                const runner = model.loadQuery(node.query);
                
                msg.payload = (await runner.run()).data.value;
            }
            catch (e) {
                console.error(e);
                msg.payload = e;
            }

            node.send(msg);
        });
    }
    RED.nodes.registerType("malloy", MalloyNode);
}