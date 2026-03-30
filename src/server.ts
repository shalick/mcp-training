import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
    name: "mcp-training",
    version: "1.0.0",
});

server.tool(
    "hello",
    "A simple greeting tool to test the server",
    {
        name: z.string().describe("The name of the person to greet"),
    },
    async ({ name }) => {
        return {
            content: [{ type: "text", text: `Hello, ${name}! Welcome to the MCP Training Server.` }],
        };
    }
);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("MCP Training Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error starting server:", error);
    process.exit(1);
});